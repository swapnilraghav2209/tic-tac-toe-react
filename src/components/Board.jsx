import React, { useState } from 'react';
import Cell from './Cell';

/**
 * Board Component
 * Manages the state of the game and renders the grid.
 */
const Board = () => {
    // State to store the value of each of the 9 squares (null, 'X', or 'O')
    const [squares, setSquares] = useState(Array(9).fill(null));

    // State to track whose turn it is (true for X, false for O)
    const [xIsNext, setXIsNext] = useState(true);

    // State to store the scores
    const [scores, setScores] = useState({ x: 0, o: 0 });

    // Helper function to calculate the winner
    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2], // Top row
            [3, 4, 5], // Middle row
            [6, 7, 8], // Bottom row
            [0, 3, 6], // Left column
            [1, 4, 7], // Middle column
            [2, 5, 8], // Right column
            [0, 4, 8], // Diagonal top-left to bottom-right
            [2, 4, 6], // Diagonal top-right to bottom-left
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            // Check if the three squares have the same non-null value
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const winner = calculateWinner(squares);
    const isDraw = !winner && squares.every((square) => square !== null);

    // Status message logic
    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    } else if (isDraw) {
        status = "It's a Draw!";
    } else {
        status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }

    // Handle click on a square
    const handleClick = (i) => {
        // Return early if square is already filled or if game is won
        if (squares[i] || calculateWinner(squares)) {
            return;
        }

        // Create a copy of the squares array to maintain immutability
        const nextSquares = squares.slice();
        nextSquares[i] = xIsNext ? 'X' : 'O';

        setSquares(nextSquares);
        setXIsNext(!xIsNext);

        // Check for winner with the *new* state (we need to pass nextSquares because state update is async/batched)
        // Wait, calculateWinner tells us if there *is* a winner in the passed squares.
        // We just updated squares to nextSquares.
        const newWinner = calculateWinner(nextSquares);
        if (newWinner) {
            setScores(prevScores => ({
                ...prevScores,
                [newWinner.toLowerCase()]: prevScores[newWinner.toLowerCase()] + 1
            }));
        }
    };

    // Reset the game to initial state
    const resetGame = () => {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
    };

    // Reset scores
    const resetScores = () => {
        setScores({ x: 0, o: 0 });
    };

    return (
        <div className="board-container">
            <div className="scoreboard" style={{ marginBottom: '20px', display: 'flex', gap: '2rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
                <div className="score-x">Player X: {scores.x}</div>
                <div className="score-o">Player O: {scores.o}</div>
            </div>
            <div className="status">{status}</div>
            <div className="board">
                <div className="board-row">
                    <Cell value={squares[0]} onClick={() => handleClick(0)} />
                    <Cell value={squares[1]} onClick={() => handleClick(1)} />
                    <Cell value={squares[2]} onClick={() => handleClick(2)} />
                </div>
                <div className="board-row">
                    <Cell value={squares[3]} onClick={() => handleClick(3)} />
                    <Cell value={squares[4]} onClick={() => handleClick(4)} />
                    <Cell value={squares[5]} onClick={() => handleClick(5)} />
                </div>
                <div className="board-row">
                    <Cell value={squares[6]} onClick={() => handleClick(6)} />
                    <Cell value={squares[7]} onClick={() => handleClick(7)} />
                    <Cell value={squares[8]} onClick={() => handleClick(8)} />
                </div>
            </div>
            <div className="controls" style={{ marginTop: '20px', display: 'flex', gap: '1rem' }}>
                <button className="reset-button" onClick={resetGame}>
                    Reset Game
                </button>
                <button className="reset-scores-button" onClick={resetScores}>
                    Reset Scores
                </button>
            </div>
        </div>
    );
};

export default Board;
