
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, Clock, Server } from 'lucide-react';

// Mock data for cluster overview
const clusterStats = {
  totalNodes: 5,
  healthyNodes: 5,
  totalPods: 32,
  runningPods: 28,
  pendingPods: 3,
  failedPods: 1,
  cpuUsage: 67,
  memoryUsage: 75
};

const ClusterOverview: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Nodes</CardTitle>
          <Server className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{clusterStats.healthyNodes}/{clusterStats.totalNodes}</div>
          <p className="text-xs text-muted-foreground">Healthy nodes</p>
          <div className="mt-4">
            <div className="flex items-center">
              <CheckCircle className="h-3 w-3 text-kubernetes-green mr-1" />
              <span className="text-xs">All nodes healthy</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pods</CardTitle>
          <div className="rounded-full bg-primary/10 p-1">
            <div className="h-2 w-2 rounded-full bg-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{clusterStats.runningPods}/{clusterStats.totalPods}</div>
          <p className="text-xs text-muted-foreground">Running pods</p>
          <div className="grid grid-cols-3 gap-1 mt-3">
            <div className="flex flex-col items-center">
              <span className="text-xs text-muted-foreground">Running</span>
              <span className="text-sm text-kubernetes-green">{clusterStats.runningPods}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs text-muted-foreground">Pending</span>
              <span className="text-sm text-kubernetes-yellow">{clusterStats.pendingPods}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs text-muted-foreground">Failed</span>
              <span className="text-sm text-kubernetes-red">{clusterStats.failedPods}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
          <div className="rounded-full bg-primary/10 p-1">
            <div className="h-2 w-2 rounded-full bg-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{clusterStats.cpuUsage}%</div>
          <p className="text-xs text-muted-foreground">Across all nodes</p>
          <div className="mt-4">
            <Progress value={clusterStats.cpuUsage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
          <div className="rounded-full bg-primary/10 p-1">
            <div className="h-2 w-2 rounded-full bg-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{clusterStats.memoryUsage}%</div>
          <p className="text-xs text-muted-foreground">Across all nodes</p>
          <div className="mt-4">
            <Progress value={clusterStats.memoryUsage} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClusterOverview;
