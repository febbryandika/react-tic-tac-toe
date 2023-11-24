/* eslint-disable react/prop-types */
import { useState } from "react";

function Player({ name, symbol, isActive, onChangeName}) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(name)

    const handleEditClick = () => {
        setIsEditing((editing) => !editing);

        if (isEditing) {
            onChangeName(symbol, playerName)
        }
    };

    const handleNameChange = (event) => {
        setPlayerName(event.target.value);
    };

    let playerNameDisplay = <span className="player-name">{playerName}</span>;
    if (isEditing) {
        playerNameDisplay = <input type="text" required value={playerName} onChange={handleNameChange} />;
    }

    return (
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                {playerNameDisplay}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    );
}

export default Player;