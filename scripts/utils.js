'use strict';

const MODULE_TITLE = 'Foundry Stream Module',
    MODULE_NAME = 'fsMod',
    DEBUGGING = true,
    TRACE = true,
    CONSOLE_MESSAGE_PRESET = [`%c${MODULE_TITLE} %c|`, 'background: #222; color: #bada55', 'color: #fff'];

function localize(path) {
    return game.i18n.localize(`${MODULE_NAME}.${path}`);
}

export {
    MODULE_TITLE,
    MODULE_NAME,
    localize,
};