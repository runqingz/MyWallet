import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  message, Row, Col, Card, Radio, Typography,
} from 'antd';
import IncomeExpenseBarChart from './statistics/IncomeExpenseBarChart';
import SavingGauge from './statistics/SavingGauge';
import SavingPieChart from './statistics/SavingPieChart';
import handleApiError from '../utils/apiUtils';
import apiErrorAction from '../actions/apiErrorAction';

import getReportAction from '../actions/reportActions';

async function fetchData(dispatch) {
  try {
    const reportAction = await getReportAction();
    message.loading({ content: 'Loading Report', key: 'getReport', duration: 0 });
    dispatch(reportAction);
    message.success({ content: 'Success', key: 'getReport', duration: 1 });
  } catch (err) {
    const errorAction = apiErrorAction(err);
    handleApiError(err, 'getReport');
    dispatch(errorAction);
  }
}

function formatData(report) {
  const incomes = [];
  const typedExpense = [];
  const savingRate = report.totalIncome === 0 ? [{ value: 0, raw: 0 }]
    : [{
      value: ((report.totalIncome + report.totalExpense) * 10) / report.totalIncome,
      raw: (report.totalIncome + report.totalExpense),
    }];

  if (report.incomes) {
    report.incomes.map((item) => (incomes.push({ name: 'income', group: item.group.toString(), value: item.sum })));
  }

  if (report.expenses) {
    report.expenses.map((item) => (incomes.push({ name: 'expense', group: item.group.toString(), value: Math.abs(item.sum) })));
  }

  incomes.sort((a, b) => a.group - b.group);

  if (report.typedExpenses) {
    report.typedExpenses.map((item) => (typedExpense.push({
      item: item.type,
      value: Math.abs(item.sum),
      percent: report.totalExpense === 0 ? 0 : (Math.abs(item.sum) / Math.abs(report.totalExpense)),
    })));
  }

  return { incomes, typedExpense, savingRate };
}

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData(dispatch);
  }, [dispatch]);

  const data = formatData(useSelector((state) => state.report.report));
  const { Title } = Typography;

  return (
    <div className="Home">
      <div className="container-lg">
        <div className="row">
          <div className="col-12">
            <br />
            <Title level={4}>Report</Title>
            <hr />
            <Radio.Group defaultValue="month" buttonStyle="solid" style={{ paddingBottom: '20px' }}>
              <Radio.Button value="month">By Month</Radio.Button>
              <Radio.Button value="year">By Year</Radio.Button>
            </Radio.Group>
            <Row gutter={[16, 24]}>
              <Col span={16}>
                <Card title="Income and Expense">
                  <IncomeExpenseBarChart data={data.incomes} />
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Saving Rate">
                  <SavingGauge data={data.savingRate} />
                </Card>
              </Col>
            </Row>
            <Row gutter={[16, 24]}>
              <Col span={24}>
                <Card title="Expense Breakdown">
                  <SavingPieChart data={data.typedExpense} />
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
