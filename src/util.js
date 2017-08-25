const moment = require("moment");

let ctx;

try {
    const chalk = require("chalk");

    ctx = new chalk.constructor({enabled:true});
} catch (err) {
    // silent
}

function getTime() {
    return (" " + moment().format("LTS")).slice(-11);
}

module.exports = {
    async log(...args) {
        if (ctx) console.log(getTime(), "|", ctx.grey("[LOG]"), ...args);
        else console.log(getTime(), "|", ...args);
    },
    async warn(...args) {
        if (ctx) console.error(getTime(), "|", ctx.yellow("[WARN]"), ...args);
        else console.error(getTime(), "|", ...args);
    },
    async error(...args) {
        if (ctx) console.error(getTime(), "|", ctx.red("[ERROR]"), ...args);
        else console.error(getTime(), "|", ...args);
    }
};
