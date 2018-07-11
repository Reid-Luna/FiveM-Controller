const app = require("express")();
const sudo = require("sudo");
app.get("/restart", (req, res) => {
  let restart = sudo(["systemctl", "restart", "fivem.service"], {});
  res.json({ restart: true });
});

app.get("/stop", (req, res) => {
  let stop = sudo(["systemctl", "stop", "fivem.service"], {});
  res.json({ stop: true });
});

app.get("/start", (req, res) => {
  let start = sudo(["systemctl", "start", "fivem.service"], {});
  res.json({ start: true });
});

app.get("/status", (req, res) => {
  let status = sudo(["systemctl", "status", "fivem.service"], {});
  status.stdout.on("data", d => {
    let data = d
      .toString()
      .split("\n")[2]
      .split(":")[1]
      .split(" ")[1];
    res.json({ status: data });
  });
});

app.get("/clearcache", (req, res) => {
  let clearcache = sudo(["rm", "-rf", "/home/sadps/server-data/cache"], {});
  res.json({ clearcache: "OK" });
});

app.listen(3000, () => console.log("api running"));

require("./bot")();
