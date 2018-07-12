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

/*
const getStatus = async () => {
  let status = sudo(["systemctl", "status", "fivem.service"], {});
  status.stdout.on("data", d => {
    let data = d
      .toString()
      .split("\n")[2]
      .split(":")[1]
      .split(" ")[1];
    return new Promise(resolve => resolve({ status: data }));
  });
};

app.get("/status", async (req, res) => {
  res.json(await getStatus());
});
*/

app.get("/clearcache", (req, res) => {
  let clearcache = sudo(["rm", "-rf", "/home/sadps/server-data/cache"], {});
  res.json({ clearcache: "OK" });
});

app.post("/kick", (req, res) => {
  console.log(req.body);
  const { reason, id } = req.body;
  let kick = sudo([
    "./icecon",
    "-c",
    `"clientkick`,
    `${id}`,
    `${reason}"`,
    `"localhost:30120"`,
    "!@sadps@!"
  ]);
  res.json({ kick: "OK" });
});

app.listen(3000, () => console.log("api running"));

require("./bot")();
