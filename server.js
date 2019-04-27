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
  res.send("<h1>It's working!</h1>");
});

module.exports = server;

// 'use' allows us to add new middleware functions
// 'send' is a utility function. It allows us to send a response
// and we can attach a body which is type of any.
