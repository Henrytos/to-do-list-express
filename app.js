const express = require("express");
const port = 3000;

const checklistsRouter = require("./src/routes/checklists");
const userRouter = require("./src/routes/user");
const rootRouter = require("./src/routes/index");

const path = require("path");

require("./config/database");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/checklists", checklistsRouter);

app.listen(port, () => {
  console.log(`start server on port ${port}`);
});
