import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
import router from "./routes/user.route.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieparser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/user", router);

app.get("/", (req, res) => {
  res.send("hello world");
});

export { app };
