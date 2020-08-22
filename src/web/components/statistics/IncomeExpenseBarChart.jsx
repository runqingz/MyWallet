import React from 'react';
import PropTypes from 'prop-types';

import {
  Chart,
  Interval,
  Axis,
} from 'bizcharts';

import { SCOPE_MONTHLY } from './StatisticsConstants';

export default function IncomeExpenseBarChart({ data, scope }) {
  const scale = {
    group: {
      alias: scope === SCOPE_MONTHLY ? 'Day' : 'Month',
    },
    value: {
      alias: 'Value',
    },
  };

  return (
    <Chart pure height={200} data={data} scale={scale} autoFit>
      <Axis name="group" title />
      <Axis name="value" title />
      <Interval
        adjust={[
          {
            type: 'stack',
          },
        ]}
        color="name"
        position="group*value"
      />
    </Chart>
  );
}

IncomeExpenseBarChart.propTypes = {
  data: PropTypes.array.isRequired,
  scope: PropTypes.string.isRequired,
};
