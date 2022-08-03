import { Edge, Node } from 'react-flow-renderer';

export interface NodeData {
  id: string;
  data: { label: string };
  type: string;
  position?: { x: number; y: number };
}

export interface FlowSkeleton {
  id: string;
  edges: Array<Edge>;
}

export interface FlowObj extends FlowSkeleton {
  nodes: Array<Node>;
}
