const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const { connectDB, sequelize } = require("./config/db");
require("./models/User");
const authRouter = require("./routes/authRoutes");
const ownerRouter = require("./routes/ownerRoutes");
const adminRouter = require("./routes/adminRoutes");
const ratingRouter = require("./routes/ratingRoutes");
const userRouter = require("./routes/userRouter");

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/admin", adminRouter);
app.use("/api/ratings", ratingRouter);
app.use("/api/user", userRouter);

const PORT = process.env.PORT;

(async () => {
  await connectDB();
  // await sequelize.sync({ alter: true });
  await sequelize.sync();
  app.listen(PORT, () => console.log(`API running on ${PORT}`));
})();