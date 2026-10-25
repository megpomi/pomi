import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { MOOD_WORD } from "@/lib/patterns";

const MOOD_FACE = { 1: "😰", 2: "😔", 3: "😐", 4: "🙂", 5: "😊" };

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
        <AreaChart
          data={data}
          margin={{ top: 8, right: 10, bottom: 0, left: 0 }}
        >
          <defs>
            <linearGradient id="moodFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c0989f" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#c0989f" stopOpacity={0} />
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
          <Area
            type="monotone"
            dataKey="mood"
            stroke="#a1707a"
            strokeWidth={2.5}
            fill="url(#moodFill)"
            dot={{ r: 3, fill: "#a1707a", strokeWidth: 0 }}
            activeDot={{ r: 5 }}
            connectNulls
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}