
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { name: "IT Employees Experiencing Stress", percentage: 73, hours: null },
  { name: "Avg. US Work Week", percentage: null, hours: 47 },
  { name: "US Employees Working 60+ Hours", percentage: 18, hours: null },
]

const chartConfig = {
  percentage: {
    label: "Percentage (%)",
    color: "hsl(var(--teal-custom-500-hsl))",
  },
  hours: {
    label: "Hours (hrs)",
    color: "hsl(var(--cyan-500))", // Assuming cyan-500 is defined or use another teal
  },
} satisfies ChartConfig

export function StressWorkHoursChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 5 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="name"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => {
                if (value.length > 20) { // Simple wrapping logic
                    return value.match(/.{1,20}/g)?.join('\n') || value;
                }
                return value;
            }}
            interval={0}
            height={60} 
          />
          <YAxis 
            label={{ value: 'Value', angle: -90, position: 'insideLeft', fill: 'hsl(var(--foreground))' }}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent 
                formatter={(value, name, item) => {
                    if (name === "percentage" && item.payload.percentage !== null) {
                        return `${item.payload.percentage}%`;
                    }
                    if (name === "hours" && item.payload.hours !== null) {
                        return `${item.payload.hours} hrs`;
                    }
                    return "";
                }}
                labelFormatter={(label, payload) => {
                    if (payload && payload.length > 0) {
                        return payload[0].payload.name;
                    }
                    return label;
                }}
            />}
          />
          <Legend />
          <Bar dataKey="percentage" fill="var(--color-percentage)" radius={4} />
          <Bar dataKey="hours" fill="var(--color-hours)" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

