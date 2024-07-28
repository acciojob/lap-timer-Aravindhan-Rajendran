import React, { useState, useEffect, useRef } from 'react';
import '../styles/App.css';

const formatTime = (time) => {
    const minutes = Math.floor(time / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const centiseconds = time % 100;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(centiseconds).padStart(2, '0')}`;
};

const App = () => {
    const [time, setTime] = useState(0); // Time in centiseconds
    const [laps, setLaps] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 10);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [isRunning]);

    const startTimer = () => setIsRunning(true);
    const stopTimer = () => setIsRunning(false);
    const resetTimer = () => {
        setIsRunning(false);
        setTime(0);
        setLaps([]);
    };
    const recordLap = () => {
        if (isRunning) {
            setLaps(prevLaps => [...prevLaps, time]);
        }
    };

    return (
        <div className="lap-timer">
            <div className="timer-display">
                {formatTime(time)}
            </div>
            <div className="controls">
                <button onClick={startTimer} disabled={isRunning}>Start</button>
                <button onClick={stopTimer} disabled={!isRunning}>Stop</button>
                <button onClick={recordLap} disabled={!isRunning}>Lap</button>
                <button onClick={resetTimer}>Reset</button>
            </div>
            <div className="lap-list">
                {laps.length > 0 && (
                    <ul>
                        {laps.map((lap, index) => (
                            <li key={index}>{formatTime(lap)}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default App;
