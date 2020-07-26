import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';

import {
  message, Row, Col, Card,
} from 'antd';
import IncomeExpenseBarChart from './statistics/IncomeExpenseBarChart';
import SavingGauge from './statistics/SavingGauge';
import SavingPieChart from './statistics/SavingPieChart';
import UnauthenticatedModal from './security/SecurityModal';

import { GET_REPORT, UNAUTHORIZED_ERROR } from '../actions/types';

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        message.loading({ content: 'Loading Projects', key: 'getReport', duration: 0 });
        const res = await axios.get('api/backlog/stats');
        dispatch({ type: GET_REPORT, payload: res.data });

        message.success({ content: 'Success', key: 'getReport', duration: 1 });
      } catch (err) {
        if (err.response.status === 401) {
          message.error({ content: 'Loading Projects', key: 'getReport', duration: 0.5 });
          const onOk = () => {
            dispatch({ type: UNAUTHORIZED_ERROR });
          };
          UnauthenticatedModal('Invalid Credentials', onOk);
        } else {
          message.error({ content: JSON.stringify(err.response.data), key: 'getReport', duration: 1 });
        }
      }
    }

    fetchData();
  }, [dispatch]);

  const report = useSelector((state) => state.report.report);
  const incomeData = [];
  const typedExpense = [];
  const savingRate = report.totalIncome === 0 ? [{ value: 0, raw: 0 }]
    : [{
      value: ((report.totalIncome + report.totalExpense) * 10) / report.totalIncome,
      raw: (report.totalIncome + report.totalExpense),
    }];

  if (report.incomes) {
    report.incomes.map((item) => (incomeData.push({ name: 'income', group: item.group.toString(), value: item.sum })));
  }

  if (report.expenses) {
    report.expenses.map((item) => (incomeData.push({ name: 'expense', group: item.group.toString(), value: Math.abs(item.sum) })));
  }

  if (report.typedExpenses) {
    report.typedExpenses.map((item) => (typedExpense.push({
      item: item.type,
      value: Math.abs(item.sum),
      percent: (Math.abs(item.sum) / Math.abs(report.totalExpense)),
    })));
  }

  incomeData.sort((a, b) => a.group - b.group);

  return (
    <div className="Home">
      <div className="container-lg">
        <div className="row">
          <div className="col-12">
            <br />
            Reports
            <hr />
            <Row gutter={[16, 24]}>
              <Col span={16}>
                <Card title="Income and Expense">
                  <IncomeExpenseBarChart data={incomeData} />
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Saving Rate">
                  <SavingGauge data={savingRate} />
                </Card>
              </Col>
            </Row>
            <Row gutter={[16, 24]}>
              <Col span={24}>
                <Card title="Expense Breakdown">
                  <SavingPieChart data={typedExpense} />
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
