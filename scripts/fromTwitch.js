export const fsMod = {
  client: null,
  options: {}
};

window.WhisperGM = (content) => {
  ChatMessage.create({
    content: content,
    type: 1,
    //whisper: [game.users.find((u) => u.isGM)], // Legacy as of 1/19/21
    speaker: ChatMessage.getSpeaker({ alias: "Stream Chat" }),
  });
};

/* Legacy as of 1/19/21
window.MessageAll = (content) => {
  ChatMessage.create({
    content: content,
    whisper: [game.users.players],
    speaker: ChatMessage.getSpeaker({alias: "StreamChat"}),
  });
}
*/