import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const TOOLTIP_STYLE = {
  borderRadius: 12,
  border: "1px solid #efe1e3",
  fontSize: 12,
  padding: "6px 10px",
};

export default function SymptomTrendChart({ data }) {
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 8, right: 10, bottom: 0, left: 0 }}
        >
          <defs>
            <linearGradient id="symptomFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c0989f" stopOpacity={0.95} />
              <stop offset="100%" stopColor="#c0989f" stopOpacity={0.5} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#f3e9ea" />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: "#94a3b8" }}
          />
          <YAxis
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
            width={30}
            tick={{ fontSize: 11, fill: "#94a3b8" }}
          />
          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            cursor={{ fill: "#f7f1f2" }}
            formatter={(value) => [
              value === 1 ? "1 symptom" : `${value} symptoms`,
              "Logged",
            ]}
          />
          <Bar
            dataKey="symptoms"
            fill="url(#symptomFill)"
            radius={[6, 6, 0, 0]}
            maxBarSize={38}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}