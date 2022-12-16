import bot from "./structures/bot"
import { GatewayIntentBits, Partials } from "discord.js"
import { token } from "./config.json"

const client = new bot({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.User
    ]
})

import("./util/eventHandler").then(module => module.registerEvents(client))

process.on("uncaughtException", (error) => console.log(error))

client.login(token)