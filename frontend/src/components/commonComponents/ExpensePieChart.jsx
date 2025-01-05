import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';


const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384',
  '#4BC0C0', '#FF9F40', '#36A2EB', '#9966FF', '#C9CBCF',
  '#4D4D4D', '#5DA5DA', '#FAA43A', '#60BD68', '#F17CB0',
  '#B2912F', '#B276B2', '#DECF3F', '#F15854', '#8E8E38'
];

function ExpensesPieChart({data}) {
  return (
    <PieChart width={580} height={420}>
      <Pie
        data={data}
        cx={300}
        cy={170}
        outerRadius={190}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip 
        formatter={(value) => `${value}₹`} 
      />
      <Legend />  
    </PieChart>
  );
}

export default ExpensesPieChart;
