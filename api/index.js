const express = require("express");
const app = express();

const bp = require("body-parser");
app.use(bp.json());

const cors = require("cors");
app.use(cors());

const sudo = require("sudo");

app.get("/restart", (req, res) => {
  let restart = sudo(["systemctl", "restart", "fivem.service"], {});
  restart.on("data", () => res.json({ restarted: "OK" }));
  restart.on("error", e => res.json({ error: e }));
});

app.listen(9000, () => console.log("app running"));
