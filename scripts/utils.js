'use strict';

const MODULE_TITLE = 'Foundry Stream Module',
    MODULE_NAME = 'fsMod',
    // determines if we should display debug
    DEBUGGING = true,
    // Determines if the debug should have a trace history
    TRACE = true,
    // A colored titled displayed before every console message
    CONSOLE_MESSAGE_PRESET = [`%c${MODULE_TITLE} %c|`, 'background: #222; color: #bada55', 'color: #fff'];

function consoleTrace(...output) {
    console.groupCollapsed(...CONSOLE_MESSAGE_PRESET, ...output);
    console.trace();
    console.groupEnd();
}


function consoleLog(...output) {
    console.log(...CONSOLE_MESSAGE_PRESET, ...output);
}

function log(...output) {
    if (!DEBUGGING) return;
    return TRACE ? consoleTrace(...output) : consoleLog(...output);
}

function localize(path) {
    return game.i18n.localize(`${MODULE_NAME}.${path}`);
}

export {
    MODULE_TITLE,
    MODULE_NAME,
    log,
    localize,
};