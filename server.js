const express = require("express");
const helmet = require("helmet");
const server = express();

// middlewares
server.use(express.json());
server.use(helmet());

const projectsRouter = require("./routers/projects-router");
const actionsRouter = require("./routers/actions-router.js");

// routing
server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

// route handlers
server.get("/", (req, res) => {
  res.send("It's working!");
});

module.exports = server;
