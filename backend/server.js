const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectDB, sequelize } = require("./config/db");
require("./models/User");
const authRouter = require("./routes/authRoutes");

const app = express();
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

const PORT = process.env.PORT;

(async () => {
  await connectDB();
  await sequelize.sync();
  app.listen(PORT, () => console.log(`API running on ${PORT}`));
})();