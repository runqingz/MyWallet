import React from 'react';
import {
  Chart,
  Interval,
  Tooltip,
  Axis,
  Coordinate,
  Interaction,
} from 'bizcharts';
import PropTypes from 'prop-types';

export default function SavingPieChart({ data }) {
  // const data = [
  //   { item: '事例一', value: 40, percent: 0.4 },
  //   { item: '事例二', value: 21, percent: 0.21 },
  //   { item: '事例三', value: 17, percent: 0.17 },
  //   { item: '事例四', value: 13, percent: 0.13 },
  //   { item: '事例五', value: 9, percent: 0.09 },
  // ];

  const cols = {
    percent: {
      formatter: (val) => `${val * 100}%`,
    },
  };

  return (
    <Chart height={400} data={data} scale={cols} autoFit>
      <Coordinate type="theta" radius={0.75} />
      <Tooltip showTitle={false} />
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
      <Interaction type="element-single-selected" />
    </Chart>
  );
}

SavingPieChart.propTypes = {
  data: PropTypes.array.isRequired,
};
