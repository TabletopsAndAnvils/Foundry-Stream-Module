// (F O U N D R Y - S T R E A M - M O D)
import { outChat, inChat, gmOnly } from "../scripts/fsmcore.js";
export const fsMod = {
  client: null,
  options: {}
};


window.streamIn = (content) => { // A L I A S   M E S S A G E S
  ChatMessage.create({
    content: content,
    type: game.settings.get("streamMod", "streamChatType"),
    speaker: ChatMessage.getSpeaker({ alias: "Stream Chat" }),
  });
};

window.streamOut = (content) => { // S E N D   O U T   T O   T W I T C H
  if (!outChat()) return;
  let myChannel = (game.settings.get("streamMod", "streamChannel"));
  const firstGm = game.users.find((u) => u.isGM && u.active);
    if (firstGm && game.user === firstGm)
      fsMod.client.say(myChannel, content);
  };
      
window.onStream = () => { // H A N D L E   M E S S A G E S   F R O M   T W I T C H  +  S U B S
  fsMod.client.on("message", (channel, tags, message, self, userstate) => {
    let subCheck = game.settings.get("streamMod", "subCheck");
    let modStatus = tags["mod"];
    let subStatus = tags["subscriber"];
    if (levelCheck(subCheck, modStatus, subStatus)) return;
    if (!tags["emotes"]) {
      let strx = game.settings.get("streamMod","streamUN")
    if (self) return;
    if (message.includes('!r')) return;
    if (message.includes('!gm')) return;
    if (!inChat()) return;
    if (tags["display-name"].includes(strx)) return 
      const firstGm = game.users.find((u) => u.isGM && u.active);
       if (firstGm && game.user === firstGm) {
         streamIn(`<b>${tags["display-name"]}</b>: ${message}`);
      }
    } else {
      let emotes = (tags["emotes"]);
      return getMessageEmotes(tags, message, { emotes });}
  })
  fsMod.client.on("subscription", function (channel, username, method, message, userstate) {
   streamOut(username + ' just subscribed!!');
});
  fsMod.client.on("resub", function (channel, username, months, message, userstate, methods) {
   streamOut(username + ' just re-subscribed for ' + months + '!!');
});
}

window.awaitStream = (streamTrigger, content) => { // W A I T   F O R   I T
  fsMod.client.on("message", (channel, tags, message, self) => {
    let strx = game.settings.get("streamMod","streamUN")
    if (self) return;
    if (tags["display-name"].includes(strx)) return 
    const firstGm = game.users.find((u) => u.isGM && u.active);
     if (firstGm && game.user === firstGm) 
     if (message.includes(streamTrigger)) {
      streamOut(content);
    }
  })
}

window.triggerStream = (streamTrigger, destFunc, args) => { // T R I G G E R S 
  fsMod.client.on("message", (channel, tags, message, self) => {
    let strx = game.settings.get("streamMod","streamUN")
    if (self) return;
    if (tags["display-name"].includes(strx)) return 
    const firstGm = game.users.find((u) => u.isGM && u.active);
     if (firstGm && game.user === firstGm) 
     if (message.includes(streamTrigger)) {
   destFunc(args);
  }
})
}

function getMessageEmotes(tags, message, { emotes }) {
  if (!inChat()) return;
  if (!emotes) return message;
  let strx = game.settings.get("streamMod","streamUN")
  if (tags["display-name"].includes(strx)) return 
  const stringReplacements = [];

  Object.entries(emotes).forEach(([id, positions]) => { // iterate of emotes to access ids and positions
    
    const position = positions[0]; // use only the first position to find out the emote key word
    const [start, end] = position.split("-");
    const stringToReplace = message.substring(
      parseInt(start, 10),
      parseInt(end, 10) + 1
    );

    stringReplacements.push({
      stringToReplace: stringToReplace,
      replacement: `<img class="noborder" src="https://static-cdn.jtvnw.net/emoticons/v1/${id}/1.0">`,
    });
  });

  const messageHTML = stringReplacements.reduce( // generate HTML and replace all emote keywords with image elements
    (acc, { stringToReplace, replacement }) => { 
      return acc.split(stringToReplace).join(replacement);
    },
    message
  );
  
  const firstGm = game.users.find((u) => u.isGM && u.active); //return messageHTML;
      if (firstGm && game.user === firstGm) {
       streamIn(`<b>${tags["display-name"]}</b>: ${messageHTML}`);
       }
}

export function levelCheck(subCheck, modStatus, subStatus) {
  if (subCheck == true) {
    if (modStatus == true) return false }
     else {
      if (subStatus == true) return false 
       else return;}
  if (subCheck == false) return false 
  else return true;
     }