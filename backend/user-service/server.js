const app = require("./app");

const PORT = process.env.PORT || 5000;

console.log(`User Service running on port ${PORT}`);

app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});
