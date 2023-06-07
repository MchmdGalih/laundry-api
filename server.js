const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./app/models");
const authRoute = require("./app/router/auth");
const userRoute = require("./app/router/user");
const statusRoute = require("./app/router/status");
const orderRoute = require("./app/router/orders");
const transactionRoute = require("./app/router/transcation");

dotenv.config();

const app = express();

const port = process.env.PORT || 4500;

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:4500",
  })
);
app.use(cookieParser());
app.use(authRoute);
app.use(userRoute);
app.use(statusRoute);
app.use(orderRoute);
app.use(transactionRoute);

db.sequelize.sync().then(() => {
  app.listen(port, () => console.log(`Server running on port ${port}`));
});
