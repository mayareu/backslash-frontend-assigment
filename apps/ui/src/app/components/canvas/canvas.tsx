import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useState } from 'react';
import Flow from '../flow/flow';
import { FlowObj } from '../flow/flow.model';
import { getMethodLabelMap } from '../../app.consts';

import './canvas.scss';

const getFlowTitle = (id: string): string => getMethodLabelMap().get(id) || '';

const Canvas = observer<{ flow: FlowObj }>((props: { flow: FlowObj }) => {
  const [title, setTitle] = useState<string>(getFlowTitle(props.flow.id));
  useEffect(() => setTitle(getFlowTitle(props.flow.id)), [props.flow.id]);
  return (
    <div className="canvas">
      <span className="flow-title">
        method:<span className="content"> {title}</span>
      </span>
      <Flow flowObj={props.flow} />
    </div>
  );
});
export default Canvas;
