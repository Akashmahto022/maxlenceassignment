import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";

const app = express();

app.use(cors());
app.use(cookieparser());

app.use("/api/v1/user", router);

app.get("/", (req, res) => {
  res.send("hello world");
});

export { app };
