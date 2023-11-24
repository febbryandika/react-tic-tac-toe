/* eslint-disable react/prop-types */
function GameBoard({ onSelectPlayer, board}) {
    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((symbol, symbolIndex) => (
                            <li key={symbolIndex}>
                                <button
                                    onClick={() => onSelectPlayer(rowIndex, symbolIndex)}
                                    disabled={symbol !== null}
                                >
                                    {symbol}
                                </button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}

export default GameBoard;