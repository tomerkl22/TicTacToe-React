import Cell from './Cell';
import './Board.css';
import { useState, useEffect, useContext } from 'react';
import HistoryContext from './historyContext';

const partterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let gameOver = false;

const Board = (props) => {
    const[board, setBoard] = useState(["","","","","","","","",""]);
    const[turn, setTurn] = useState(props.currTurn);
    const{addToHistory} = useContext(HistoryContext);
    
    useEffect(() => {
        if(!winnerCheck())
           isTie();       
    }, [board])

    const cellClicked = (ind) =>{
        setBoard(board.map((val, index) => 
        {
            if(ind === index && val === "")
            {
                return turn;
            }
            else{
                return val;
            }
        }))
    if(turn === "X")
    {
        setTurn("O");
        props.swapTurn("O");
    }
    else{
        setTurn("X");
        props.swapTurn("X");
    }
 
}


const winnerCheck = () =>{
    let winner = false;
    partterns.forEach((currPattern) => {
        const firstPlayer = board[currPattern[0]];
        if(firstPlayer === "") 
            return;
        let foundWinner = true;
        currPattern.forEach((index) => {
            if(board[index] !== firstPlayer){
                foundWinner = false;
            }
        });
        if(foundWinner){
            gameOver = true;
            winner = true;
            let date = new Date();
            let strDate = date.toISOString();
            if(turn === "X"){
                let winner = "O";
                addToHistory({winningPlayer: winner, date: strDate});
                props.winner("O is the winner!");
                setTurn("---");
                props.swapTurn("---");
                 }
            else{
                let winner = "X";
                addToHistory({winningPlayer: winner, date: strDate});
                props.winner("X is the winner!");
                setTurn("---");
                props.swapTurn("---");
            }
        }
    });
    return winner;
}

const isTie = () => {
    let tie = true;
    board.map((val) => {
        if(val === ""){
            tie = false;
        }
    })
   if(tie){
       let date = new Date();
       let strDate = date.toISOString();
       let winningP = "Draw";
       addToHistory({winningPlayer: winningP, date: strDate});
       props.winner("Game is a tie!");
        setTurn("---");
        props.swapTurn("---");

   }
}

const restart = () => {
    setBoard(["","","","","","","","",""]);
    setTurn("X");
    props.swapTurn("X");
    props.winner("");
    gameOver = false;
}

    return(
        <div className="Board">
            {board.map( (val, index) => {
                return (<Cell key={index} turn={turn} val={val} ind ={index} clicked={cellClicked} gameOver={gameOver} ></Cell>)
            })}
        <h1></h1>
         <button id='Restart' onClick={restart}>Restart </button>
        </div>
        
    );
}

export default Board;
