const express = require("express");
const methodOverride = require("method-override");
const cors = require("cors");

const path = require("path");
const port = 3000;
const app = express();

const checklistsRouter = require("./src/routes/checklists");
const userRouter = require("./src/routes/user");
const rootRouter = require("./src/routes/index");

require("./config/database");

app.use(express.json());
app.use(methodOverride("_method"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/checklists", checklistsRouter);

app.listen(port, () => {
  console.log(`start server on port ${port}`);
});
