Lighthouse generate cmd:
const lighthouse = require('lighthouse');
const nodeCmd = require('node-cmd');

const opts = {
  disableDeviceEmulation: true,
  disableCpuThrottling: true,
  disableNetworkThrottling: true,
  view: true
};

function getSnakeCase(value) {
  value = value.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
  return '--' + value;
}

function generateCmd(flags) {
  let keys = Object.keys(flags);
  let list = [];
  for(let i = 0; i < keys.length; i++) {
    if (flags[keys[i]] == true) {
      list.push(getSnakeCase(keys[i]));
    } else {
      list.push(getSnakeCase(keys[i]) + '=' + flags[keys[i]]);
    }
  }
  return list.join(" ");
}

function getLightHouseCmd(opts) {
  console.log("lighthouse " + "https://www.example.com " + generateCmd(opts));
  return "lighthouse " + "https://www.example.com " + generateCmd(opts);
}

nodeCmd.run(getLightHouseCmd(opts));

