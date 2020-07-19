import React from 'react';

import { Row, Col, Card } from 'antd';
import IncomeExpenseBarChart from './statistics/IncomeExpenseBarChart';
import SavingGauge from './statistics/SavingGauge';
import SavingPieChart from './statistics/SavingPieChart';

function Home() {
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
                  <IncomeExpenseBarChart />
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Saving Rate">
                  <SavingGauge />
                </Card>
              </Col>
            </Row>
            <Row gutter={[16, 24]}>
              <Col span={24}>
                <Card title="Expense Breakdown">
                  <SavingPieChart />
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
