import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  PieChart, Pie, Sector, ResponsiveContainer,
} from 'recharts';
import { mainPieChartDataSelector } from 'selectors/pieChartSelectors';

const mapStateToProps = state => ({
  pieChartData: mainPieChartDataSelector(state),
});

const renderActiveShape = props => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  const poundsValue = Math.abs(payload.value / 100);
  let moneyValue;
  if (payload.value % 100 === 0) {
    moneyValue = poundsValue.toString();
  } else {
    moneyValue = poundsValue.toFixed(2).toString();
  }

  return (
    <g>
      <text x={cx} y="46%" dy={8} textAnchor="middle" fill="#000">
        {payload.name}
      </text>
      <text x={cx} y="53%" dy={8} textAnchor="middle" fill="#000">
        £
        {moneyValue}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={payload.fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={payload.fill}
      />
    </g>
  );
};

const MainPieChart = props => {
  const [activeIndex, setActiveIndex] = useState(null);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const containerClass = `pie-chart-container ${props.className}`;

  return (
    <div className={containerClass}>
      <span className="title">Expenses</span>
      <ResponsiveContainer width="100%" aspect={1} className={containerClass}>
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={props.pieChartData}
            cx="50%"
            cy="50%"
            innerRadius="30%"
            outerRadius="50%"
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default connect(mapStateToProps)(MainPieChart);
