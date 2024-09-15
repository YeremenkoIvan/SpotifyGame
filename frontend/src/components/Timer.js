import { useEffect, useState } from "react";

export default function Timer({ time, onFinish }) {
    const formatTime = time => Math.round(time / 1000);

    const [currTime, setCurrTime] = useState(() => formatTime(Date.now()));

    useEffect(() => {
        const interval = setInterval(() => {
            if (formatTime(Date.now()) >= time) {
                clearInterval(interval);
                onFinish();
            } else {
                setCurrTime(formatTime(Date.now()));
                console.log(currTime);
                console.log(time);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [time]);

    const formatOutput = time => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return <h1>{formatOutput(time - currTime)}</h1>;
}
