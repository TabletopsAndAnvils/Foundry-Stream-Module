<img align="right" width="376" height="300" src="https://github.com/TabletopsAndAnvils/Foundry-Stream-Module/blob/main/img/fsm-cover-mid.png"><p>
# Foundry Stream Module # 
A module for integrating Twitch chat from streams into Foundry Virtual Tabletop. Foundry Stream Module sends player chats, rolls, interactions to the Twitch stream chat and allows viewers in the Twitch chat to send messages to the players as an out of character message. GM's or another configurable user role can also moderate the Twitch chat via canvas control buttons for actions such as Clear, Timeout, Ban, Slow and Raid. Check out our current list of streamers! [Current Streamers List](https://github.com/TabletopsAndAnvils/Foundry-Stream-Module/blob/main/streamers.md) If you would like your stream added to the list, drop at message to me over at [Discord](https://discord.gg/sR8MTsgWSc)</p>

<img align="left" width="30%" height="30%" src="https://github.com/TabletopsAndAnvils/Foundry-Stream-Module/blob/main/img/Screen%20Shot%202021-01-18%20at%2021.27.40.png"><p>
# General #
This is my first time programming anything in about 27 years, as such, there may be a few glitches here and there. Just understand that I've been a professional blacksmith and bladesmith for more than two and a half decades and programming is a lot different than swinging a hammer! I love the community around Foundry VTT and wanted to give a little back, so here it is, this is my hobby project - what I do to relax - although there's been a few tense moments just to get this first release out! If you find it useful, great! I hope that you like it! As my programming skills grow I hope this module grows with them. </p>

<img align="right" src="https://github.com/TabletopsAndAnvils/Foundry-Stream-Module/blob/main/img/Screen%20Shot%202021-01-19%20at%2022.22.52.png"><p>
## Recommended but not required ##
I highly recommend Tabbed Chatlog by cswendrowski! https://github.com/cswendrowski/FoundryVTT-Tabbed-Chatlog
This module adds tabs to the regular Foundry chat and because Foundry Stream Module recieves chats and displays them as OOC (out of character) chat messages
new messages will appear in the OOC tab. While not it's own Twitch tab, this is a huge benefit to keeping the chatlog readable and organized! </p>

<a href="https://youtu.be/g6h1_mgtr4U"><img align="center" height="25%" width ="25%" src="https://img.youtube.com/vi/g6h1_mgtr4U/0.jpg"> YouTube: Introducing Foundry Stream Module</a>

## Change Log ##
The most recent [changelog.md](https://github.com/TabletopsAndAnvils/Foundry-Stream-Module/blob/main/changelog.md)

## Installation ##
For manual installation:
* Open the main screen of FoundryVTT.
* Go to the 'Add-on Modules' tab.
* Click the button 'Install Module'.
* Enter the following in the Manifest URL textbox: https://raw.githubusercontent.com/TabletopsAndAnvils/Foundry-Stream-Module/main/module.json
* Click 'Install'.
<img align="right" height="50%" width ="50%" src="https://github.com/TabletopsAndAnvils/Foundry-Stream-Module/blob/main/img/Screen%20Shot%202021-01-25%20at%2017.12.24.png"><p>
## Configuration ##
- `Twitch Channel` - This is your Twitch stream name.
- `User Name` - For your Twitch username or registered bot name, to be used in the future for sending messages back to Twitch. Capitalization may affect echoing. If you're not recieving messages from Twitch but messages are going out, try all lowercase for the user name.
- `Twitch OAuth Token` - OAuth token for the user above. Without it you will only be able to recieve messages but rolls, chat etc will not be sent to Twitch. If you do not have a OAuth token for your Twitch stream, simply log in to Twitch with your browser, open a tab and go to https://twitchapps.com/tmi/ - follow the prompts and your OAuth token will be generated.
- `Out to Twitch` - Check to send Foundry chat messages to Twitch channel.
- `Recieve Twitch` - Enable to recieve messages from your configured Twitch channel.
- `Moderation Access Level` - Every once in a while a GM may need help with moderating a Twitch channel. Select user role to allow access to the module moderation controls. 
- `Chat Type` - How incoming messages from Twitch should be assigned. Depending on different modules being used, it may be desireable to change how a chat card is created. Options are OOC, IC, Emote, Roll and Other. Default setting is OOC.
- `Quiet Mode` - Filters rolls such as attacks, checks and spells from being sent to Twitch, only allows OOC, IC, Emote and Other to be passed along to the stream.
- `Send Connect Message` - Turn on/off announcement message when connecting to a Twitch channel chat.</p>

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
Many thanks go out to the entire FoundryVTT community especially Atropos for creating it, just about everyone over in the #module-development channel on the FVTT Discord, League of Extraordinary FoundryVTT Developers, Melbz who wrote his own Twitch-bot for Foundry (https://bitbucket.org/Melbz/foundryvtt-twitch-bot/src/master/) that pointed me in the right direction for starting this module and Pint and Pie (https://github.com/thomasmckay) who is doing things with Twitch and Foundry that are absolutely mind-numbingly insane. His play through chat module lit the spark of inspiration for Foundry Stream Module many, many months ago! 

## License
- This work is licensed under a [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/legalcode).
- This work is licensed under the [Foundry Virtual Tabletop EULA - Limited License Agreement for Module Development](https://foundryvtt.com/article/license/).

### Bugs
- View current known bugs in the [Issue Tracker Backlog](https://github.com/TabletopsAndAnvils/Foundry-Stream-Module/issues)
