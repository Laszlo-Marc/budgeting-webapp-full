import cors from "cors";
import express from "express";
import expenseRoutes from "./routes/expenseRoutes";
import loginRouter from "./routes/login-register";
const app = express();

app.use(cors());

app.use(express.json());
app.use("/api", expenseRoutes);
app.use("/api", loginRouter);

export default app;
