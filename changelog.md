## Release 0.2.4
- Added option from directly within Request Roll to hide the roll from players. This is not a blindroll, it is a gmroll to the GM and/or their moderator(s)
depending on who made the request. While this has always been possible by using the drop down selector in the chat box itself, this is here as a matter of 
convenience for GM's and moderators. If a GM requests a private roll it will only been seen by the GM until it is revealed, however if a moderator requests
a private roll, the roll (if using DSN) and result will be seen by the moderator and the GM. As normal, a private roll can be revealed by right clicking 
on it.
- Added Request Roll localization support from within module configuration. Users can now customize the messages sent to Twitch regarding roll requests. 
Two option tags are available for these strings: ${dice} returns the roll request (ie 1d20) and ${who} returns who the request is made of if required.
- Updated documentation in compendium.
- Cleaned up code and structure in preparation for 0.8.x migration.

## Release 0.2.3
- Fixed url in modules.json
- Quick fix for language modification. You can now edit the language file for custom roll messages. Be sure to still include the trigger '!gm' and the variables
'${who}' for the viewer name and '${dice}' for the dice to request. This is an advance method and should only be done by people familiar and comfortable with
editing .json files as any error in the formatting of this file will not allow the module to load. I highly recommend making a backup of the original first! In
the future, when I have the time to re-work the configuration of the module, I will make this editable from within Foundry itself. This is just a short term
fix per user requests. PS, if you're editing the language .json in a language other than English that is currently supported byt Foundry, please share it on 
my github or Discord server so I can consider including it in future versions!

## Release 0.2.2u
- Minor update to emotes. Emotes were being sent to chat cards even when Receive from Twitch was disabled.

## Release 0.2.2r
- Added confirmation dialog for Clear Twitch Chat.
- Bug fix regarding turning off receiving chat messages from Twitch where even when turned off, clients were still receiving messages.
- Added obfuscation of the Twitch OAuth token. On save the OAuth token will appear scrambled, it's totally fine! I just added this for streamers who may be showing
backend configuration in their streams to add a little bit of protection.
- Removed Sub only mode, should be temporary. Looking into whether Twitch has depreciated the tag.
- Removed Hide from Stream View temporarily. It will most likely be back in the immediate future, just waiting to see what changes may be made come the release
of Foundry VTT 0.8.0.

## Release 0.2.1
- Twitch Emotes are now passed into Foundry from Twitch chat! 
- Subscriber Mode: You can now select to only allow subscriber chat messages to be passed from Twitch to Foundry. Anyone with moderator status is not affected. This
also affects the Request Dice Roll system but not the Twitch only dice rolling system, that will still need to be toggled off separately. This is a great 
feature to add incentive to Subscribing to your channel, unfortunately Twitch does not allow Followers to be tagged at this time so a similar feature for Followers
will not be in the immediate future.

## Release 0.2.0r
- Added inline tabbed chatting system! FSM now comes with a tabbed chatting system built in. By default this is on, however it can be turned off by enabling Legacy Mode.
The tabbed chat is simple and a convenient way to keep the Foundry chat you know but also provide a separate tab where all Twitch messages go. It has been tested with 
Tabbed Chatlog and doesn't appear to have any conflicts, at least on my setup, your mileage might vary depending on what modules that affect the chat system you are running.
- Added /stream hiding. For those broadcasting using the built in stream resources of Foundry you may want to hide the tabbed chat from your overlay. By default this 
feature is not enabled.
- In game documentation created as an installed Journal Entry in the Compendium.
- Reorganized the code from the ground up. 

## Release 0.1.7
- Just some minor tweaking and cleaning up some errant code.

## Release 0.1.6r
- Added GM roll requests. GM/Moderator can ask Twitch viewers for a roll (ie 1d100 or 4d6+4, etc) and the first person to respond will
roll the dice in Foundry. IF GM/Moderator specifies a viewer name it will wait for that player to roll, ignoring anyone else. A great 
way to make your viewers more involved with your games! Also works with Dice-so-Nice! 
- Join notifications/messages. This may be depreciated, testing it out to see if it works. May be limited on large channels and only
sends messages in batches whenever it feels like it. 
- Emote/ Broadcast button added to canvas layer.
- Added a filter to stop excess roll results and announcements.
- Added configuration option to turn off Dice Roller in Twitch chat, this does not affect GM/Mod request rolls.

## Release 0.1.5r
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
