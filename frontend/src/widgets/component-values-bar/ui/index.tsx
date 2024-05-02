import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";

export function ComponentValuesBar() {
  const data = [
    {
      v1: 100,
      v2: 110,
    },
    {
      v1: 150,
      v2: 100,
    },
    {
      v1: 140,
      v2: 120,
    },
    {
      v1: 140,
      v2: 120,
    },
    {
      v1: 110,
      v2: 100,
    },
    {
      v1: 115,
      v2: 90,
    },
    {
      v1: 100,
      v2: 100,
    },
    {
      v1: 105,
      v2: 85,
    },
  ];
  return (
    <div className="w-full border-r-4 bg-white">
      <ResponsiveContainer width="100%" height="35%">
        <LineChart
          width={200}
          height={200}
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="0" />
          <XAxis />
          <YAxis />
          <Legend />
          <Line type="monotone" dataKey="v1" stroke="#8884d8" dot={false} strokeWidth={4} />
          <Line type="monotone" dataKey="v2" stroke="#82ca9d" dot={false} strokeWidth={4} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
