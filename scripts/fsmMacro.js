/* Primary macro functions are as follows:
       
       awaitStream(trigger, response) <= sets a trigger such as !a and waits to give a response.
       
       streamOut('message') <= Sends 'message' to Twitch stream without any actor information.
       
       streamIn('message') <= Writes a message to Foundry chat as though it came from Twitch. 
       - Probably pointless unless you want to spam your players.

I'm not exactly sure that controlling the module via macro is a desired feature but I decided
to do it anyway, because this community always surprises me! If you have a suggestion for other functions 
feel free to drop me a line. I'm not saying I'll make it happen, but there's always a possibility!
*/

// EXAMPLE 1: This is a hook, so be careful to only run it once! If you are already running it and update, reload otherwise it 
// will spit out multiple messages! I know there's some sort of flag solution to keeping track how many times it's run
// but I'm busy working on other things, so if you want to share, by all means!

streamOut('Commands are !a, !b, !z');
        let message = "Bob has 23hp";     
              awaitStream('!a', 'Is for aberation.');
              awaitStream('!b', message);
              awaitStream('!z', 'Is for zombie.');

// EXAMPLE 2: Broadcasts Current Combat Round Macro

let messageContent = `ROUND ${game.combat.round}`;
streamOut(messageContent);

// 