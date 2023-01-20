import React from 'react';
import Game from './components/Game';
import './app.css';
import {HistoryProvider} from './components/historyContext';

function App(){
  return(
    <div >
      <HistoryProvider>
      <Game></Game>
      </HistoryProvider>
    </div>
  );
}

export default App;
