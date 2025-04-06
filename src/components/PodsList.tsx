
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, AlertTriangle, Clock, Search, X } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for pods
const pods = [
  {
    name: "nginx-deployment-7f589ff8b9-abcde",
    namespace: "default",
    status: "Running",
    restarts: 0,
    age: "2d",
    node: "worker-node-1",
    ip: "10.0.0.12"
  },
  {
    name: "nginx-deployment-7f589ff8b9-fghij",
    namespace: "default",
    status: "Running",
    restarts: 1,
    age: "2d",
    node: "worker-node-2",
    ip: "10.0.0.13"
  },
  {
    name: "frontend-app-deployment-5c6f7d8e9f-klmno",
    namespace: "web",
    status: "Running",
    restarts: 0,
    age: "1d",
    node: "worker-node-1",
    ip: "10.0.0.14"
  },
  {
    name: "backend-api-deployment-1a2b3c4d5e-pqrst",
    namespace: "api",
    status: "Running",
    restarts: 0,
    age: "1d",
    node: "worker-node-3",
    ip: "10.0.0.15"
  },
  {
    name: "db-statefulset-0",
    namespace: "database",
    status: "Running",
    restarts: 0,
    age: "5d",
    node: "worker-node-2",
    ip: "10.0.0.16"
  },
  {
    name: "monitoring-daemonset-uvwxy",
    namespace: "monitoring",
    status: "Running",
    restarts: 0,
    age: "7d",
    node: "worker-node-1",
    ip: "10.0.0.17"
  },
  {
    name: "job-batch-processor-z1234",
    namespace: "batch",
    status: "Pending",
    restarts: 0,
    age: "1h",
    node: "",
    ip: ""
  },
  {
    name: "failed-pod-5678",
    namespace: "testing",
    status: "Error",
    restarts: 3,
    age: "5h",
    node: "worker-node-4",
    ip: "10.0.0.18"
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Running":
      return <CheckCircle className="h-4 w-4 text-kubernetes-green" />;
    case "Error":
    case "CrashLoopBackOff":
      return <AlertTriangle className="h-4 w-4 text-kubernetes-red" />;
    default:
      return <Clock className="h-4 w-4 text-kubernetes-yellow" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Running":
      return "bg-kubernetes-green/10 text-kubernetes-green border-kubernetes-green/20";
    case "Error":
    case "CrashLoopBackOff":
      return "bg-kubernetes-red/10 text-kubernetes-red border-kubernetes-red/20";
    default:
      return "bg-kubernetes-yellow/10 text-kubernetes-yellow border-kubernetes-yellow/20";
  }
};

const namespaces = [...new Set(pods.map(pod => pod.namespace))];

const PodsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [namespaceFilter, setNamespaceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPods = pods.filter(pod => {
    const matchesSearch = pod.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          pod.namespace.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pod.node.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesNamespace = namespaceFilter === "all" || pod.namespace === namespaceFilter;
    const matchesStatus = statusFilter === "all" || pod.status === statusFilter;
    
    return matchesSearch && matchesNamespace && matchesStatus;
  });

  return (
    <Card className="mt-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Pods</CardTitle>
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search pods..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <Button
                variant="ghost"
                className="absolute right-1 top-1.5 h-7 w-7 p-0"
                onClick={() => setSearchTerm("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          <div className="flex gap-4">
            <Select value={namespaceFilter} onValueChange={setNamespaceFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All namespaces" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All namespaces</SelectItem>
                {namespaces.map(ns => (
                  <SelectItem key={ns} value={ns}>{ns}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="Running">Running</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="grid grid-cols-7 gap-4 p-4 text-xs font-medium text-muted-foreground bg-muted/50">
            <div>NAME</div>
            <div>NAMESPACE</div>
            <div>STATUS</div>
            <div>RESTARTS</div>
            <div>AGE</div>
            <div>NODE</div>
            <div>IP</div>
          </div>
          <Separator />
          
          {filteredPods.length > 0 ? (
            filteredPods.map((pod, index) => (
              <React.Fragment key={pod.name}>
                <div className="grid grid-cols-7 gap-4 p-4 items-center">
                  <div className="font-medium truncate" title={pod.name}>{pod.name}</div>
                  <div>{pod.namespace}</div>
                  <div>
                    <Badge variant="outline" className={getStatusColor(pod.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(pod.status)}
                        {pod.status}
                      </span>
                    </Badge>
                  </div>
                  <div>{pod.restarts}</div>
                  <div>{pod.age}</div>
                  <div className="truncate" title={pod.node || "Not assigned"}>{pod.node || "Not assigned"}</div>
                  <div>{pod.ip || "Pending"}</div>
                </div>
                {index < filteredPods.length - 1 && <Separator />}
              </React.Fragment>
            ))
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              No pods matching your filters
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PodsList;
