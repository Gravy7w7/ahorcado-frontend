import { useEffect, useState } from "react";
import { Card, Typography } from "antd";
import socket from "../services/websocket";
import type { GameMessage } from "../types/game";
import "./css/styles.css";
import { HumanDrawing } from "../components/humanDrawing";

const { Title, Text } = Typography;

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function Home() {
    const [username, setUsername] = useState("");
    const [connected, setConnected] = useState(false);
    const [gameState, setGameState] = useState<GameMessage | null>(null);
    const [usedLetters, setUsedLetters] = useState<Record<string, "correct" | "wrong">>({});
    const [lastGuess, setLastGuess] = useState<{ letter: string; correct: boolean } | null>(null);

    useEffect(() => {
        socket.onopen = () => {
            console.log("Conectado al servidor WebSocket");
        };

        socket.onmessage = (event) => {
            const data: GameMessage = JSON.parse(event.data);
            console.log("Mensaje recibido:", data);


            if(data.message === "Iniciando Nueva partida"){
                setUsedLetters({});
                setLastGuess(null);
            } else {
                const newUsed: Record<string, "correct" | "wrong"> = {};
                data.usedLetters?.forEach((letter: string) => {
                    const isCorrect = data.word ? data.word.includes(letter): false;
                    newUsed[letter] = isCorrect ? "correct" : "wrong";
                });
                setUsedLetters(newUsed);
            }

            setGameState(data);
        };
    }, [gameState, lastGuess]);

    const handleJoin = () => {
        if (!username.trim()) return;
        localStorage.setItem("username", username);
        setConnected(true);
    };

    const sendLetter = (letter: string) => {
        if (usedLetters[letter]) return;
        setLastGuess({ letter, correct: false });
        socket.send(
            JSON.stringify({
                type: "guess",
                letter,
                player: username,
            })
        );
    };

    const attemptsLeft = gameState?.attempts ?? 6;
    const numberOfGuesses = 6 - attemptsLeft;

   //login
    if (!connected) {
        return (
            <div className="container">
                <div className="login-card">
                    <h1 className="game-title">Ahorcado Online</h1>
                    <p className="login-subtitle">¿Te atreves a jugar?</p>
                    <input
                        className="game-input"
                        placeholder="Ingresa tu nombre"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleJoin()}
                        maxLength={20}
                    />
                    <button className="btn-play" onClick={handleJoin}>
                        Iniciar partida
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="game-page">
            <h1 className="game-title animate-title">Ahorcado</h1>

            <div
                className={`attempts-badge ${
                    attemptsLeft <= 2 ? "attempts-danger" : attemptsLeft <= 4 ? "attempts-warn" : ""
                }`}
            >
                Intentos restantes: {attemptsLeft}
            </div>

            <div className="game-layout">
                {/* ── Idibujo + palabra ── */}
                <Card className="left-card">
                    <HumanDrawing numberOfGuesses={numberOfGuesses} />

                    <div className="word-display">
                        {(gameState?.word || "_ _ _ _").split("").map((char, i) =>
                            char === " " ? (
                                <div key={i} className="letter-spacer" />
                            ) : (
                                <div
                                    key={i}
                                    className={`letter-box ${char !== "_" ? "revealed" : ""}`}
                                >
                                    {char !== "_" ? char : ""}
                                </div>
                            )
                        )}
                    </div>
                </Card>

                {/* ── mensajes y teclado ── */}
                <Card className="right-card">
                    <div className="message-box">
                        <Text>{gameState?.message || "Nuevo juego iniciado. ¡Buena suerte!"}</Text>
                    </div>

                    <div className="player-tag">
                         {username}
                    </div>

                    <div className="keyboard-section">
                        <div className="keyboard-grid">
                            {ALPHABET.map((letter) => {
                                const status = usedLetters[letter];
                                return (
                                    <button
                                        key={letter}
                                        className={`key-btn ${status ? `key-${status}` : ""}`}
                                        onClick={() => sendLetter(letter)}
                                        disabled={!!status}
                                        aria-label={`Letra ${letter}`}
                                    >
                                        {letter}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="keyboard-legend">
                        <span className="legend-item legend-correct">✓ correcta</span>
                        <span className="legend-item legend-wrong">✗ incorrecta</span>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default Home;