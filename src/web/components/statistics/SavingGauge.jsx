import React from 'react';
import {
  Chart,
  Point,
  Annotation,
  Axis,
  Coordinate,
  registerShape,
} from 'bizcharts';
import PropTypes from 'prop-types';

// 自定义Shape 部分
registerShape('point', 'pointer', {
  draw(cfg, container) {
    const group = container.addGroup();
    const center = this.parsePoint({ x: 0, y: 0 }); // 获取极坐标系下画布中心点
    // 绘制指针
    group.addShape('line', {
      attrs: {
        x1: center.x,
        y1: center.y,
        x2: cfg.x,
        y2: cfg.y,
        stroke: cfg.color,
        lineWidth: 5,
        lineCap: 'round',
      },
    });
    group.addShape('circle', {
      attrs: {
        x: center.x,
        y: center.y,
        r: 9.75,
        stroke: cfg.color,
        lineWidth: 4.5,
        fill: '#fff',
      },
    });

    return group;
  },
});

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export default function SavingGauge({ data }) {
  const displayData = data.map((item) => ({ value: clamp(item.value, -5, 5) }));
  return (
    <Chart
      height={200}
      data={displayData}
      padding={[0, 0, 30, 0]}
      scale={{
        value: {
          min: -5,
          max: 5,
          tickInterval: 1,
        },
      }}
      autoFit
    >
      <Coordinate
        type="polar"
        radius={0.75}
        startAngle={(-9 / 8) * Math.PI}
        endAngle={(1 / 8) * Math.PI}
      />
      <Axis name="1" />
      <Axis
        name="value"
        line={null}
        label={{
          offset: -36,
          style: {
            fontSize: 14,
            textAlign: 'center',
            textBaseline: 'middle',
          },
        }}
        subTickLine={{
          count: 4,
          length: -15,
        }}
        tickLine={{
          length: -24,
        }}
        grid={null}
      />
      <Point
        position="value*1"
        color="#1890FF"
        shape="pointer"
        animate={{
          appear: {
            animation: 'fade-in',
          },
        }}
      />
      <Annotation.Arc
        top={false}
        start={[-5, 1]}
        end={[5, 1]}
        style={{
          stroke: '#CBCBCB',
          lineWidth: 18,
          lineDash: null,
        }}
      />
      <Annotation.Arc
        start={[-5, 1]}
        end={[clamp(data[0].value, -5, 5), 1]}
        style={{
          stroke: '#1890FF',
          lineWidth: 18,
          lineDash: null,
        }}
      />
      <Annotation.Text
        position={['50%', '90%']}
        content={`${data[0].value * 10}% ($${data[0].raw})`}
        style={{
          fontSize: 14,
          fill: '#545454',
          textAlign: 'center',
        }}
        offsetY={15}
      />
    </Chart>
  );
}

SavingGauge.propTypes = {
  data: PropTypes.array.isRequired,
};
