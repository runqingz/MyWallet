/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Descriptions, Statistic, Tooltip } from 'antd';
import PropTypes from 'prop-types';

export default function BacklogDescription({ project, grossValue, postedGrossValue }) {
  const valueStyle = grossValue < 0 ? { color: 'red' } : { color: 'green' };
  const postedValueStyle = postedGrossValue < 0 ? { color: 'red' } : { color: 'green' };
  return (
    <Descriptions
      bordered
      column={{
        xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1,
      }}
    >
      <Descriptions.Item label="Project">{project.projectName}</Descriptions.Item>
      <Descriptions.Item label="ID" span={2}>{project.projectIdentifier}</Descriptions.Item>
      <Descriptions.Item label="Created At">{project.createdAt}</Descriptions.Item>
      <Descriptions.Item label="Updated At" span={2}>{project.modifiedAt}</Descriptions.Item>
      <Descriptions.Item label="Pending Value" span={3}>
        <Tooltip placement="topLeft" title="This is the gross value after pending tasks">
          <Statistic
            value={grossValue}
            precision={2}
            valueStyle={valueStyle}
            prefix={(
              <div>
                $
              </div>
          )}
          />
        </Tooltip>
      </Descriptions.Item>
      <Descriptions.Item label="Gross Value" span={3}>
        <Tooltip placement="topLeft" title="This is the gross value before pending tasks">
          <Statistic
            value={postedGrossValue}
            precision={2}
            valueStyle={postedValueStyle}
            prefix={(<div>$ </div>)}
          />
        </Tooltip>
      </Descriptions.Item>
      <Descriptions.Item label="Description" span={3}>
        {project.description}
      </Descriptions.Item>
    </Descriptions>
  );
}

BacklogDescription.propTypes = {
  project: PropTypes.object.isRequired,
  grossValue: PropTypes.number.isRequired,
  postedGrossValue: PropTypes.number.isRequired,
};
