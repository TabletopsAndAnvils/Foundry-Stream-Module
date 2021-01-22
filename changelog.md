## Release 0.1.2 - 21.01.22
- Added filters in Foundry=>Twitch hook to remove extraneous information being sent to Twitch chat.
- Created modLayers.js, moved canvas layer control functions from main module.
- Updated utils.js to remove unused code.

## Initial Public Release 0.1.1 - 21.01.19
- Foundry Stream Modue is a mod for integrating Twitch chat from streams into Foundry Virtual Tabletop. Foundry Stream Module sends player chats, rolls, interactions to the Twitch stream chat and allows viewers in the Twitch chat to send messages to the players as an out of character message. GM's or another configurable user role can also moderate the Twitch chat via canvas control buttons for actions such as Clear, Timeout, Ban, Slow and Raid.

### New Features
- Integrate chat between Foundry and Twitch.
- Moderation of Twitch chat channels.

### Bug Fixes
- Added a redundancy check to stop duplicate messages when more than one GM was on the server.

### Improvements
- Improved the handling of configuration to just GM roles over the previous GM and User roles. 
