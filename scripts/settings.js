// (F O U N D R Y - S T R E A M - M O D)

'use strict';

import { localize } from "./utils.js";

function getSetting(key) {
    return game.settings.get("streamMod", key);
}

function registerSetting(setting) {
    return game.settings.register("streamMod", setting.key, setting.options);
}

function registerSettings() { // R E G I S T E R   M O D U L E   S E T T I N G S
    const settings = [
        {
            key: "streamChannel",
            options: {
                name: localize('settings.twitchChannel.name'),
                hint: localize('settings.twitchChannel.hint'),
                scope: "world",
                config: true,
                type: String,
                default: "",
            },
        },
        {
            key: "streamUN",
            options: {
                name: localize('settings.twitchUN.name'),
                hint: localize('settings.twitchUN.hint'),
                scope: "world",
                config: true,
                type: String,
                default: "",
            },
        },
        {
            key: "streamAuth",
            options: {
                name: localize('settings.twitchAuth.name'),
                hint: localize('settings.twitchAuth.hint'),
                config: true,
                scope: "world",
                type: String,
                default: "",
                restricted: true,
                onChange: (value) => {
                    let newvalue = value.toLowerCase();
                    if (newvalue.includes("oauth:")) {
                        game.settings.set("streamMod", "streamAuth", newvalue.obfs(13))
                    } else return;
                }
            }
        },
        {
            key: "streamCmd",
            options: {
                name: localize('settings.xCmd.name'),
                hint: localize('settings.xCmd.hint'),
                config: true,
                scope: "world",
                type: Boolean,
                toggle: true,
                default: false
            }
        },
        {
            key: "streamOnly",
            options: {
                name: "GM Only Mode",
                hint: "Module is only available to the GM.",
                config: false,
                scope: "world",
                type: Boolean,
                toggle: true,
                default: false
            }
        },
        {
            key: "streamRole",
            options: {
                name: localize('settings.streamRole.name'),
                hint: localize('settings.streamRole.hint'),
                config: true,
                scope: "world",
                type: String,
                choices: {
                    "1": "Player",
                    "2": "Trusted",
                    "3": "Assistant Gamemaster",
                    "4": "Gamemaster"
                },
                default: "4"
            }
        },
        {
            key: "streamChatType",
            options: {
                name: localize('settings.chatType.name'),
                hint: localize('settings.chatType.hint'),
                config: true,
                scope: "world",
                type: String,
                choices: {
                    "1": "Out of Character",
                    "2": "In Character",
                    "3": "Emote",
                    "5": "Roll",
                    "0": "Other"
                },
                default: "1"
            }
        },
        {
            key: "subCheck",
            options: {
                name: localize('settings.subCheck.name'),
                hint: localize('settings.subCheck.hint'),
                config: false,
                scope: "world",
                type: Boolean,
                toggle: true,
                default: false,
            },
        },
        {
            key: "streamModEcho",
            options: {
                name: localize('settings.fsbotEcho.name'),
                hint: localize('settings.fsbotEcho.hint'),
                config: true,
                scope: "world",
                type: Boolean,
                toggle: true,
                default: false,
            },
        },
        {
            key: "streamGM",
            options: {
                name: localize('settings.fsModAllChatMessages.name'),
                hint: localize('settings.fsModAllChatMessages.hint'),
                scope: "world",
                config: true,
                type: Boolean,
                toggle: true,
                default: false,
                //restricted: true,
            },
        },
        {
            key: "streamQuiet",
            options: {
                name: localize('settings.streamQuiet.name'),
                hint: localize('settings.streamQuiet.hint'),
                config: true,
                scope: "world",
                type: Boolean,
                toggle: true,
                default: false,
            },
        },
        {
            key: "tabbedChat",
            options: {
                name: localize("settings.tabbedChat.name"),
                hint: localize("settings.tabbedChat.hint"),
                scope: 'world',
                config: true,
                default: false,
                type: Boolean,
            },
        },
        {
            key: "icChatInOoc",
            options: {
                name: localize("settings.IcChatInOoc.name"),
                hint: localize("settings.IcChatInOoc.hint"),
                scope: 'world',
                config: false,
                default: true,
                type: Boolean,
            },
        },
        {
            key: "connectMSG",
            options: {
                name: localize('settings.streamConnect.name'),
                hint: localize('settings.streamConnect.hint'),
                config: true,
                scope: "world",
                type: String,
                choices: {
                    "1": "Connect with announcement",
                    "2": "Connect silently"
                },
                default: "1"
            }
        },
        {
            key: "streamAnnounce1",
            options: {
                name: localize('settings.streamAnounce.name'),
                hint: localize('settings.streamAnounce.hint'),
                config: true,
                scope: "world",
                type: String,
                default: "",
                restricted: true,
            }
        },
        {
            key: "streamAnnounce1T",
            options: {
                name: localize('settings.streamAnounceT.name'),
                hint: localize('settings.streamAnounceT.hint'),
                config: true,
                scope: "world",
                type: Number,
                default: "",
                restricted: true,
            }
        },
        {
            key: "streamAnnounce2",
            options: {
                name: localize('settings.streamAnounce.name'),
                hint: localize('settings.streamAnounce.hint'),
                config: true,
                scope: "world",
                type: String,
                default: "",
                restricted: true,
            }
        },
        {
            key: "streamAnnounce2T",
            options: {
                name: localize('settings.streamAnounceT.name'),
                hint: localize('settings.streamAnounceT.hint'),
                config: true,
                scope: "world",
                type: Number,
                default: "",
                restricted: true,
            }
        },
        {
            key: "streamDice",
            options: {
                name: localize('settings.streamDice.name'),
                hint: localize('settings.streamDice.hint'),
                config: true,
                scope: "world",
                type: Boolean,
                default: true,
                restricted: true,
            }
        },
        {
            key: "streamRollReq",
            options: {
                name: localize('settings.streamRoll.name'),
                hint: localize('settings.streamRoll.hint'),
                config: true,
                scope: "world",
                type: String,
                default: "The GM is requesting a viewer to roll! [Type !gm ${dice} to roll]",
                restricted: true,
            }
        },
        {
            key: "streamRollReq2",
            options: {
                name: localize('settings.streamRoll2.name'),
                hint: localize('settings.streamRoll2.hint'),
                config: true,
                scope: "world",
                type: String,
                default: "The GM is requesting ${who} to roll! [Type !gm ${dice} to roll]",
                restricted: true,
            }
        },
        {
            key: "streamThank",
            options: {
                name: localize('settings.thankRoll.name'),
                hint: localize('settings.thankRoll.hint'),
                config: true,
                scope: "world",
                type: String,
                default: "Thank you for the roll!",
                restricted: true,
            }
        },
    ];
    settings.forEach(registerSetting);
}

export { getSetting, registerSettings };

// O B F U S C A T I O N   
String.prototype.obfs = function (key, n = 126) { // O B F U S C A T E   S T R I N G
    if (!(typeof (key) === 'number' && key % 1 === 0)
        || !(typeof (key) === 'number' && key % 1 === 0)) {
        return this.toString();
    }
    var chars = this.toString().split('');
    for (var i = 0; i < chars.length; i++) {
        var c = chars[i].charCodeAt(0);
        if (c <= n) {
            chars[i] = String.fromCharCode((chars[i].charCodeAt(0) + key) % n);
        }
    }
    return chars.join('');
};

String.prototype.defs = function (key, n = 126) { // D E - O B F U S C A T E    S T R I N G
    if (!(typeof (key) === 'number' && key % 1 === 0)
        || !(typeof (key) === 'number' && key % 1 === 0)) {
        return this.toString();
    }
    return this.toString().obfs(n - key);
};