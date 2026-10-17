import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const MOOD_FACE = { 1: "😰", 2: "😔", 3: "😐", 4: "🙂", 5: "😊" };
const MOOD_WORD = { 1: "Anxious", 2: "Low", 3: "Okay", 4: "Good", 5: "Great" };

const TOOLTIP_STYLE = {
  borderRadius: 12,
  border: "1px solid #efe1e3",
  fontSize: 12,
  padding: "6px 10px",
};

export default function MoodTrendChart({ data }) {
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 8, right: 10, bottom: 0, left: 0 }}
        >
          <CartesianGrid vertical={false} stroke="#f3e9ea" />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: "#94a3b8" }}
          />
          <YAxis
            domain={[1, 5]}
            ticks={[1, 2, 3, 4, 5]}
            tickFormatter={(value) => MOOD_FACE[value]}
            tickLine={false}
            axisLine={false}
            width={30}
          />
          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            formatter={(value) => [MOOD_WORD[value] || "Not logged", "Mood"]}
          />
          <Line
            type="monotone"
            dataKey="mood"
            stroke="#a1707a"
            strokeWidth={2.5}
            dot={{ r: 3, fill: "#a1707a", strokeWidth: 0 }}
            activeDot={{ r: 5 }}
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}