import ReactFlow, { Controls, DefaultEdgeOptions } from 'react-flow-renderer';
import { FlowObj } from './flow.model';

const defaultEdgeOptions: DefaultEdgeOptions = {
  type: 'smoothstep',
  animated: true,
};

const Flow = (props: { flowObj: FlowObj }) => (
  <ReactFlow
    nodes={props.flowObj.nodes}
    edges={props.flowObj.edges}
    nodesDraggable={false}
    nodesConnectable={false}
    defaultEdgeOptions={defaultEdgeOptions}
    fitView
  >
    <Controls showInteractive={false} showZoom={false} />
  </ReactFlow>
);

export default Flow;
