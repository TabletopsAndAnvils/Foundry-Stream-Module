<b>IF YOU'RE UPGRADING FROM 0.0.3d or OLDER, PLEASE DISABLE "OUT TO TWITCH" AND "RECIEVE TWITCH" PRIOR TO UPGRADE.</b>

# Foundry Stream Module #
A module for integrating Twitch chat from streams into Foundry Virtual Tabletop.

![screen shot2](https://github.com/TabletopsAndAnvils/Foundry-Stream-Module/blob/main/img/Screen%20Shot%202021-01-18%20at%2021.32.30.png)

# General #
This is my first time programming anything in about 27 years, as such, there may be a few glitches here and there. Just understand that I've been a professional blacksmith and bladesmith for more than two and a half decades and programming is a lot different than swinging a hammer! I love the community around Foundry VTT and wanted to give a little back, so here it is, this is my hobby project - what I do to relax - although there's been a few tense moments just to get this first release out! If you find it useful, great! I hope that you like it! As my programming skills grow I hope this module grows with them. 

![module control](https://github.com/TabletopsAndAnvils/Foundry-Stream-Module/blob/main/img/Screen%20Shot%202021-01-18%20at%2021.27.40.png)

## Installation ##
For manual installation:
* Open the main screen of FoundryVTT.
* Go to the 'Add-on Modules' tab.
* Click the button 'Install Module'.
* Enter the following in the Manifest URL textbox: https://raw.githubusercontent.com/TabletopsAndAnvils/Foundry-Stream-Module/main/module.json
* Click 'Install'.

## Recommended but not required ##
I highly recommend Tabbed Chatlog by cswendrowski! https://github.com/cswendrowski/FoundryVTT-Tabbed-Chatlog
This module adds tabs to the regular Foundry chat and because Foundry Stream Module recieves chats and displays them as OOC (out of character) chat messages
new messages will appear in the OOC tab. While not it's own Twitch tab, this is a huge benefit to keeping the chatlog readable and organized! 

![tabbed chat](https://github.com/TabletopsAndAnvils/Foundry-Stream-Module/blob/main/img/Screen%20Shot%202021-01-19%20at%2022.22.52.png)

## Configuration ##
- `Twitch Channel` - This is your Twitch stream name.
- `User Name` - For your Twitch username or registered bot name, to be used in the future for sending messages back to Twitch. CAPITALIZATION is important in order to catch echoing messages.
- `Twitch OAuth Token` - OAuth token for the user above. Without it you will only be able to recieve messages but rolls, chat etc will not be sent to Twitch.
- `Out to Twitch` - Check to send Foundry chat messages to Twitch channel.
- `Recieve Twitch` - Enable to recieve messages from your configured Twitch channel.

![config image](https://github.com/TabletopsAndAnvils/Foundry-Stream-Module/blob/main/img/Screen%20Shot%202021-01-19%20at%2022.03.50.png)

## Features ##
- `Chat` - Two way communication between Foundry and Twitch. 
- `GM Moderation` - On the side controls there are buttons to Clear Twitch chat, Timeout or Ban viewers and a Raid button. Please note, in order for the Raid function to work you must be signed in through a browser as well in order to click on confirmation dialog.

# Links #
* https://www.twitch.tv/tabletopsandanvils - My Twitch.tv where we livestream.
* https://www.patreon.com/tabletopsandanvils - See what else I'm doing for Foundry.
* https://www.youtube.com/channel/UCx1lu5HlZtmmk4JtsU_noSw - Tabletops & Anvils on Youtube.

### Future Goals
- `Clean Up Rolls` - Clean up the roll output to Twitch. As is, depending on the system and various mods being used, rolls can get quite complicated looking. In the meantime, for the next release I may look into separating chat from rolls in the output. There's a lot of different game systems out there so I wont say no to some help if anyone is interested in contributing! :)
- `Breakout Window` - Possibly? Not sure that it really needs to be added now with the Tabbed Chatlog module. Still, a configurable breakout window for incoming chats that would be viewable by all players might happen in the future. Customizable for theme, color, opacity, etc.
- `Set Dressing` - Be able to add floating, resizeable, placeable graphics such as a "stream tag" for all clients, branding for the stream.
- `RTMP Pipe Dream` - With Jitsi/WebRTC it's now possible to stream a window or browser tab directly to YouTube and other RTMP servers. A long term goal is to incorporate this functionality into Foundry Stream Module along with controls to make a slim streaming client that is essentially WYSIWYG for the user, foregoing the use of other software such as OBS or Streamlabs.

## Acknowledgements ##
Many thanks go out to the entire FoundryVTT community especially Atropos for creating it, just about everyone over in the #module-development channel on the FVTT Discord, cswendrowski for your awesome Tabbed Chatlog module, Melbz who wrote his own Twitch-bot for Foundry (https://bitbucket.org/Melbz/foundryvtt-twitch-bot/src/master/) that pointed me in the right direction for starting this module and Pint and Pie (https://github.com/thomasmckay) who is doing things with Twitch and Foundry that are absolutely mind-numbingly insane. His play through chat module lit the spark of inspiration for Foundry Stream Module many, many months ago! 

## License
- This work is licensed under a [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/legalcode).
- This work is licensed under the [Foundry Virtual Tabletop EULA - Limited License Agreement for Module Development](https://foundryvtt.com/article/license/).

### Bugs
- View current known bugs in the [Issue Tracker Backlog](https://github.com/TabletopsAndAnvils/FVTT-TwitchRelay/issues)
