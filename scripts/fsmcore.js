// (F O U N D R Y - S T R E A M - M O D)

import { fsMod } from "./streamTwitch.js"; 
import { levelCheck } from './streamTwitch.js';
import { DiceRoller } from 'https://cdn.jsdelivr.net/npm/rpg-dice-roller@4.5.2/lib/esm/bundle.min.js';

const roller = new DiceRoller();

// M I S C   F U N C T I O N S 

/*
export function HideForStreamView() { // H I D E S   T A B B E D   C H A T   F R O M   / S T R E A M
  if (game.settings.get("streamMod", "HideInStreamView")) {
    if (window.location.href.endsWith("/stream")) {
      return true;
    }
  }
  return false;
}
*/

export function checkAuth() {
  let check = game.settings.get("streamMod", "flagAuth")
  if (check) return
  else {
    let normal = game.settings.get("streamMod", "streamAuth")
    let obf = normal.obfs(13);
    game.settings.set("streamMod", "streamAuth", obf);
    game.settings.set("streamMod", "flagAuth", true);
  }
}

export function gmOnly() {

  if (game.settings.get("streamMod", "streamOnly")) {
      return true;
  }
} 

export function TabbedChat() {
  if (game.settings.get("streamMod", "tabbedChat")) {
      return true;
    }
} 

export function outChat() {
  let a = (game.settings.get("streamMod", "streamModEcho")) 
      if (a == true) { return true } else { 
        return false }
} 

export function inChat() {
  let b = (game.settings.get("streamMod", "streamGM")) 
      if (b == true) { return true } else {
      return false }  
} 

// T W I T C H   S P E C I F I C   F U N C T I O N S

export function streamJoin() { // J O I N S   S T R E A M   C H E C K
  fsMod.client.on("join", (channel, username, self) => {
  let myChannel = (game.settings.get("streamMod", "streamChannel"));
  let welcomeMsg = (game.settings.get("streamMod", "streamJoin"));
  const firstGm = game.users.find((u) => u.isGM && u.active);
  if (firstGm && game.user === firstGm) {
  fsMod.client.say(myChannel, welcomeMsg);
  }
})
}

export function DisconnectTwitch() { // D I S C O N N E C T   T W I T C H
  fsMod.client.disconnect();
};

export function SilentTwitchClient() { // N O T   C U R R E N T L Y   U S E D
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

}

