import React from 'react';
import './cell.css';

const Cell = (props) => {
    
  const handleClick= () => {
      if (props.gameOver){
          return;
      }
      if (props.val === ""){
      props.clicked(props.ind);
      }
    }

  return (
    <div className="Cell" onClick={handleClick}>
      <h3>{props.val}</h3>
    </div>
  );
}

export default Cell;
