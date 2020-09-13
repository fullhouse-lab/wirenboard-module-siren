// TODO: check after reboot
// TODO: add isOpen
// TODO: add depend single/multy sirens - only SINGLE !!!
// TODO: activationValue
// TODO: "siren" => "sound"

var MODULE_NAME 		= "siren";
var MODULE_VERSION  = "v.1.1";

exports.start = function(config) {
	if (!validateConfig(config)) return;

	//  device  //
	createDevice(config);

  //  all sirens off  //
  config.devices.forEach( function(item) {
    dev[item.siren.device][item.siren.control] = false;
    dev[item.lamp.device][item.lamp.control] = false;
  });

	//  rules siren  //
	config.devices.forEach( function(item) {
	  createRule_relayDuplex(item.name + "_siren", item.siren.device, item.siren.control);
    createRule_relayDuplex(item.name + "_lamp", item.lamp.device, item.lamp.control);

    createRule_state1Way("siren", item.name + "_siren")
    createRule_state1Way("lamp", item.name + "_lamp")
	});

  log(config.id + ": Started (" + MODULE_NAME + " " + MODULE_VERSION + ")");
};

//  Validate config  //

var validateConfig = function(_config) {
  if (!_config) {
    log("Error: " + MODULE_NAME + ": No config");
    return false;
  }

  if (!_config.id || !_config.id.length) {
    log("Error: " + MODULE_NAME + ": Config: Bad id");
    return false;
  }

  if (!_config.title || !_config.title.length) {
    log("Error: " + MODULE_NAME + ": Config: Bad title");
    return false;
  }

  if (!_config.devices) {
    log("Error: " + MODULE_NAME + ": Config: Bad devices");
    return false;
  }

  return true;
}

//
//  Device  //
//

function createDevice(config) {
	var cells = {
		siren:  { type: "switch", value: false, forceDefault: true },
    lamp:   { type: "switch", value: false, forceDefault: true },
	}

	config.devices.forEach( function(item) {
	  cells[item.name + "_siren"] = { type: "switch", value: false, forceDefault: true };
    cells[item.name + "_lamp"]  = { type: "switch", value: false, forceDefault: true };
	});

	defineVirtualDevice(config.id, {
	  title: config.title,
	  cells: cells
	});
}

//
//  Rules  //
//

//  relay <-> state  //

function createRule_relayDuplex(name, device, control) {
  defineRule({
    whenChanged: "siren/" + name,
    then: function (newValue, devName, cellName) {
      if (dev[device][control] !== newValue) dev[device][control] = newValue;
    }
  });

  defineRule({
    whenChanged: device + "/" + control,
    then: function (newValue, devName, cellName) {
      if (dev["siren"][name] !== newValue) dev["siren"][name] = newValue;
    }
  });
}

//  state -> state  //

function createRule_state1Way(name_src, name_dst) {
  defineRule({
    whenChanged: "siren/" + name_src,
    then: function (newValue, devName, cellName) {
      if (dev["siren"][name_dst] !== newValue) dev["siren"][name_dst] = newValue;
    }
  });
}
