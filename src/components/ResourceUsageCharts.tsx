
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

// Mock data for the charts
const timeSeriesData = [
  { time: '00:00', cpu: 40, memory: 35, pods: 28 },
  { time: '01:00', cpu: 35, memory: 40, pods: 28 },
  { time: '02:00', cpu: 30, memory: 45, pods: 28 },
  { time: '03:00', cpu: 25, memory: 50, pods: 28 },
  { time: '04:00', cpu: 30, memory: 55, pods: 28 },
  { time: '05:00', cpu: 45, memory: 60, pods: 30 },
  { time: '06:00', cpu: 60, memory: 65, pods: 32 },
  { time: '07:00', cpu: 75, memory: 70, pods: 32 },
  { time: '08:00', cpu: 70, memory: 75, pods: 32 },
  { time: '09:00', cpu: 65, memory: 72, pods: 32 },
  { time: '10:00', cpu: 67, memory: 75, pods: 32 },
];

const nodeResourceData = [
  { name: 'worker-node-1', cpu: 42, memory: 38, pods: 10 },
  { name: 'worker-node-2', cpu: 65, memory: 72, pods: 8 },
  { name: 'master-node-1', cpu: 35, memory: 50, pods: 6 },
  { name: 'worker-node-3', cpu: 28, memory: 45, pods: 5 },
  { name: 'worker-node-4', cpu: 15, memory: 20, pods: 3 },
];

// Custom chart tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-3 rounded-md shadow-md">
        <p className="font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}${entry.name === 'pods' ? '' : '%'}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const ResourceUsageCharts: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 mt-4">
      <Card>
        <CardHeader>
          <CardTitle>Cluster Resource Usage (24h)</CardTitle>
          <CardDescription>CPU and memory usage over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={timeSeriesData}
                margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorMemory" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="cpu" 
                  name="CPU" 
                  stroke="#0EA5E9" 
                  fillOpacity={1} 
                  fill="url(#colorCpu)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="memory" 
                  name="Memory" 
                  stroke="#8B5CF6" 
                  fillOpacity={1} 
                  fill="url(#colorMemory)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Node Resource Usage</CardTitle>
          <CardDescription>Current usage across all nodes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={nodeResourceData}
                margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#64748B" />
                <YAxis type="category" dataKey="name" stroke="#64748B" width={120} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="cpu" name="CPU" fill="#0EA5E9" />
                <Bar dataKey="memory" name="Memory" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourceUsageCharts;
