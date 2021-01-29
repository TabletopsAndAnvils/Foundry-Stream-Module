export const fsMod = {
  client: null,
  options: {}
};

window.streamIn = (content) => {
  ChatMessage.create({
    content: content,
    type: game.settings.get("streamMod", "streamChatType"),
    speaker: ChatMessage.getSpeaker({ alias: "Stream Chat" }),
  });
};

window.streamOut = (content) => {
  let myChannel = (game.settings.get("streamMod", "streamChannel"));
  const firstGm = game.users.find((u) => u.isGM && u.active);
    if (firstGm && game.user === firstGm)
      fsMod.client.say(myChannel, content);
  };

window.onStream = () => {
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

window.awaitStream = (streamTrigger, content) => {
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

window.triggerStream = (streamTrigger, destFunc, args) => {
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
