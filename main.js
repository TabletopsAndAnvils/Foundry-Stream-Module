// (F O U N D R Y - S T R E A M - M O D   0 . 0 . 3 c)

import { fsMod } from "./scripts/fromTwitch.js";
import {getSetting, registerSettings} from "./scripts/settings.js";
  
// Set the alias to filter out of echoed messages on Foundry side
var mychatAlias = "StreamChat"; // <- Keep Static

Hooks.once("canvasInit", () => { // C A N V A S   L A Y E R
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

Hooks.on("init", function () { // M O D - S E T T I N G S
    registerSettings();
    
});

Hooks.on("ready", function () { // O N - R E A D Y - C O N N E C T I O N S
    SetupTwitchClient();
    tMessage();
});

Hooks.on("createChatMessage", async (message) => { // F O U N D R Y => T W I T C H
   if (message.export().includes(mychatAlias)) return
   if (game.settings.get("fsMod", "fsbotEcho")) {
    let myChannel = (game.settings.get("fsMod", "twitchChannel"));   
    let tempM = message.export();
    let res = tempM.slice(23);
     fsMod.client.say(myChannel, res) };
 console.log(message);
 });
 
export function SetupTwitchClient() { // C O N N E C T   T O   T W I T C H
   // Set up twitch chat reader 
   fsMod.client = new tmi.Client({
     connection: {
       cluster: "aws",
       secure: true,
       reconnect: true,
     },
     identity: {
       username: game.settings
       .get("fsMod", "twitchUN"),
       password: game.settings
       .get("fsMod", "twitchAuth")
     },
     channels: game.settings
       .get("fsMod", "twitchChannel")
       .split(",")
       .map((c) => c.trim()),
   });  
    fsMod.client.connect().catch(console.error);
    fsMod.client.on('connected', (address, port) => {
        let myChannel = (game.settings.get("fsMod", "twitchChannel"));
    fsMod.client.say (myChannel, 'Connected.'); // <- fsModChannelNames
   });
   console.log('worked');
 };
  
function tMessage(){ //T W I T C H => F O U N D R Y
  // GM Moderation
    fsMod.client.on("message", (channel, tags, message, self) => {
     let strx = game.settings.get("fsMod","twitchUN")
     if (self) return;
     if (tags["display-name"].includes(strx)) return 
     if (
       game.user.isGM &&
       game.settings.get("fsMod", "fsModAllChatMessages")
     ) {
       WhisperGM(
         `<b>${tags["display-name"]}</b>: ${message}`
       );
     }
   })
 // Without GM Mode  
   fsMod.client.on("message", (channel, tags, message, self) => {
    let strx = game.settings.get("fsMod","twitchUN")
      if (self) return;
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

// C A N V A S   L A Y E R   C O N T R O L S
  
function twitchKick() { // T I M E O U T   V I E W E R 
    let d = new Dialog({
      title: 'Viewer Timeout',
      content: `
        <form class="flexcol">
          <div class="form-group">
            <label for="timeoutViewer">Enter view to Timeout: </label>
            <input type="text" name="kickInput" placeholder=" name+seconds / default 10 minutes ">
          </div>    
        </form>
      `,
      buttons: {
        no: {
          icon: '<i class="fas fa-times"></i>',
          label: 'Cancel'
        },
        yes: {
          icon: '<i class="fas fa-comment-slash"></i>',
          label: 'TIMEOUT',
          callback: (html) => {
            let input = html.find('[name="kickInput"]').val();
            console.log(input);
            let myChannel = (game.settings.get("fsMod", "twitchChannel"));
            fsMod.client.say(myChannel, '/timeout ' + input)
          }
        },
      },
      default: 'yes',
      close: () => {
        console.log('Another one bites the dust!');
      }
    }).render(true)
  }
  
function twitchBan() { // B A N   V I E W E R
    let e = new Dialog({
      title: 'Ban Viewer from Channel',
      content: `
        <form class="flexcol">
          <div class="form-group">
            <label for="KickViewer">Enter viewer name to ban: </label>
            <input type="text" name="banInput" placeholder=" enter name, click BAN to confirm ">
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
            let myChannel = (game.settings.get("fsMod", "twitchChannel"));
            fsMod.client.say(myChannel, '/ban ' + input)
          }
        },
      },
      default: 'no',
      close: () => {
        console.log('Another one bites the dust!');
      }
    }).render(true)
  }

function twitchSlow() { // S L O W   C H A T   R A T E 
    let d = new Dialog({
      title: 'Twitch Channel Chat Rate',
      content: `
        <form class="flexcol">
          <div class="form-group">
            <label for="slowChannel">Time in Seconds: </label>
            <input type="text" name="slowInput" placeholder=" time between new messages ">
          </div>    
        </form>
      `,
      buttons: {
        no: {
          icon: '<i class="fas fa-times"></i>',
          label: 'Cancel'
        },
        yes: {
          icon: '<i class="fas fa-hourglass-half"></i>',
          label: 'SLOW',
          callback: (html) => {
            let input = html.find('[name="slowInput"]').val();
            console.log(input);
            let myChannel = (game.settings.get("fsMod", "twitchChannel"));
            fsMod.client.say(myChannel, '/slow ' + input)
          }
        },
      },
      default: 'yes',
      close: () => {
        console.log('Slowing it down a bit!');
      }
    }).render(true)
  }
function twitchClear() { // C L E A R   T W I T C H   C H A T
    let myChannel = (game.settings.get("fsMod", "twitchChannel"));
    fsMod.client.say(myChannel, "/clear")
  }
  
function twitchRaid() { // R A I D   C H A N N E L
    let d = new Dialog({
      title: 'Raid Twitch Channel',
      content: `
        <form class="flexcol">
          <div class="form-group">
            <label for="RaidChannel">Raid Channel: </label>
            <input type="text" name="raidInput" placeholder=" enter channel to raid ">
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
            let myChannel = (game.settings.get("fsMod", "twitchChannel"));
            fsMod.client.say(myChannel, '/raid ' + input)
          }
        },
      },
      default: 'yes',
      close: () => {
        console.log('Off to adventure!');
      }
    }).render(true)
  }

Hooks.on("getSceneControlButtons", (controls) => { // C A N V A S   C O N T R O L

    if (game.user.data.role == 4) {
      controls.push();
    }
  });
  
export default class fsmLayer extends CanvasLayer { // B U T T O N   C O N F I G
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
            icon: "fas fa-hourglass-half",
            name: "SlowTwitch",
            title: "Slow Twitch Chat",
          onClick: () => twitchSlow(), 
          },
          {
            icon: "fas fa-eraser",
            name: "ClearTwitch",
            title: "Clear Twitch Chat",
          onClick: () => twitchClear(), 
          },
          {
            icon: "fas fa-comment-slash",
            name: "KickUser",
            title: "Timeout Twitch User",
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
    }}
