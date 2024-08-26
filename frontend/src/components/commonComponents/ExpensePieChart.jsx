import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384'];

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
      <Tooltip />
      <Legend />
    </PieChart>
  );
}

export default ExpensesPieChart;
