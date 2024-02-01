import React, { useState } from 'react';
import styles from './form.styles.module.css';

function ProRate() {
    const [rentAmount, setRentAmount] = useState(0);
    const [moveInDate, setMoveInDate] = useState('');
    const [proratedRent, setProratedRent] = useState(0);
    const [error, setError] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        try {
            const moveInDateObj = new Date(moveInDate);
            if (isNaN(moveInDateObj)) {
                throw new Error('Invalid move-in date');
            }

            const daysInMonth = new Date(moveInDateObj.getFullYear(), moveInDateObj.getMonth() + 1, 0).getDate();
            const calculatedRent = (rentAmount / daysInMonth) * (daysInMonth - moveInDateObj.getDate());
            const proratedRentValue = calculatedRent.toFixed(2);
            setProratedRent(proratedRentValue);
            setError('');


        } catch (err) {
            setProratedRent(0);
            setError(err.message);
        }
    }

    return (
        <div className={styles.wrapper}>

            <form className={styles.form} onSubmit={handleSubmit}>
                <h1>Prorated Rent Calculator</h1>
                <label htmlFor="rent">Rent amount:</label>
                <input
                    type="number"
                    id="rent"
                    name="rent"
                    min="0"
                    max="10000"
                    value={rentAmount}
                    onChange={(e) => setRentAmount(parseFloat(e.target.value))}
                    required
                />
                <label htmlFor="move-in-date">Move-in date:</label>
                <input
                    type="date"
                    id="move-in-date"
                    name="move-in-date"
                    value={moveInDate}
                    onChange={(e) => setMoveInDate(e.target.value)}
                    required
                />
                <input type="submit" value="Calculate"/>

                {proratedRent !== null && !error && (
                    <div className="result">
                        <p>Prorated Rent: ${proratedRent}</p>
                    </div>
                )}

                {error && (
                    <div style={{ color: 'red' }}>
                        <p>Error: {error}</p>
                    </div>
                )}
            </form>


        </div>
    );
}

export default ProRate;
