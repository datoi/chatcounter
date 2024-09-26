import {useEffect, useState} from 'react'
import './App.css'

export default function App() {
    const [counters, setCounters] = useState(() => {
        const savedCounters = localStorage.getItem("counters");
        return savedCounters
            ? JSON.parse(savedCounters)
            : {
                EST: 0,
                LVA: 0,
                LTU: 0,
                RU: 0,
            };
    });

    useEffect(() => {
        localStorage.setItem("counters", JSON.stringify(counters));
    }, [counters]);

    const increment = (section) => {
        setCounters((prevCounters) => ({
            ...prevCounters,
            [section]: prevCounters[section] + 1,
        }));
    };

    const decrement = (section) => {
        setCounters((prevCounters) => ({
            ...prevCounters,
            [section]: prevCounters[section] - 1,
        }));
    };

    const refreshStorage = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <div className="App">
            <div>
                <button className="clean" onClick={refreshStorage}>
                    Clean
                </button>
            </div>

            <div className="contBox">
                <div className="cont">
                    <h1 style={{ color: "lightblue", textAlign: "center" }}>Converse</h1>
                    {Object.keys(counters).map((section) => (
                        <div className="counts" key={section}>
                            <h1 className={section.toLowerCase()}>{section}</h1>
                            <div>
                                <button
                                    className="decrementButton"
                                    onClick={() => decrement(section)}
                                >
                                    -
                                </button>
                                <span>{counters[section]}</span>
                                <button
                                    className="incrementButton"
                                    onClick={() => increment(section)}
                                >
                                    +
                                </button>
                            </div>
                            <hr />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
