const express = require("express");
const app = express();

const bp = require("body-parser");
app.use(bp.json());

const cors = require("cors");
app.use(cors());

const sudo = require("sudo");

app.get("/restart", (req, res) => {
  let restart = sudo(["systemctl", "restart", "fivem.service"], {});
  restart.stdout.on("data", d => res.json({ data: d }));
  restart.stdout.on("error", e => res.json({ error: e }));
  res.json({restart: "OK"});
});

app.listen(9000, () => console.log("app running"));
