Siren manager

##  Readme in progress  ..

####  homebridge accessories
```json
"accessories": [
  {
      "comment": "-------------------------  Siren  -------------------------",
      "type": "switch",
      "name": "Сирена",
      "topics": {
          "getOn": "/devices/siren/controls/siren",
          "setOn": "/devices/siren/controls/siren/on"
      },
      "integerValue": true,
      "accessory": "mqttthing"
  },
  {
      "comment": "-------------------------  Siren: Lamp  -------------------------",
      "type": "switch",
      "name": "Сирена (лампа)",
      "topics": {
          "getOn": "/devices/siren/controls/lamp",
          "setOn": "/devices/siren/controls/lamp/on"
      },
      "integerValue": true,
      "accessory": "mqttthing"
  }
]
```
