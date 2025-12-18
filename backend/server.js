const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const { connectDB, sequelize } = require("./config/db");
require("./models/User");
const authRouter = require("./routes/authRoutes");
const ownerRouter = require("./routes/ownerRoutes");

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/owner", ownerRouter);

const PORT = process.env.PORT;

(async () => {
  await connectDB();
  await sequelize.sync();
  app.listen(PORT, () => console.log(`API running on ${PORT}`));
})();