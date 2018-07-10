const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
console.log(db);
mongoose
  .connect(db)
  .then(() => console.log("Connected to mongoDB"))
  .catch(err => console.log(err));

const express = require("express");
const app = express();

const bp = require("body-parser");
app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));

const cors = require("cors");
app.use(cors());

const sudo = require("sudo");

const passport = require("passport");
app.use(passport.initialize());
require("./config/passport")(passport);

const users = require("./routes/user");
app.use("/api/users", users);

app.get(
  "/restart",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let restart = sudo(["systemctl", "restart", "fivem.service"], {});
    restart.stdout.on("error", e => res.json({ error: e }));
    res.json({ restart: "OK" });
  }
);

app.get(
  "/stop",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let stop = sudo(["systemctl", "stop", "fivem.service"], {});
    stop.stdout.on("error", e => res.json({ error: e }));
    res.json({ stop: "OK" });
  }
);

app.get(
  "/start",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let start = sudo(["systemctl", "start", "fivem.service"], {});
    start.stdout.on("error", e => res.json({ error: e }));
    res.json({ start: "OK" });
  }
);

app.get(
  "/status",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let status = sudo(["systemctl", "status", "fivem.service"], {});
    status.stdout.on("error", e => res.json({ error: e }));
    status.stdout.on("data", d => res.json({ status: d }));
  }
);

app.listen(80, () => console.log("app running"));
