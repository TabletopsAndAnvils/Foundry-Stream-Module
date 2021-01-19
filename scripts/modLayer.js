// NOT USED AT THIS TIME, PRESERVED FOR LATER USE

import {SetupTwitchClient} from "../main.js";

SetupTwitchClient();

///**       (B U T T O N S ( L E F T ))          ///**
 
  function twitchKick() { 
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
  
  function twitchBan() { 
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
  
  function twitchRaid() { 
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
  //Buttons on the left
  Hooks.on("getSceneControlButtons", (controls) => {
    if (game.user.data.role == 4) {
      controls.push();
    }
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
          onClick: () => fsMod.client.say(myChannel,'/clear'), 
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