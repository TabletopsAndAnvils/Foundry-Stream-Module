'use strict';

import {localize} from "./utils.js";

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
            key: "connectMSG",
            options: {
                name: localize('settings.streamConnect.name'),
                hint: localize('settings.streamConnect.hint'),
                config: true,
                scope: "world",
                type: String,
                choices: {
                    "1": "Connect with announcement",
                    "2": "Connect silently"                },
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
            key: "streamJoin",
            options: {
                name: localize('settings.streamJoin.name'),
                hint: localize('settings.streamJoin.hint'),
                config: true,
                scope: "world",
                type: String,
                default: "",
                restricted: true,
            }
        },
    ];
    settings.forEach(registerSetting);
}

export {getSetting, registerSettings};