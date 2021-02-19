// (F O U N D R Y - S T R E A M - M O D)

// ( M O D L A Y E R . J S)

import { twitchBan, twitchKick, twitchSlow, twitchClear, twitchRaid, twitchRoll, twitchEmote } from "./fsmcore.js";

// C A N V A S   C O N T R O L   B U T T O N S 

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
          icon: "fas fa-dice",
          name: "twitchRoll",
          title: "Ask for Roll",
          onClick: () => twitchRoll(),
        },
        {
          icon: "fas fa-broadcast-tower",
          name: "emoteChannel",
          title: "Emote/Raw Message",
          onClick: () => twitchEmote()
        },
        {
          icon: "fas fa-eraser",
          name: "ClearTwitch",
          title: "Clear Twitch Chat",
          onClick: () => twitchClear(),
        },
        {
          icon: "fas fa-hourglass-half",
          name: "SlowTwitch",
          title: "Slow Twitch Chat",
          onClick: () => twitchSlow(),
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

  roleTest() {
    Hooks.on("getSceneControlButtons", (controls) => {
      console.log("Foundry Stream Module | Testing User role = " + game.user.data.role);
      if (game.user.data.role >= (game.settings.get("streamMod", "streamRole"))) {
        controls.push(this.newButtons);
      }
    });
  }
}
