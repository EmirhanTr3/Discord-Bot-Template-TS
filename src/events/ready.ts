import { ActivityType, ActivityOptions } from "discord.js";
import bot from "../structures/bot";
import botCommand from "../structures/botCommand";
import botEvent from "../structures/botEvent";
import { getAllFiles } from "../util/functions";

export default class readyEvent extends botEvent<"ready"> {
    constructor(client: bot){
        super(client, "ready", true)
    }

    public async execute() {

        const commandFiles = getAllFiles("./src/commands")
        for (const file of commandFiles) {
            const command = import(`../.${file}`)
            await command.then((module) => {
                const command = new (module.default)()
                if(command.data) this.client.commands.set(command.data.name, command)
                if(command.cmdata) this.client.contextCommands.set(command.cmdata.name, command)
            })
        }

        console.log(`Logged in to ${this.client.user?.tag}`)

        let presence: ActivityOptions = {name: `${this.client.guilds.cache.size} servers!`, type: ActivityType.Watching} 
        this.client.user?.setPresence({ activities: [presence]})

        setInterval(() => {
            let presence: ActivityOptions = {name: `${this.client.guilds.cache.size} servers!`, type: ActivityType.Watching} 
            this.client.user?.setPresence({activities: [presence]})
        }, 60000)
    }
    
}

//register this event in index.ts, i dont really know how to make a auto registered event
// ima try the eventhandler shit then
//ok
// aspect r u there