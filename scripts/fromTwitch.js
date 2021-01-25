export const fsMod = {
  client: null,
  options: {}
};

window.WhisperGM = (content) => {
  ChatMessage.create({
    content: content,
    type: game.settings.get("streamMod", "streamChatType"),
    speaker: ChatMessage.getSpeaker({ alias: "Stream Chat" }),
  });
};