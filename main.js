      ////////////////////////////////////////////////////
     ///*                                             ///*
    ///**   (F O U N D R Y - S T R E A M - M O D)    ///**
   ///***             (0 . 0 . 1 a)                 ///***
  ///****                                          ///****
 ////////////////////////////////////////////////////*****

import { fsMod } from "./scripts/fromTwitch.js";
export var strx = "foundrystudiobot";
export var strx2 = "StreamChat";

    ////////////////////////////////////////////////////
   ///*                                             ///*
  ///**        (M O D - S E T T I N G S)           ///**
 ///***                                           ///***
////////////////////////////////////////////////////****

Hooks.on("init", function () {
 
  game.settings.register("fsMod", "fsModChannelNames", { 
    name: "Twitch Channel",
    hint:
      "Twitch Channel to integrate.",
    scope: "world",
    config: true,
    type: String,
    default: "",
    onChange: (value) => {
      SetupTwitchClient();
    },
    onChange: (value) => {
      fsmConnect();
    },
    onChange: (value) => {
      exports.fsModChannelNames = value;
      console.log(fsModChannelNames);
    }
  });
  
  game.settings.register("fsMod", "fsmUN", { 
    name: "Username",
    hint: "You or your registered bot's Twitch.tv username",
    scope: "world",
    config: true,
    type: String,
    default: "",
    onChange: (value) => {
      exports.fsmUN = value;
      console.log(fsmUN);
    },
    onChange: (value) => {
      fsmConnect();
    }
  })

  game.settings.register("fsMod", "fsmAuth", { 
    name: "Stream Key",
    hint: "The OAuth key associated with above Twitch.tv user",
    config: true,
    scope: "world",
    type: String,
    default: "",
    onChange: (value) => {
      fsmConnect();
    },
    onChange: (value) => {
      exports.fsmAuth = value;
      console.log(fsmAuth)
    }
  })

  game.settings.register("fsMod", "fsModGlobal", { 
    name: "All Players List",
    hint: "Check this box to send all chats from all channels to all players",
    config: true,
    scope: "client",
    type: Boolean,
    default: true,
  });

  game.settings.register("fsMod", "fsbotEcho", { 
    name: "Out to Twitch Account",
    hint: "Only one person should have this box checked. Whoever has this box on will echo what they see in chat to the Twitch channel.",
    config: true,
    scope: "client",
    type: Boolean,
    default: false,
  });

  game.settings.register("fsMod", "fsModAllChatMessages", { 
    name: "Whisper All Chats",
    hint: "Check this box to send all chats from all channels to the GM",
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
  });
});

    ////////////////////////////////////////////////////
   ///*                                             ///*
  ///**      (C O N N E C T I O N S - T M I)       ///**
 ///***                                           ///***
////////////////////////////////////////////////////****

Hooks.on("ready", function () {
  SetupTwitchClient();
});

//Gather Foundry Chat and send to Twitch - sometimes slice is 24, other times 23 works. Timestamp issues.
Hooks.on("createChatMessage", async (message) => {
  if (message.export().includes(strx2)) return
  if (
    game.settings.get("fsMod", "fsbotEcho")
   ) {
 // if (game.user.isGM) {
  let tempM = message.export();
  let res = tempM.slice(23);
    fsMod.client.say('tabletopsandanvils',res) };
//  console.log(message);
});

//Buttons on the left
Hooks.on("getSceneControlButtons", (controls) => {
  if (game.user.data.role == 4) {
    controls.push();
  }
});

export function SetupTwitchClient() {
  // Set up twitch chat reader
  fsMod.client = new tmi.Client({
    connection: {
      cluster: "aws",
      secure: true,
      reconnect: true,
    },
    identity: {
      username: game.settings
      .get("fsMod", "fsmUN"),
      password: game.settings
      .get("fsMod", "fsmAuth")
    },
    channels: game.settings
      .get("fsMod", "fsModChannelNames")
      .split(",")
      .map((c) => c.trim()),
  });
  
fsMod.client.connect().catch(console.error);
fsMod.client.on('connected', (address, port) => {
  fsMod.client.say ('tabletopsandanvils', 'Connected.');
  });
  console.log('worked');

    ////////////////////////////////////////////////////
   ///*                                             ///*
  ///**     (F R O M - T W I T C H - M S G S)      ///**
 ///***                                           ///***
////////////////////////////////////////////////////****
 
// If GM Moderation Mode is on:
  fsMod.client.on("message", (channel, tags, message, self) => {
    if (tags["display-name"].includes(strx)) return 
    if (
      game.user.isGM &&
      game.settings.get("fsMod", "fsModAllChatMessages")
    ) {
      WhisperGM(
        `<b>${tags["display-name"]}</b>: ${message}`
      );
    }
  });
// Without GM Mode  
  fsMod.client.on("message", (channel, tags, message, self) => {
    if (tags["display-name"].includes(strx)) return
    if (
       game.settings.get("fsMod", "fsModGlobal")
      ) {
        MessageAll(
          `<b>${tags["display-name"]}</b>: ${message}`
        );
      }; 
    });
  }

    ////////////////////////////////////////////////////
   ///*                                             ///*
  ///**       (B U T T O N S ( L E F T ))          ///**
 ///***                                           ///***
////////////////////////////////////////////////////****

Hooks.once("canvasInit", () => {
  // Add fsmLayer to canvas
  const layerct = canvas.stage.children.length;
  let tbLayer = new fsmLayer();

  tbLayer.setButtons();
  tbLayer.newHookTest();
  canvas.fsMod = canvas.stage.addChildAt(tbLayer, layerct);
  canvas.fsMod.draw();

  let theLayers = Canvas.layers;
  theLayers.fsMod = fsmLayer;

  Object.defineProperty(Canvas, "layers", {
    get: function () {
      return theLayers;
    },
  });
});

export default class fsmLayer extends CanvasLayer {
  constructor() {
    super();
    this.layername = "fsMod";

    console.log("FVTT Studio Bot | Drawing Layer | Loaded into Drawing Layer");
  }

  setButtons() {
    this.newButtons = {
      name: "fsMod",
      icon: "fab fa-twitch",
      layer: "fsmLayer",
      title: "FSM Controls",
      tools: [
        {
          icon: "fas fa-eraser",
          name: "ClearTwitch",
          title: "Clear Twitch Chat",
        onClick: () => fsMod.client.say('tabletopsandanvils','/clear'),
        },
        {
          icon: "fas fa-sign-out-alt",
          name: "KickUser",
          title: "Kick Twitch User",
        },
        {
          icon: "fas fa-hand-middle-finger",
          name: "BanUser",
          title: "Ban Twitch User",
        //  onClick: () => TriggerVote("Heads or tails?", ["Heads 🍆", "Tails 🍑"]),
        },
        {
          icon: "fas fa-khanda",
          name: "RaidChannel",
          title: "Raid Channel",
        //  onClick: () => EndVote(),
        },
      ],
    };
  }

  newHookTest() {
    Hooks.on("getSceneControlButtons", (controls) => {
      console.log("FVVT Studio Bot | Testing User role = " + game.user.data.role);
      if (game.user.data.role == 4) {
        controls.push(this.newButtons);
      }
    });
  }
}