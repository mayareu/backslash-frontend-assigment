import { useState } from 'react';
import Canvas from './components/canvas/canvas';
import { FlowObj } from './components/flow/flow.model';
import SideBar from './components/side-bar/side-bar';
import dataStore from './stores/stores';

function App() {
  const [flow, setFlow] = useState<FlowObj>(
    dataStore.getFlow() || ({} as FlowObj)
  );
  function handleFlowIdChange(id: string): void {
    dataStore.setFlowId(id);
    const newFlow = dataStore.getFlow();
    newFlow && setFlow(newFlow);
  }
  return (
    <>
      <SideBar
        click={(e) => handleFlowIdChange(e)}
        selected={dataStore.flowId}
        flowMap={dataStore.data}
      />
      <Canvas flow={flow} />
      <div />
    </>
  );
}

export default App;
