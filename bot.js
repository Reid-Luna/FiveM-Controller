const Discord = require("discord.js");
const c = new Discord.Client();
const { token, prefix } = require("./config.json");
const r = require("request-promise");

const stop = async () => {
  const options = {
    uri: "http://localhost:3000/stop",
    json: true
  };
  return new Promise(resolve => {
    resolve(r(options));
  });
};

const start = async () => {
  const options = {
    uri: "http://localhost:3000/start",
    json: true
  };
  return new Promise(resolve => {
    resolve(r(options));
  });
};

const restart = async () => {
  const options = {
    uri: "http://localhost:3000/restart",
    json: true
  };
  return new Promise(resolve => {
    resolve(r(options));
  });
};

const determinestatus = statusOrig => {
  const { status } = statusOrig;
  if (status == "active") {
    return "you play";
  } else {
    return "darkness";
  }
};

const getstatus = async () => {
  const options = {
    uri: "http://localhost:3000/status",
    json: true
  };
  return new Promise(resolve => {
    resolve(determinestatus(r(options)));
  });
};

const clear = async () => {
  const options = {
    uri: "http://localhost:3000/clearcache",
    json: true
  };
  return new Promise(resolve => {
    resolve(r(options));
  });
};

module.exports = async () => {
  let status;

  c.on("ready", async () => {
    console.log("hi, im ready");
    setInterval(async () => {
      status = await getstatus();
      c.user.setActivity(status, { type: "WATCHING" });
    }, 5000);
  });

  c.on("message", async m => {
    if (m.content.startsWith(prefix) && !m.author.bot) {
      const command = m.content.replace(prefix, "").split(" ")[0];
      console.log(command);
      switch (command) {
        case "restart":
          m.channel.send("stopping server...");
          await stop();
          m.channel.send("deleting cache...");
          await clear();
          m.channel.send("initiating session manager...");
          await start();
          m.channel.send("starting server...");
          await restart();
          break;

        case "start":
          m.channel.send("checking server status...");
          status = await getstatus();
          console.log(status);
          if (status == "you play") {
            m.channel.send("server is already running");
          } else {
            m.channel.send("starting server...");
            let started = await start();
            console.log(started);
            status = "you play";
          }
          break;

        case "stop":
          m.channel.send("checking server status...");
          if (status == "darkness") {
            m.channel.send("server is already stopped");
          } else {
            m.channel.send("stopping server...");
            await stop();
            status = "darkness";
          }
          break;
      }
    } else {
      console.log(`m: ${m.content}`);
    }
  });

  c.login(token);
};
