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
                type: Number,
                default: "4",
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
                default: false,
                restricted: true,
            },
        },
    ];
    settings.forEach(registerSetting);
}

export {getSetting, registerSettings};