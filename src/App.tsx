import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import "./App.css";
import { Slashchain } from "./slashchain/game";
import { GameComponent } from "./slashchain/view/game_state";

const PORT = process.env.PORT || "8000";
const masterUrl = process.env.REACT_APP_MASTER_URL

const App = Client({
  game: Slashchain,
  numPlayers: 2,
  board: GameComponent,
  multiplayer: SocketIO({
    server: `${masterUrl}:${PORT}`,
  }),
});

export default App;
