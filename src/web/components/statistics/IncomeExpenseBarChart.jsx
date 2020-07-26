import React from 'react';
import PropTypes from 'prop-types';

import {
  Chart,
  Tooltip,
  Interval,
} from 'bizcharts';

export default function IncomeExpenseBarChart({ data }) {
  return (
    <Chart height={200} data={data} autoFit>
      <Interval
        adjust={[
          {
            type: 'stack',
          },
        ]}
        color="name"
        position="group*value"
      />
      <Tooltip shared />
    </Chart>
  );
}

IncomeExpenseBarChart.propTypes = {
  data: PropTypes.array.isRequired,
};
