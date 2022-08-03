import { useEffect } from 'react';
import { useState } from 'react';
import { FlowObj } from '../flow/flow.model';
import './flow-selector.scss';

const FlowSelector = (props: {
  click: (id: string) => void;
  flowMap: Map<string, FlowObj>;
  selected: string;
}) => {
  const [flows, setFlows] = useState<Array<string>>([]);
  useEffect(() => setFlows(Array.from(props.flowMap.keys())), [props.flowMap]);
  const flowsElemList = flows.map((flowId) => (
    <div
      className={props.selected === flowId ? 'selected-flow' : 'flow'}
      onClick={() => props.click(flowId)}
    >
      <span>{flowId}</span>
    </div>
  ));
  return <div>{flowsElemList}</div>;
};

export default FlowSelector;
