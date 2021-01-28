## Release 0.1.5
- Added a dice roller for viewers on Twitch. Now viewers can roll along with your players in Twitch! Just type !roll 3d8+5 etc in the 
Twitch chat and they can roll alongside you! Added a filter to catch the roll requests so they don't clutter up the chat window. The 
roller can handle multiple types of dice, with a range of modifiers and mathematical functions!
- Added an initial response for Subs and re-Subs. I think this works but I don't have any subs to test it out. lol
- Added two customizeable timed announcements for the channel. Announcements can be set up to fire every x number of seconds, use it to 
let new viewers know what's going on, or even how to use that fancy new dice roller!
- Created macro usuable functions, streamOut, streamIn, triggerStream and awaitStream. These will most likely be refined over time and more will be
added as needed. Unfortunately the Twitch API is limited in information that it passes along so tasks such as recognizing Followers is not
supported at this time. I added a file called fsmMacro.js on Github with some examples of use. Macro capability is not very robust at this
time but it's definitely a start! 
- Reworked structure, as always.

## Release 0.1.4
- Added whisper filter, this stops all private messages between players or gm/players from being relayed.
- Added Quiet mode, stops rolls such as attack, checks and spells from being relayed into stream chat.
- Changed the way the speaker of a message from Foundry is identified on the Twitch chat. Speaker is now highlighted as \[Speaker\]:

## Release 0.1.3
- Added ability to set the chat card type. Depending on modules being used, such as Tabbed Chatlog, changing the type of message will affect
where the messages from the stream appears in Foundry. Choices are OOC, IC, Emote, Roll and Other.
- Added option to connect to a stream channel chat silently without announcement. While useful for testing, it may not be desireable to 
have it announce a connection in a situation where there might be frequent reconnects.
- Changed the Moderation Role configuration to a drop down style selection instead of a string input.

## Release 0.1.2
- Added filters in Foundry=>Twitch hook to remove extraneous information being sent to Twitch chat.
- Created modLayers.js, moved canvas layer control functions from main module.
- Updated utils.js to remove unused code.

## Initial Public Release - 21.01.19
- Foundry Stream Modue is a mod for integrating Twitch chat from streams into Foundry Virtual Tabletop. Foundry Stream Module sends player chats, rolls, interactions to the Twitch stream chat and allows viewers in the Twitch chat to send messages to the players as an out of character message. GM's or another configurable user role can also moderate the Twitch chat via canvas control buttons for actions such as Clear, Timeout, Ban, Slow and Raid.

### New Features
- Integrate chat between Foundry and Twitch.
- Moderation of Twitch chat channels.

### Bug Fixes
- Added a redundancy check to stop duplicate messages when more than one GM was on the server.

### Improvements
- Improved the handling of configuration to just GM roles over the previous GM and User roles. 
