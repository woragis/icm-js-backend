const app = require("./app");
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("Server running on port https://localhost:" + port);
});
