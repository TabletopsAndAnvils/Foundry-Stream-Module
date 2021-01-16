# Foundry Stream Module #
A module for integrating Twitch chat from streams into Foundry Virtual Tabletop.

# General #
This is my first time programming anything in about 27 years, as such, this is not an actual module written by someone who knows what they are doing! Instead it is just some code that I am writing/playing with/abusing to learn more about coding in Javascript and integrating it with FoundryVTT/Twitch. While the source is public it is really just here for my own amusement. If you find it useful, great! Glad you like it! As my programming skills grow I hope this module grows with them.

## Configuration ##
- `Twitch Channel` - This is your Twitch stream name.
- `User Name` - For your Twitch username or registered bot name, to be used in the future for sending messages back to Twitch. CAPITALIZATION is important in order to catch echoing messages.
- `Twitch OAuth Token` - OAuth token for the user above. Without it you will only be able to recieve messages but rolls, chat etc will not be sent to Twitch.
- `Out to Twitch` - Only one client should have this checked. In otherwords, if there are 5 people on the server, just one of them should have it enabled. This controls who's chat messages get sent to the Twitch chat. 
- `All Players` - Check this box to send all chats directly to players without moderation. Only one of the following boxes should be checked at the same time.
- `Whisper All Chats` - Check this box to send all chats from all channels to the GM for moderation.

![config image](https://github.com/TabletopsAndAnvils/Foundry-Stream-Module/blob/main/img/Screen%20Shot%202021-01-15%20at%2020.26.16.png)

## Features ##
- `Chat` - All chats from any configured Twitch channel can either whispered to the GM for moderation or go directly to the player chat depending on configuration. The latter could be prone to spam on a high volume channel, use at your own risk!
- `GM Moderation` - On the side controls there are buttons to Clear Twitch chat, Timeout or Ban viewers and a Raid button. Please note, in order for the Raid function to work you must be signed in through a browser as well in order to click on confirmation dialog.

### Future Goals
- `Breakout Window` - Add a configurable breakout window for incoming chats that would be viewable by all players. Customizable for theme, color, opacity, etc.
- `Set Dressing` - Be able to add floating, resizeable, placeable graphics such as a "stream tag" for all clients, branding for the stream.
- `RTMP Pipe Dream` - With Jitsi/WebRTC it's now possible to stream a window or browser tab directly to YouTube and other RTMP servers. A long term goal is to incorporate this functionality into Foundry Stream Module along with controls to make a slim streaming client that is essentially WYSIWYG for the user, foregoing the use of other software such as OBS or Streamlabs.

## License
- This work is licensed under a [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/legalcode).
- This work is licensed under the [Foundry Virtual Tabletop EULA - Limited License Agreement for Module Development](https://foundryvtt.com/article/license/).

### Bugs
- View current known bugs in the [Issue Tracker Backlog](https://github.com/TabletopsAndAnvils/FVTT-TwitchRelay/issues)
