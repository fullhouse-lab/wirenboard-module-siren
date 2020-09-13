var siren = require("siren");

siren.start({
  id: "siren",
  title: "Siren",
  devices: [
		{
	    name: "house",
	    siren: { device: "wb-gpio", control: "EXT3_R3A3" },
	    lamp:  { device: "wb-gpio", control: "EXT3_R3A2" }
	  },
		{
	    name: "street",
	    siren: { device: "wb-gpio", control: "EXT3_R3A4" },
	    lamp:  { device: "wb-gpio", control: "EXT3_R3A5" }
	  }
	]
});
