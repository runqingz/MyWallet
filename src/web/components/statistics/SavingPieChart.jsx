import React from 'react';
import {
  Chart,
  Interval,
  Axis,
  Coordinate,
} from 'bizcharts';
import PropTypes from 'prop-types';

export default function SavingPieChart({ data }) {
  const cols = {
    percent: {
      formatter: (val) => `${val * 100}%`,
    },
  };

  return (
    <Chart pure height={400} data={data} scale={cols} autoFit>
      <Coordinate type="theta" radius={0.75} />
      <Axis visible={false} />
      <Interval
        position="percent"
        adjust="stack"
        color="item"
        style={{
          lineWidth: 1,
          stroke: '#fff',
        }}
        label={['value', {
          content: (entry) => `${entry.item}: ${entry.percent.toFixed(2) * 100}% ($${entry.value})`,
        }]}
      />
    </Chart>
  );
}

SavingPieChart.propTypes = {
  data: PropTypes.array.isRequired,
};
