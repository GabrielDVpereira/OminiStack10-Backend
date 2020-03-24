const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const routes = require("./routes");
const cors = require("cors");
const { setupWebsocket } = require("./websocket");

const app = express();
const server = http.Server(app); //extraindo o servidor http do express
setupWebsocket(server);

mongoose.connect(
  "mongodb+srv://oministack:gabriel299@cluster0-ldd1j.mongodb.net/week10?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(express.json());
app.use(cors());

app.use(routes);

app.listen(process.env.PORT || 3333);
