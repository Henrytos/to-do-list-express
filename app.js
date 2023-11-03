const express = require("express");
const checklists = require("./src/routes/checklists");

const app = express();
app.use(express.json());

app.use("/checklists", checklists);

app.listen(3000, () => {
  console.log("iniciando servidor");
});

// Path: src/routes/checklists.js
