import {useState} from "react";

import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import Player from "./components/Player.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const PLAYERS = {
    X: "Player 1",
    O: "Player 2",
};

const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

function deriveActivePlayer(gameTurn) {
    let currentPlayer = "X";

    if (gameTurn.length > 0 && gameTurn[0].player === "X") {
        currentPlayer = "O";
    }

    return currentPlayer;
}

function deriveGameBoard(gameTurns) {
    let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

    for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, col } = square;

        gameBoard[row][col] = player;
    }

    return gameBoard;
}

function deriveWinner(gameBoard, player) {
    let winner;

    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

        if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
            winner = player[firstSquareSymbol];
        }
    }

    return winner;
}

function App() {
    const [gameTurns, setGameTurns] = useState([]);
    const [players, setPlayers] = useState(PLAYERS);

    const activePlayer = deriveActivePlayer(gameTurns);
    const gameBoard = deriveGameBoard(gameTurns);
    const winner = deriveWinner(gameBoard, players);
    const hasDraw = gameTurns.length === 9 && !winner;


    const handleActivePlayer = (rowIndex, symbolIndex) => {
        setGameTurns((prevState) => {
            const currentPlayer = deriveActivePlayer(prevState);

            return [
                {square: {row: rowIndex, col: symbolIndex}, player: currentPlayer},
                ...prevState,
            ];
        });
    };

    const handleRematch = () => {
        setGameTurns([]);
    }

    const handlePlayerChange = (symbol, newName) => {
        setPlayers((prevPlayer) => {
            return {
                ...prevPlayer,
                [symbol]: newName
            };
        })
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player name={PLAYERS.X} symbol="X" isActive={activePlayer === "X"} onChangeName={handlePlayerChange} />
                    <Player name={PLAYERS.O} symbol="O" isActive={activePlayer === "O"} onChangeName={handlePlayerChange} />
                </ol>
                {(winner || hasDraw) && <GameOver winner={winner} onRematch={handleRematch}/>}
                <GameBoard onSelectPlayer={handleActivePlayer} board={gameBoard} />
            </div>
            <Log turns={gameTurns}/>
        </main>
    );
}

export default App
