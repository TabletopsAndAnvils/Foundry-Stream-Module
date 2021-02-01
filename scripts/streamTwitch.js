// (F O U N D R Y - S T R E A M - M O D   0 . 1 . 8)

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
  let myChannel = (game.settings.get("streamMod", "streamChannel"));
  const firstGm = game.users.find((u) => u.isGM && u.active);
    if (firstGm && game.user === firstGm)
      fsMod.client.say(myChannel, content);
  };

window.onStream = () => { // H A N D L E   M E S S A G E S   F R O M   T W I T C H  +  S U B S
  fsMod.client.on("message", (channel, tags, message, self) => {
    let strx = game.settings.get("streamMod","streamUN")
    if (self) return;
    if (message.includes('!r')) return;
    if (message.includes('!gm')) return;
    if (tags["display-name"].includes(strx)) return 
    const firstGm = game.users.find((u) => u.isGM && u.active);
     if (firstGm && game.user === firstGm) {
       streamIn(`<b>${tags["display-name"]}</b>: ${message}`);
    }
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
