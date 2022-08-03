import './side-bar.scss';
import Header from '../header/header';
import FlowSelector from '../flow-selector/flow-selector';
import { FlowObj } from '../flow/flow.model';

const SideBar = (props: {
  click: (id: string) => void;
  flowMap: Map<string, FlowObj>;
  selected: string;
}) => (
  <div className="side-bar-container">
    <Header />
    <div className="flow-selector">
      <FlowSelector
        click={(e) => props.click(e)}
        selected={props.selected}
        flowMap={props.flowMap}
      />
    </div>
    <div className="task-name">Aws Typescript Serverless Demo</div>
  </div>
);

export default SideBar;
