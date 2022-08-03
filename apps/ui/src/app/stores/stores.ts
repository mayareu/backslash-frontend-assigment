import {
  generateFlowMapFromData,
  getNodesDataFromCsv,
  getJoinedFlow,
} from '../app.utils';
import { FlowObj, NodeData } from '../components/flow/flow.model';

class DataStore {
  nodes: Array<NodeData>;
  data: Map<string, FlowObj>;
  flowId: string;
  constructor() {
    this.nodes = getNodesDataFromCsv();
    const data = generateFlowMapFromData(this.nodes);
    this.data = getJoinedFlow(data, this.nodes);
    this.flowId = 'flow 1';
  }
  getData() {
    return this.data;
  }
  setFlowId(id: string) {
    this.flowId = id;
  }
  getFlow() {
    return this.data.get(this.flowId);
  }
}

const dataStore = new DataStore();
export default dataStore;