export function SetupTwitchClient() { // C O N N E C T   T O   T W I T C H
   // Set up twitch chat reader 
   let obf = game.settings.get("streamMod", "streamAuth");
   let streamPW = obf.defs(13);
   fsMod.client = new tmi.Client({
     connection: {
       cluster: "aws",
       secure: true,
       reconnect: true,
     },
     identity: {
       username: game.settings
       .get("streamMod", "streamUN"),
       password: streamPW // game.settings
       //.get("streamMod", "streamAuth")
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

export function AnnounceTime1() {  // A N N O U N C E M E N T   S T U F F
    let readTime = (game.settings.get("streamMod", "streamAnnounce1T"));
    let T1 = (readTime * 1000);  
    if (readTime === 0) return;
    setInterval(AnnounceSend1, T1)
}

export function AnnounceSend1() { // A N N O U N C E M E N T   S T U F F
    let myChannel = (game.settings.get("streamMod", "streamChannel"));
    let message = (game.settings.get("streamMod", "streamAnnounce1"));
    const firstGm = game.users.find((u) => u.isGM && u.active);
    if (firstGm && game.user === firstGm) {
    fsMod.client.say(myChannel, message);
    }
}

export function AnnounceTime2() { // A N N O U N C E M E N T   S T U F F
  let readTime = (game.settings.get("streamMod", "streamAnnounce2T"));
  let T2 = (readTime * 1000);  
  if (readTime === 0) return;
  setInterval(AnnounceSend2, T2)
}

export function AnnounceSend2() { // A N N O U N C E M E N T   S T U F F
  let myChannel = (game.settings.get("streamMod", "streamChannel"));
  let message2 = (game.settings.get("streamMod", "streamAnnounce2"));
  const firstGm = game.users.find((u) => u.isGM && u.active);
  if (firstGm && game.user === firstGm) {
  fsMod.client.say(myChannel, message2);
  }
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
            let myChannel = (game.settings.get("streamMod", "streamChannel"));
            fsMod.client.say(myChannel, '/timeout ' + input)
          },
        },
        stop: {
          icon: '<i class="fas fa-stop"></i>',
          callback: (html) => {
            let input = html.find('[name="kickInput"]').val();
            let myChannel = (game.settings.get("streamMod", "streamChannel"));
            fsMod.client.say(myChannel, '/untimeout ' + input)
          },      
        },
      },
      default: 'yes',
      close: () => {
        console.log('Someones in the corner!');
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
  let d = new Dialog({
    title: 'Clear Twitch Channel',
    content: `
      <form class="flexcol"> 
        <p>Are you sure you want to clear the Twitch chat log?</p>
        <p>This does not clear previous Twitch messages from Foundry</p>
      </form>
    `,
    buttons: {
      no: {
        icon: '<i class="fas fa-times"></i>',
        label: 'Cancel'
      },
      yes: {
        icon: '<i class="fas fa-eraser"></i>',
        label: 'CLEAR',
        callback: (html) => {
          let myChannel = (game.settings.get("streamMod", "streamChannel"));
          fsMod.client.say(myChannel, "/clear")
        }
      },
    },
    default: 'yes',
    close: () => {
      console.log('Nobody saw that.');
    }
  }).render(true)
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

export function twitchRoll() { // A S K   F O R   R O L L 
    let d = new Dialog({
      title: 'Request Roll',
      content: `
        <form class="flexcol">
          <div class="form-group">
            <label for="RollChannel"> Die Roll: </label>
            <input type="text" maxlength="12" name="rollDice" placeholder=" ie 3d8+5 or 1d100">
          </div>   
          <div class="form-group">
            <label for="RollWho"> Who: </label>
            <input type="text" name="whoDice" placeholder=" Leave blank for anyone">
          </div>             
          <p>Enter the die roll, ie 1d100, to request. If no viewer name is entered the roll request will be open to all viewers in channel.</p>
        </form>
      `,
      buttons: {
        no: {
          icon: '<i class="fas fa-times"></i>',
          label: 'Cancel'
        },
        yes: {
          icon: '<i class="fas fa-dice"></i>',
          label: 'Request Roll',
          callback: (html) => {
            let myChannel = (game.settings.get("streamMod", "streamChannel"))
            var who = html.find('[name="whoDice"]').val(); 
            console.log(who);
            var dice = html.find('[name="rollDice"]').val(); 
            if (who != "") {
                  fsMod.client.say(myChannel, `The GM is requesting ${who} to roll! [Type !gm ${dice} to roll]`);
                    diceWait(dice, who); }                       
                 else {
                  fsMod.client.say(myChannel, "The GM is requesting a viewer to roll! [Type !gm " + dice + " to roll]");
                     diceWaitAll(dice);
            }
          }
        },
      },
      default: 'yes',
      close: () => {
        console.log('Roll it!');
      }
    }).render(true)
  }

export function twitchEmote() { // E M O T E / B R O A D C A S T
    let e = new Dialog({
      title: 'Emote / Message Channel',
      content: `
        <form class="flexcol">
          <div class="form-group">
            <label for="msgViewer">Message: </label>
            <input type="text" name="emoteInput" placeholder=" make it good ">
          </div>   
          <p>You can emote [twitchname killed a troll]</p>
          <p>Or send a raw message from your account. Usefull for passing /commands that aren't currently supported in FSM.</p> 
        </form>
      `,
      buttons: {
        no: {
          icon: '<i class="fas fa-times"></i>',
          label: 'Cancel'
        },
        yes: {
          icon: '<i class="fas fa-bullhorn"></i>',
          label: 'Emote',
          callback: (html) => {
            let input = html.find('[name="emoteInput"]').val();
            let myChannel = (game.settings.get("streamMod", "streamChannel"));
            fsMod.client.say(myChannel, '/me ' + input)
          }        
          },
          raw: {
            icon: '<i class="fas fa-broadcast-tower"></i>',
            label: 'Message',
            callback: (html) => {
              let input = html.find('[name="emoteInput"]').val();
              let myChannel = (game.settings.get("streamMod", "streamChannel"));
              fsMod.client.say(myChannel, input)
              console.log(input)}
        }
      },
      default: 'raw',
      close: () => {
        console.log('Another one bites the dust!');
      }
    }).render(true)
  }  

// F U N   S T U F F 
          
export function diceWait(dice, who)  { // G M   R E Q U E S T   R O L L
  fsMod.client.once("message", (channel, tags, message, self) => {
    let subCheck = game.settings.get("streamMod", "subCheck");
    let modStatus = tags["mod"];
    let subStatus = tags["subscriber"];
      
    if (levelCheck(subCheck, modStatus, subStatus)) return diceWait (dice, who);
    
    if (message.includes("!gm") && message.includes(dice)) {
      let myChannel = (game.settings.get("streamMod", "streamChannel"));
      let res = message.slice(3);
      var whoIs = who.toLowerCase();
      var idCheck = tags["display-name"].toLowerCase();   
            if (whoIs != idCheck) {return diceWait(dice, who);}
            if (whoIs == idCheck) {           
                new Roll(res).roll().toMessage({speaker : {alias : `${tags["display-name"]}`}});
                fsMod.client.say(myChannel, `Thank you for the roll, ${tags["display-name"]}!`);  
                return;
                  }
              } return diceWait(dice, who);
            }    
          ) 
        }

export function diceWaitAll(dice) { // G M   R E Q U E S T   R O L L   -   A L L   V I E W E R S
  fsMod.client.once("message", (channel, tags, message, self) => {
    let subCheck = game.settings.get("streamMod", "subCheck");
    let modStatus = tags["mod"];
    let subStatus = tags["subscriber"];
      
    if (levelCheck(subCheck, modStatus, subStatus)) return diceWaitAll(dice); 
      
    if (message.includes("!gm") && message.includes(dice) ) {
      let myChannel = (game.settings.get("streamMod", "streamChannel"));
      let res = message.slice(3);
          new Roll(res).roll().toMessage({speaker : {alias : `${tags["display-name"]}`}});
          fsMod.client.say(myChannel, `Thank you for the roll, ${tags["display-name"]}!`);
            return;        
            } 
      else return diceWaitAll(dice);
    }
  )}

export function streamDice()  { // I N L I N E   D I C E   F O R   T W I T C H
  fsMod.client.on("message", (channel, tags, message, self) => {
    if (message.includes("!roll")) {
      let myChannel = (game.settings.get("streamMod", "streamChannel"));
      let res = message.slice(6);
        roller.clearLog();
        roller.roll(res);
        const firstGm = game.users.find((u) => u.isGM && u.active);
        if (firstGm && game.user === firstGm) {
        fsMod.client.say(myChannel,`${tags["display-name"]} rolls: ` + roller.output)
          }
        }
      })
    } 


// O B F U S C A T I O N   
String.prototype.obfs = function(key, n = 126) { // O B F U S C A T E   S T R I N G
  if (!(typeof(key) === 'number' && key % 1 === 0)
    || !(typeof(key) === 'number' && key % 1 === 0)) {
    return this.toString();
  }
  var chars = this.toString().split('');
  for (var i = 0; i < chars.length; i++) {
    var c = chars[i].charCodeAt(0);
    if (c <= n) {
      chars[i] = String.fromCharCode((chars[i].charCodeAt(0) + key) % n);
    }
  }
  return chars.join('');
};

String.prototype.defs = function(key, n = 126) { // D E - O B F U S C A T E    S T R I N G
  if (!(typeof(key) === 'number' && key % 1 === 0)
    || !(typeof(key) === 'number' && key % 1 === 0)) {
    return this.toString();
  }
  return this.toString().obfs(n - key);
};

/* F U T U R E   D E V 
export function streamStart() {
  var rtpSendParameters = rtpSender.getParameters()

  try {
    let mediaStream = await navigator.mediaDevices.getDisplayMedia({video:true});
    videoElement.srcObject = mediaStream;
  } catch (e) {
    console.log('Unable to acquire screen capture: ' + e);
  }
}*/
