import { useEffect , useState } from "react";
import { Button, Card, Input, Typography } from "antd";
import socket from "../services/websocket";
import type { GameMessage } from "../types/game";

const { Title, Text } = Typography;

function Home() {

    const [username, setUsername] = useState("");
    const [connected, setConnected] = useState(false);

    const [gameState, setGameState] = useState<GameMessage | null>(null);

    useEffect(() => {

        socket.onopen = () => {
            console.log("Conectado al servidor WebSocket");
        };

        socket.onmessage = (event) => {

            const data: GameMessage = JSON.parse(event.data);

            console.log("Mensaje recibido:", data);

            setGameState(data);

        };

    }, []);

    const handleJoin = () => {

        if (!username.trim()) return;

        localStorage.setItem("username", username);

        console.log("Usuario:", username);

        setConnected(true);

    };

    const sendLetter = (letter : string) => {

        socket.send(JSON.stringify({
            type: "guess",
            letter,
            player: username
        }));

    };

    //Login
    if(!connected){
        return (
            <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f5f5f5"
            }}
        >
            <Card style={{ width: 400 }}>

                <Title level={2} style={{ textAlign: "center" }}>
                    Ahorcado Online
                </Title>

                <Input
                    placeholder="Ingresa tu nombre"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ marginBottom: 16 }}
                />

                <Button
                    type="primary"
                    block
                    onClick={handleJoin}
                >
                    Jugar
                </Button>

            </Card>
        </div>
        );
    };

    return (
      <div style={{ padding: 40 }}>

            <Title>Ahorcado</Title>

            <Text strong>Jugador: {username}</Text>

            <br /><br />

            <Title level={2}>
                {gameState?.word || "_ _ _ _"}
            </Title>

            <Text>
                Intentos restantes: {gameState?.attempts ?? 6}
            </Text>

            <br /><br />

            <Input.Search
            placeholder="Ingresa una letra"
            enterButton="Enviar"
            maxLength={1}
            onSearch={(value) => sendLetter(value)}
            style={{ width: 300 }}
            />

            <br /><br />

            <Text>{gameState?.message}</Text>

      </div>  
    );
}

export default Home;