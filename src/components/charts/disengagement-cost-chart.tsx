
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { name: "Global Productivity Loss (Annual)", cost: 8.8, unit: "Trillion USD" },
  { name: "US Cost from Depression (Annual)", cost: 210.5, unit: "Billion USD" }, // Storing as 210.5 for Billion
]

const chartConfig = {
  cost: {
    label: "Cost",
    color: "hsl(var(--orange-500))", // Assuming orange-500 is defined, or use primary/accent
  },
} satisfies ChartConfig

export function DisengagementCostChart() {
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
                if (value.length > 20) { 
                    return value.match(/.{1,20}/g)?.join('\n') || value;
                }
                return value;
            }}
            interval={0}
            height={60}
          />
          <YAxis 
            label={{ value: 'Cost (USD)', angle: -90, position: 'insideLeft', fill: 'hsl(var(--foreground))' }}
            tickFormatter={(value, index) => {
                // Show Trillions for the first bar's Y-axis context, Billions for the second
                // This is tricky as Y-axis is shared. We'll format in tooltip.
                return value;
            }}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent
                formatter={(value, name, item) => {
                    if (item.payload.unit === "Trillion USD") {
                        return `${item.payload.cost} Trillion USD`;
                    }
                    if (item.payload.unit === "Billion USD") {
                        return `${item.payload.cost} Billion USD`;
                    }
                    return `${value}`;
                }}
                 labelFormatter={(label, payload) => {
                    if (payload && payload.length > 0) {
                        return payload[0].payload.name;
                    }
                    return label;
                }}
            />}
          />
          {/* Legend can be hidden as per HTML if data is clear from labels/tooltip */}
          {/* <Legend />  */}
          <Bar dataKey="cost" fill="var(--color-cost)" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

// Add HSL for orange if not in globals, for chartConfig. Can also use --chart-X variables
// --orange-500: 25 95% 53%; (Example HSL for F97316)
// --orange-600: 18 96% 51%; (Example HSL for EA580C)

