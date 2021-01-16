      ////////////////////////////////////////////////////
     ///*                                             ///*
    ///**   (F O U N D R Y - S T R E A M - M O D)    ///**
   ///***             (0 . 0 . 1 a)                 ///***
  ///****                                          ///****
 ////////////////////////////////////////////////////*****

import { fsMod } from "./scripts/fromTwitch.js";
export var strx = "tabletopsandanvils"; // <- Make Variable Per fsmUN
export var strx2 = "StreamChat"; // <- Keep Static

    ////////////////////////////////////////////////////
   ///*                                             ///*
  ///**        (M O D - S E T T I N G S)           ///**
 ///***                                           ///***
////////////////////////////////////////////////////****

Hooks.on("init", function () {
 
  game.settings.register("fsMod", "fsModChannelNames", { 
    name: "Twitch Channel",
    hint: "Twitch Channel to integrate.",
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
    hint: "You or your registered bot's Twitch.tv username. This account should have /mod settings for your channel in order to use certain functions. Please note, that in order for a raid to work you must be logged in to this account through a browser in order to click the confirmation dialog.",
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
    name: "Twitch OAuth Token",
    hint: "The OAuth token associated with above Twitch.tv user. To obtain an OAuth token for your account, log in to Twitch with your browser then go to https://twitchapps.com/tmi/ and follow the prompts.",
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
    hint: "Check this box to recieve Twitch chat messages.",
    config: true,
    scope: "client",
    type: Boolean,
    default: true,
  });

  game.settings.register("fsMod", "fsbotEcho", { 
    name: "Out to Twitch Account",
    hint: "Only one person should have this box checked. Whoever has this box checked will echo what they see in chat to the Twitch channel. In the event that more than one client has this enabled chat messages will be repeated on Twitch for each, which is annoying so don't do it.",
    config: true,
    scope: "client",
    type: Boolean,
    default: false,
  });

  game.settings.register("fsMod", "fsModAllChatMessages", { 
    name: "Whisper All Chats",
    hint: "Check this box to send all chats from all channels to the GM for moderation before making them public.",
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

// let tChan = game.settings.register("fsMod", "fsModChannelNames");
//const tChan = game.settings.get("fsMod", "fsModChannelNames");

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
    fsMod.client.say('tabletopsandanvils', res) }; // <- fsModChannelNames
//  console.log(message);
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
  fsMod.client.say ('tabletopsandanvils', 'Connected.'); // <- fsModChannelNames
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

function twitchKick() { 
  let d = new Dialog({
    title: 'Kick Viewer',
    content: `
      <form class="flexcol">
        <div class="form-group">
          <label for="KickViewer">Kick Viewer</label>
          <input type="text" name="kickInput" placeholder="Who do you want to kick?">
        </div>    
      </form>
    `,
    buttons: {
      no: {
        icon: '<i class="fas fa-times"></i>',
        label: 'Cancel'
      },
      yes: {
        icon: '<i class="fas fa-sign-out-alt"></i>',
        label: 'KICK',
        callback: (html) => {
          let input = html.find('[name="kickInput"]').val();
          console.log(input);
          fsMod.client.say('tabletopsandanvils', '/kick' + input)
        }
      },
    },
    default: 'yes',
    close: () => {
      console.log('Another one bites the dust!');
    }
  }).render(true)
}

function twitchBan() { 
  let e = new Dialog({
    title: 'Ban Viewer from Channel',
    content: `
      <form class="flexcol">
        <div class="form-group">
          <label for="KickViewer">Kick Viewer</label>
          <input type="text" name="banInput" placeholder="Who do you want to ban?">
        </div>    
      </form>
    `,
    buttons: {
      no: {
        icon: '<i class="fas fa-times"></i>',
        label: 'Cancel'
      },
      yes: {
        icon: '<i class="fas fa-hand-middle-finger"></i>',
        label: 'BAN',
        callback: (html) => {
          let input = html.find('[name="banInput"]').val();
          console.log(input);
          fsMod.client.say('tabletopsandanvils', 'ban ' + input)
        }
      },
    },
    default: 'no',
    close: () => {
      console.log('Another one bites the dust!');
    }
  }).render(true)
}

function twitchRaid() { 
  let d = new Dialog({
    title: 'Raid Twitch Channel',
    content: `
      <form class="flexcol">
        <div class="form-group">
          <label for="RaidChannel">Raid Channel</label>
          <input type="text" name="raidInput" placeholder="What channel shall we raid?">
        </div>    
      </form>
    `,
    buttons: {
      no: {
        icon: '<i class="fas fa-times"></i>',
        label: 'Cancel'
      },
      yes: {
        icon: '<i class="fas fa-khanda"></i>',
        label: 'RAID',
        callback: (html) => {
          let input = html.find('[name="raidInput"]').val();
          console.log(input);
          fsMod.client.say('tabletopsandanvils', '/raid ' + input)
        }
      },
    },
    default: 'no',
    close: () => {
      console.log('Off to adventure!');
    }
  }).render(true)
}
//Buttons on the left
Hooks.on("getSceneControlButtons", (controls) => {
  if (game.user.data.role == 4) {
    controls.push();
  }
});

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

    console.log("Foundry Stream Module| Drawing Layer | Loaded into Drawing Layer");
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
        onClick: () => fsMod.client.say('tabletopsandanvils','/clear'), // <- fsModChannelNames
        },
        {
          icon: "fas fa-sign-out-alt",
          name: "KickUser",
          title: "Kick Twitch User",
        onClick: () => twitchKick() 
        },
        {
          icon: "fas fa-hand-middle-finger",
          name: "BanUser",
          title: "Ban Twitch User",
        onClick: () => twitchBan()
        },
        {
          icon: "fas fa-khanda",
          name: "RaidChannel",
          title: "Raid Channel",
        onClick: () => twitchRaid()
        },
      ],
    };
  }

  newHookTest() {
    Hooks.on("getSceneControlButtons", (controls) => {
      console.log("Foundry Stream Module | Testing User role = " + game.user.data.role);
      if (game.user.data.role == 4) {
        controls.push(this.newButtons);
      }
    });
  }
}
