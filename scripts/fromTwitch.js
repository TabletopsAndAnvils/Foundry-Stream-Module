// (F O U N D R Y - S T R E A M - M O D)

export const fsMod = {
  client: null,
  options: {}
};

window.WhisperGM = (content) => { // H A N D L E S   M E S S A G E S   F R O M   T W I T C H
  ChatMessage.create({
    content: content,
    type: game.settings.get("streamMod", "streamChatType"),
    speaker: ChatMessage.getSpeaker({ alias: "Stream Chat" }),
  });
};