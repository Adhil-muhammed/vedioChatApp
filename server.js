const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

io.on("connection", (socket) => {
  socket?.emit("user joined", socket.id);

  socket?.on("disconnect", () => {
    socket.brodcast.emit("user disConnected");
  });

  socket?.on("callUser", ({ userToCall, signalData, from, name }) => {
    io?.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });
});

server.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
