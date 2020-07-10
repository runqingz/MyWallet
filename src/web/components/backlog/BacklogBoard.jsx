/* eslint-disable react/forbid-prop-types */

/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  Tabs, Table, Space, Button, message, Spin,
} from 'antd';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getBacklogTasks, deleteTask, updateTask, getSumById, getPostedSumById,
} from '../../actions/backlogActions';
import { getProject } from '../../actions/projectActions';
import { handleAuthenticationError } from '../../actions/securityActions';

import '../../../App.css';
import DeleteTaskModal from './DeleteTaskModal';
import UpdateTaskFormModal from './UpdateTaskFormModal';
import BacklogDescription from './BacklogDescription';
import UnauthenticatedModal from '../security/SecurityModal';

class BacklogBoard extends Component {
  constructor() {
    super();
    this.state = {
      editingKey: -1, isLoading: true, isTaskUpdating: false,
    };
    this.onDelete = this.onDelete.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  async componentDidMount() {
    const { match: { params: { projectId } } } = this.props;
    message.loading({ content: 'In Progress...', key: 'getBacklogBoardInfo', duration: 0 });

    try {
      // eslint-disable-next-line react/destructuring-assignment
      await this.props.getProject(projectId);
      // eslint-disable-next-line react/destructuring-assignment
      await this.props.getBacklogTasks(projectId);
      // eslint-disable-next-line react/destructuring-assignment
      await this.props.getSumById(projectId);
      await this.props.getPostedSumById(projectId);

      message.success({ content: 'Success', key: 'getBacklogBoardInfo', duration: 1 });
      this.setState({ isLoading: false });
    } catch (error) {
      message.error({ content: JSON.stringify(error.response.data), key: 'getBacklogBoardInfo' });
      if (error.response.status === 401) {
        message.error({ content: 'In Progress...', key: 'getBacklogBoardInfo', duration: 0.5 });
        const onOk = () => {
          this.props.handleAuthenticationError();
        };
        UnauthenticatedModal('Invalid Credentials', onOk);
      } else {
        message.error({ content: JSON.stringify(error.response.data), key: 'getBacklogBoardInfo', duration: 1 });
      }
    }
  }

  async onDelete(projectId, taskId) {
    message.loading({ content: 'In Progress...', key: 'deleteProject', duration: 0 });
    try {
      this.setState({ isTaskUpdating: true });
      await this.props.deleteTask(projectId, taskId);
      message.success({ content: 'Success', key: 'deleteProject' });
    } catch (error) {
      if (error.response.status === 401) {
        message.error({ content: 'In Progress...', key: 'deleteProject', duration: 0.5 });
        const onOk = () => {
          this.props.handleAuthenticationError();
        };
        UnauthenticatedModal('Invalid Credentials', onOk);
      } else {
        message.error({ content: JSON.stringify(error.response.data), key: 'deleteProject', duration: 1 });
      }
    }
    this.setState({ editingKey: -1, isTaskUpdating: false });
  }

  async onUpdate(values, id) {
    const { match: { params: { projectId } } } = this.props;

    try {
      this.setState({ isTaskUpdating: true });
      await this.props.updateTask({ ...values, id }, projectId);
      await this.props.getSumById(projectId);
      await this.props.getPostedSumById(projectId);
      message.success({ content: 'Success', key: 'updateTask' });
    } catch (error) {
      if (error.response.status === 401) {
        message.error({ content: 'In Progress...', key: 'updateTask', duration: 0.5 });
        const onOk = () => {
          this.props.handleAuthenticationError();
        };
        UnauthenticatedModal('Invalid Credentials', onOk);
      } else {
        message.error({ content: JSON.stringify(error.response.data), key: 'updateTask', duration: 1 });
      }
    }
    this.setState({ editingKey: -1, isTaskUpdating: false });
  }

  render() {
    const { project, backlog: { tasks, sum, postedSum } } = this.props;
    const { TabPane } = Tabs;
    const { isLoading, isTaskUpdating } = this.state;
    const columns = [
      {
        title: 'Summary',
        dataIndex: 'summary',
        width: 150,
      },
      {
        title: 'Value',
        dataIndex: 'value',
        width: 150,
        render: (value) => {
          const style = {
            color: 'green',
          };
          if (value < 0) {
            style.color = 'red';
          }
          return (
            <span style={style}>{`$${value}`}</span>
          );
        },
      },
      {
        title: 'Status',
        dataIndex: 'status',
        width: 150,
      },
      {
        title: 'Description',
        dataIndex: 'description',
      },
      {
        title: 'Post Date',
        dataIndex: 'postDate',
      },
      {
        title: 'Action',
        key: 'action',
        render: (record) => {
          const { editingKey } = this.state;
          const isEditing = editingKey === record.key;
          return isEditing ? (
            <Space size="middle">
              <UpdateTaskFormModal
                task={record}
                onUpdate={this.onUpdate}
                onCancel={() => {
                  this.setState({ editingKey: -1 });
                }}
                isUpdating={isTaskUpdating}
              />
            </Space>
          ) : (
            <Space size="middle">
              <Button
                type="link"
                size="small"
                onClick={() => {
                  this.setState({ editingKey: record.key });
                }}
              >
                Edit
              </Button>
              <Button type="link" size="small" onClick={() => { DeleteTaskModal({ projectId: record.projectIdentifier, taskId: record.projectSquence, onOk: this.onDelete }); }}>Delete</Button>
            </Space>
          );
        },
      },
    ];
    // TODO: Consider doing this on the backend side
    const data = tasks.map((item) => ({ ...item, key: item.id }));
    const pending = data.filter((item) => item.status === 'PENDING');
    const posted = data.filter((item) => item.status === 'POSTED');
    return (
      <div className="tasks">
        <div className="container-lg">
          <div className="row">
            <div className="col-12">
              <br />
              <h3>Project Details</h3>
              <hr />
              <div className="card-container">
                <Tabs defaultActiveKey="1" type="card">
                  <TabPane tab="Description" key="1">
                    <Spin spinning={isLoading}>
                      <BacklogDescription
                        project={project}
                        grossValue={sum}
                        postedGrossValue={postedSum}
                      />
                    </Spin>
                  </TabPane>
                  {/* <TabPane tab="Tab 2" key="2">
                    Content of Tab Pane 2
                  </TabPane>
                  <TabPane tab="Tab 3" key="3">
                    Content of Tab Pane 3
                  </TabPane> */}
                </Tabs>
              </div>
              <br />
              <div style={{ marginBottom: 16 }}>
                <Button type="primary" href={`/project/${project.projectIdentifier}/addtask`}>
                  Add Task
                </Button>
              </div>
              {/* TODO: Editable Row format, pagination */}
              <Spin spinning={isLoading || isTaskUpdating}>
                <Table
                  columns={columns}
                  dataSource={pending}
                  scroll={{ y: 240 }}
                  title={() => 'Pending Tasks'}
                />
              </Spin>
              <br />
              <Spin spinning={isLoading || isTaskUpdating}>
                <Table
                  columns={columns}
                  dataSource={posted}
                  scroll={{ y: 240 }}
                  title={() => 'Posted Tasks'}
                />
              </Spin>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BacklogBoard.propTypes = {
  match: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  backlog: PropTypes.object.isRequired,
  getProject: PropTypes.func.isRequired,
  getBacklogTasks: PropTypes.func.isRequired,
  getSumById: PropTypes.func.isRequired,
  getPostedSumById: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  handleAuthenticationError: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project.project,
  backlog: state.backlog,
});

export default connect(mapStateToProps, {
  getBacklogTasks,
  getProject,
  deleteTask,
  updateTask,
  getSumById,
  getPostedSumById,
  handleAuthenticationError,
})(BacklogBoard);
