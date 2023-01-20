import React from 'react';
import Board from './Board';   
import './Game.css';
import { useState } from 'react';

let resetBool = false;

const Game = () => {

    const[turn, setTurn] = useState("X");
    const[winner, setWinner] = useState("");

    const changeTurn = (player) => {
        setTurn(player);
    }

    const showWinner = (Message) => {
        setWinner(Message);    
    }


    return(
        <div className="Game">
            <h1> TicTacToe Game</h1>
            <Board currTurn = {turn} swapTurn = {changeTurn} winner = {showWinner} resetBool={resetBool} />
            <h1>{winner}</h1>
            <h1>It is {turn} turn </h1>
        </div>
    );
}

export default Game;
