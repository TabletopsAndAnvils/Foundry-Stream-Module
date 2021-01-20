export const fsMod = {
  client: null,
  options: {}
};

window.WhisperGM = (content) => {
  ChatMessage.create({
    content: content,
    type: 1,
    speaker: ChatMessage.getSpeaker({ alias: "Stream Chat" }),
  });
};