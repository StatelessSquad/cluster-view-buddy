
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Server, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

// Mock data for nodes
const nodes = [
  {
    name: "worker-node-1",
    status: "Ready",
    role: "worker",
    age: "7d",
    version: "v1.26.3",
    cpu: {
      capacity: "4",
      usage: 42
    },
    memory: {
      capacity: "16Gi",
      usage: 38
    }
  },
  {
    name: "worker-node-2",
    status: "Ready",
    role: "worker",
    age: "7d",
    version: "v1.26.3",
    cpu: {
      capacity: "4",
      usage: 65
    },
    memory: {
      capacity: "16Gi",
      usage: 72
    }
  },
  {
    name: "master-node-1",
    status: "Ready",
    role: "control-plane",
    age: "7d",
    version: "v1.26.3",
    cpu: {
      capacity: "2",
      usage: 35
    },
    memory: {
      capacity: "8Gi",
      usage: 50
    }
  },
  {
    name: "worker-node-3",
    status: "Ready",
    role: "worker",
    age: "7d",
    version: "v1.26.3",
    cpu: {
      capacity: "4",
      usage: 28
    },
    memory: {
      capacity: "16Gi",
      usage: 45
    }
  },
  {
    name: "worker-node-4",
    status: "Ready",
    role: "worker",
    age: "2d",
    version: "v1.26.3",
    cpu: {
      capacity: "4",
      usage: 15
    },
    memory: {
      capacity: "16Gi",
      usage: 20
    }
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Ready":
      return <CheckCircle className="h-4 w-4 text-kubernetes-green" />;
    case "NotReady":
      return <AlertTriangle className="h-4 w-4 text-kubernetes-red" />;
    default:
      return <Clock className="h-4 w-4 text-kubernetes-yellow" />;
  }
};

const NodesList: React.FC = () => {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-lg">Nodes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="grid grid-cols-7 gap-4 p-4 text-xs font-medium text-muted-foreground bg-muted/50">
            <div>NAME</div>
            <div>STATUS</div>
            <div>ROLES</div>
            <div>AGE</div>
            <div>VERSION</div>
            <div>CPU</div>
            <div>MEMORY</div>
          </div>
          <Separator />
          
          {nodes.map((node, index) => (
            <React.Fragment key={node.name}>
              <div className="grid grid-cols-7 gap-4 p-4 items-center">
                <div className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{node.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  {getStatusIcon(node.status)}
                  <span>{node.status}</span>
                </div>
                <div>
                  <Badge variant="outline" className="bg-kubernetes-blue/10 text-kubernetes-blue border-kubernetes-blue/20">
                    {node.role}
                  </Badge>
                </div>
                <div>{node.age}</div>
                <div>{node.version}</div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">{node.cpu.usage}%</span>
                    <span className="text-xs text-muted-foreground">{node.cpu.capacity} cores</span>
                  </div>
                  <Progress 
                    value={node.cpu.usage} 
                    className="h-1.5" 
                    indicatorClassName={
                      node.cpu.usage > 80 ? "bg-kubernetes-red" : 
                      node.cpu.usage > 60 ? "bg-kubernetes-yellow" : 
                      "bg-kubernetes-green"
                    }
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">{node.memory.usage}%</span>
                    <span className="text-xs text-muted-foreground">{node.memory.capacity}</span>
                  </div>
                  <Progress 
                    value={node.memory.usage} 
                    className="h-1.5" 
                    indicatorClassName={
                      node.memory.usage > 80 ? "bg-kubernetes-red" : 
                      node.memory.usage > 60 ? "bg-kubernetes-yellow" : 
                      "bg-kubernetes-green"
                    }
                  />
                </div>
              </div>
              {index < nodes.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NodesList;
