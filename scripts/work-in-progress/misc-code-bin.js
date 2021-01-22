// F O R M A T T I N G   M E S S A G E S

import { fsMod } from "../fromTwitch";

    sendToTwitch( {
      content: turndown.turndown(chatMessage.content),
      username: game.users.get(chatMessage.user).name,
      //avatar_url: img
    });

    function sendToTwitch(body) {
        $.ajax({
          type: 'POST',
          data: JSON.stringify(body),
          success: function(data) {},
          contentType: "application/json",
          dataType: 'json'
        });
        fsMod.client.say()
    }
// BREAK
