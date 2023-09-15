const express = require("express");
const routes = require("./routes");

const port = 3000;

const app = express();

app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on: http://localhost:${port}`);
});
