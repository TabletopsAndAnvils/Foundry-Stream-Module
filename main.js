// (F O U N D R Y - S T R E A M - M O D   0 . 1 . 3)

import { fsMod } from "./scripts/fromTwitch.js";
import { registerSettings } from "./scripts/settings.js";
import fsmLayer from "./scripts/modLayer.js";

// H O O K S 

Hooks.once("canvasInit", () => { // C A N V A S   L A Y E R
    // Add fsmLayer to canvas
    const layerct = canvas.stage.children.length;
    let tbLayer = new fsmLayer();
  
    tbLayer.setButtons();
    tbLayer.roleTest();
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
  if (message.export().includes('Stream Chat')) return 
   if (game.settings.get("streamMod", "streamModEcho")) {
    let firstGm = game.users.find((u) => u.isGM && u.active);
    if (firstGm && game.user === firstGm) {
    let myChannel = (game.settings.get("streamMod", "streamChannel"));   
    let tempM = message.export();
    let res = tempM.slice(23);
    let res1 = res.replace(/(^|\s)] \s?/g, ' '); // Removes '] ' that may appear when stripping the timestamp
    let res2 = res1.replace(/(^|\s)Damage Apply Apply Half\s?/g, ' '); // <= PF1e specific roll cleanup
    let fin = res2.replace(/(^|\s)Info Attack Action\s?/g, ' '); // <= PF1e specific roll cleanup
    //console.log(fin);
    fsMod.client.say(myChannel, fin) }};
 });

Hooks.on("getSceneControlButtons", (controls) => { // C A N V A S   C O N T R O L
  if (game.user.data.role >= (game.settings.get("streamMod", "streamRole"))) {      
  controls.push();
}
});

// T W I T C H   S P E C I F I C   F U N C T I O N S

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
       .get("streamMod", "streamUN"),
       password: game.settings
       .get("streamMod", "streamAuth")
     },
     channels: game.settings
       .get("streamMod", "streamChannel")
       .split(",")
       .map((c) => c.trim()),
   });  
    fsMod.client.connect().catch(console.error);
    fsMod.client.on('connected', (address, port) => {
        let myChannel = (game.settings.get("streamMod", "streamChannel"));
          if (game.settings.get("streamMod", "connectMSG") === "1") {
             fsMod.client.say (myChannel, 'Foundry Stream Module [Connected]') }
             else console.log('worked');
   });
 };
  
export function tMessage(){ //T W I T C H => F O U N D R Y
    fsMod.client.on("message", (channel, tags, message, self) => {
     let strx = game.settings.get("streamMod","streamUN")
     if (self) return;
     if (tags["display-name"].includes(strx)) return 
     const firstGm = game.users.find((u) => u.isGM && u.active);
      if (firstGm && game.user === firstGm) {
      WhisperGM(
         `<b>${tags["display-name"]}</b>: ${message}`
       );
     }
   })
   fsMod.client.on("subscription", function (channel, username, method, message, userstate) {
    // Do your stuff.
});
   fsMod.client.on("resub", function (channel, username, months, message, userstate, methods) {
    // Do your stuff.
});
   } 

// C A N V A S   L A Y E R   C O N T R O L S
  
export function twitchKick() { // T I M E O U T   V I E W E R 
    let d = new Dialog({
      title: 'Viewer Timeout',
      content: `
        <form class="flexcol">
          <div class="form-group">
            <label for="timeoutViewer">Enter view to Timeout: </label>
            <input type="text" name="kickInput" placeholder=" name+seconds / default 10 minutes ">
          </div>    
          <p>Temporarily prevents a user from chatting. Duration and time unit (optional, default=10m, max=2w) can use s, m, h, d, w solo or combined.</p>
          <p>Press the ◼ button to UNTIMEOUT the person entered above.</p>        
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
            let myChannel = (game.settings.get("streamMod", "streamChannel"));
            fsMod.client.say(myChannel, '/timeout ' + input)
          },
        },
        stop: {
          icon: '<i class="fas fa-stop"></i>',
          callback: (html) => {
            let input = html.find('[name="kickInput"]').val();
            console.log(input);
            let myChannel = (game.settings.get("streamMod", "streamChannel"));
            fsMod.client.say(myChannel, '/untimeout ' + input)
          },      
        },
      },
      default: 'yes',
      close: () => {
        console.log('Another one bites the dust!');
      }
    }).render(true)
  }
  
export function twitchBan() { // B A N   V I E W E R
    let e = new Dialog({
      title: 'Ban Viewer from Channel',
      content: `
        <form class="flexcol">
          <div class="form-group">
            <label for="KickViewer">Enter viewer to ban: </label>
            <input type="text" name="banInput" placeholder=" enter name, click BAN to confirm ">
          </div>   
          <p>This works as an indefinite timeout, and will prevent the user from chatting in your channel for as long as they are banned.</p>
          <p>Press the ◼ button to UNBAN the person entered above.</p> 
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
            let myChannel = (game.settings.get("streamMod", "streamChannel"));
            fsMod.client.say(myChannel, '/ban ' + input)
          }        
          },
          stop: {
            icon: '<i class="fas fa-stop"></i>',
            callback: (html) => {
              let input = html.find('[name="banInput"]').val();
              let myChannel = (game.settings.get("streamMod", "streamChannel"));
              fsMod.client.say(myChannel, '/unban '+ input)}
        }
      },
      default: 'no',
      close: () => {
        console.log('Another one bites the dust!');
      }
    }).render(true)
  }

export function twitchSlow() { // S L O W   C H A T   R A T E 
  let d = new Dialog({
    title: 'Twitch Channel Chat Rate',
    content: `
      <form class="flexcol">
        <div class="form-group">
          <label for="slowChannel">Time in Seconds: </label>
          <input type="text" name="slowInput" placeholder=" time between new messages ">
        </div>  
        <p>Time entered in seconds. This determines the amount of time between messages before a viewer (moderators excluded) can send another. If left blank SLOW will default to 30 seconds between messages.</p>
        <p>Press the ◼ button to turn slow mode off on Twitch channel.</p>
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
          let myChannel = (game.settings.get("streamMod", "streamChannel"));
          fsMod.client.say(myChannel, '/slow ' + input)
        }
      },
      stop: {
          icon: '<i class="fas fa-stop"></i>',
          callback: (html) => {
            let myChannel = (game.settings.get("streamMod", "streamChannel"));
            fsMod.client.say(myChannel, '/slowoff')
          }
      },
    },
    default: 'yes',
    close: () => {
      console.log('Slowing it down a bit!');
    }
  }).render(true)
}

export function twitchClear() { // C L E A R   T W I T C H   C H A T
    let myChannel = (game.settings.get("streamMod", "streamChannel"));
    fsMod.client.say(myChannel, "/clear")
  }
  
export function twitchRaid() { // R A I D   C H A N N E L
    let d = new Dialog({
      title: 'Raid Twitch Channel',
      content: `
        <form class="flexcol">
          <div class="form-group">
            <label for="RaidChannel">Raid Channel: </label>
            <input type="text" name="raidInput" placeholder=" enter channel to raid ">
          </div>    
          <p>Raids help streamers send their viewers to another live channel at the end of their stream to introduce their audience to a new channel and have a little fun along the way. Raiding a channel at the end of your stream can be a great way to help another streamer grow his or her community. Keep in mind, you must have the browser open to Twitch to confirm the raid.</p>
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
            let myChannel = (game.settings.get("streamMod", "streamChannel"));
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
