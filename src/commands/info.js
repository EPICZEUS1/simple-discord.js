const Command = require("../command.js");

class Info extends Command {
    constructor(client) {
        super(client, {
            name: "info",
            type: "general",
            description: "Displays info about the specified command.",
            use: [
                ["command or alias", true]
            ],
            aliases: [
                "help"
            ]
        });

        this.default = true;
    }

    run(message, args = [""]) {
        const cmdFile = this.client.commands.get(args[0].toLowerCase()) || this.client.commands.get(this.client.aliases.get(args[0].toLowerCase()));

        if (!cmdFile) return this.client.utils.warn(`${args[0]} is not a valid command name or alias.`);

        const howTo = cmdFile.use ? cmdFile.use.map(use => use[1] ? `<${use[0]}>` : `[${use[0]}]`).join(" ") : "";
        const use = this.client.prefix ? `${this.client.prefix}${cmdFile.name} ${howTo}` : `${howTo ? `${howTo} ` : ""}${cmdFile.name}${this.client.suffix}`;

        const description = `${cmdFile.description}\n\n**Usage**\n${use}\n\n**Aliases**\n${cmdFile.aliases && cmdFile.aliases.length ? `\`${cmdFile.aliases.join("`, `")}\`` : "None"}`;

        return (!this.client.user.bot ? message.edit.bind(message) : message.channel.send.bind(message.channel))({embed: {
            title: cmdFile.name.replace(/^./, l => l.toUpperCase()),
            description,
            footer: {
                text: "<> - required, [] - optional"
            },
            color: 0x4d68cc
        }}).catch(this.client.utils.error);
    }
}

module.exports = Info;
