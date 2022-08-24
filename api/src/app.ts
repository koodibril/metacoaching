import express from "express";
import customerRoutes from "./modules/customer/customer";

const app = express();
app.use(express.static("public"));
const allowCrossDomain = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
};

app.use(allowCrossDomain);

app.use(express.json({ limit: "1mb" }));
app.use("/api/customer", customerRoutes);

export default app;
