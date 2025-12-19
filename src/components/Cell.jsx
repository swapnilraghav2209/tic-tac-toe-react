import React from 'react';

/**
 * Cell Component
 * Represents a single square on the Tic-Tac-Toe board.
 * 
 * @param {Object} props - Component props
 * @param {string|null} props.value - The value to display ('X', 'O', or null)
 * @param {function} props.onClick - Function to call when the cell is clicked
 */
const Cell = ({ value, onClick }) => {
    // Determine if the cell is populated to style it differently
    const styleClass = value ? `cell ${value.toLowerCase()}` : 'cell';

    return (
        <button className={styleClass} onClick={onClick}>
            {value}
        </button>
    );
};

export default Cell;
