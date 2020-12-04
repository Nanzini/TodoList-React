import React from 'react';
import ReactDOM from 'react-dom';
import { Tmp, foodILike, App } from './App';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


ReactDOM.render(<Com />
  ,
  document.getElementById('root1')
);

function Com() {
  return (
    <div>
      <h1>이대로 가자!</h1>
    </div>
  )
}