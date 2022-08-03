import { Edge, Node } from 'react-flow-renderer';
import { getEdgesCsvString, getNodesCsvString } from './app.consts';
import { FlowObj, NodeData, FlowSkeleton } from './components/flow/flow.model';

const nodeMarginX = 125;
const nodeMarginY = 150;
const rowSplitChar = '\n';
const emptyRowSplitChar = '\n ';
const columnSplitChar = ',';
const defaultNodePosition = { x: 0, y: 0 };
const joinedFlowId = 'joined';

export const generateFlowMapFromData = (
  nodesData: Array<NodeData>
): Map<string, FlowObj> => {
  const flows: Array<FlowObj> = getFlowsFromEdgesCsv(nodesData);
  const flowMap = new Map<string, FlowObj>();
  flows.forEach((flow) => flowMap.set(flow.id, flow));
  return flowMap;
};

export const getNodesDataFromCsv = (): Array<NodeData> => {
  const nodesDataRows: string[] = getNodesCsvString
    .split(rowSplitChar)
    .map((str) => str.trim());
  const headers = nodesDataRows.splice(0, 1)[0].split(columnSplitChar);
  return nodesDataRows.map<NodeData>((rowStr: string) =>
    modifyArrToNodeData(headers, rowStr.trim().split(columnSplitChar))
  );
};

const modifyArrToNodeData = (
  keys: string[],
  rowAttributes: string[]
): NodeData =>
  keys.reduce<NodeData>((acc: NodeData, cur: string, index: number) => {
    const attr =
      cur === 'label' ? { label: rowAttributes[index] } : rowAttributes[index];
    const key = cur === 'label' ? 'data' : cur;
    return {
      ...acc,
      [key]: attr,
    };
  }, {} as NodeData);

const getFlowsFromEdgesCsv = (nodesData: Array<NodeData>): Array<FlowObj> =>
  getEdgesCsvString
    .split(emptyRowSplitChar)
    .map((flowDataStr) => generateFlowObject(flowDataStr, nodesData));

const generateFlowObject = (
  flowDataStr: string,
  nodesData: Array<NodeData>
): FlowObj => {
  const flowSkeleton = getFlowSkelaton(flowDataStr);
  return assignFlowNodes(flowSkeleton, nodesData);
};

const getFlowSkelaton = (flowDataStr: string): FlowSkeleton => {
  const arr = flowDataStr.split(rowSplitChar);
  const id = arr.splice(0, 1)[0];
  return {
    id,
    edges: generateFlowEdges(arr),
  };
};

const assignFlowNodes = (
  FlowSkeleton: FlowSkeleton,
  nodesData: Array<NodeData>
): FlowObj => {
  return {
    ...FlowSkeleton,
    nodes: getFlowNodesByEdges(FlowSkeleton.edges, nodesData),
  };
};

const generateFlowEdges = (array: Array<string>): Array<Edge> =>
  array.map((s) => getEdgeFromStr(s));

const getEdgeFromStr = (str: string): Edge => {
  const idArr = str.split(columnSplitChar).filter((s) => s.trim() !== '');
  const source = idArr[0];
  const target = idArr[1];
  return { id: `edge_${idArr[0]}_${idArr[1]}`, source, target };
};

const getFlowNodesByEdges = (
  edges: Array<Edge>,
  nodesData: Array<NodeData>
): Array<Node> => {
  const flowNodes: string[] = [];
  edges.forEach((edge) => {
    !flowNodes.includes(edge.source) && flowNodes.push(edge.source);
    !flowNodes.includes(edge.target) && flowNodes.push(edge.target);
  });
  return getFlowNodesByIds(flowNodes, nodesData);
};

const getFlowNodesByIds = (
  flowNodesIds: Array<string>,
  nodesData: Array<NodeData>
): Array<Node> => {
  return nodesData
    .filter((nodeData) => flowNodesIds.includes(nodeData.id))
    .map<Node>((nodeData: NodeData, i) => {
      return {
        ...nodeData,
        position: { x: i * nodeMarginX, y: i * nodeMarginY },
      };
    });
};

export const getFlowNodesFromData = (
  nodesData: Array<NodeData>
): Array<Node> => {
  const flowNodes = [
    { ...nodesData.splice(0, 1)[0], position: defaultNodePosition },
  ];
  const sinkNode: NodeData = nodesData?.pop() || ({} as NodeData);
  const switchAtIndex = nodesData.length / 2;
  nodesData.reduce<Array<Node>>((acc: Array<Node>, cur: NodeData, i) => {
    acc.push({
      ...cur,
      position: { x: calcPositionX(i, switchAtIndex), y: nodeMarginY },
    });
    return acc;
  }, flowNodes);
  flowNodes.push({ ...sinkNode, position: { x: 0, y: nodeMarginY * 2 } });
  return flowNodes;
};

const calcPositionX = (nodeIndex: number, switchAtIndex: number): number => {
  nodeIndex++;
  const multiplyBy =
    nodeIndex - 1 >= switchAtIndex ? switchAtIndex - nodeIndex : nodeIndex;
  const nodeMarginBetween = (Math.abs(multiplyBy) === 1 ? -41 : 0) * multiplyBy;
  return multiplyBy * nodeMarginX + nodeMarginBetween;
};

export const getJoinedFlow = (
  flowMap: Map<string, FlowObj>,
  nodes: Array<NodeData>
): Map<string, FlowObj> => {
  const edges = Array.from(flowMap.values()).reduce(
    (acc: Array<Edge>, cur: FlowObj) => {
      acc.push(...cur.edges);
      return acc;
    },
    []
  );
  flowMap.set(joinedFlowId, {
    id: joinedFlowId,
    edges,
    nodes: getFlowNodesFromData(nodes),
  });
  console.log(flowMap);
  return flowMap;
};
