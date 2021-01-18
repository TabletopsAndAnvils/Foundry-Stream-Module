'use strict';

import {localize} from "./utils.js";

/**
  The function returns the value for a register setting
 
  @param {string} key - the name of the setting
 
  @return {*}
 */

 function getSetting(key) {
    return game.settings.get("fsMod", key);
}

/**
  The function calls the foundry register setting function with the module name
 
  @param {Object} setting
  @param {string} setting.key - the name of the setting
  @param {Object} setting.options - the properties of the setting
 */

 function registerSetting(setting) {
    return game.settings.register("fsMod", setting.key, setting.options);
}

/**
  Register all the module's settings
 */

 function registerSettings() {
    // a list of all the module's settings
    // initialized here to be able to localize the strings
    const settings = [
        {
            key: "twitchChannel",
            options: {
                name: "Twitch Channel",//localize('settings.twitchChannel.name'),
                hint: "Twitch Channel to integrate.",//localize('settings.twitchChannel.hint'),
                scope: "world",
                config: true,
                type: String,
                default: "",
            },
        },
        {
            key: "twitchUN",
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
            key: "twitchAuth",
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
            key: "fsModGlobal",
            options: {
                name: localize('settings.fsModGlobal.name'),
                hint: localize('settings.fsModGlobal.hint'),
                type: Number,
                config: true,
                scope: "client",
                type: Boolean,
                default: true,
            }
        },
        {
            key: "fsbotEcho",
            options: {
                name: localize('settings.fsbotEcho.name'),
                hint: localize('settings.fsbotEcho.hint'),
                config: true,
                scope: "client",
                type: Boolean,
                default: false,
            },
        },
        {
            key: "fsModAllChatMessages",
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