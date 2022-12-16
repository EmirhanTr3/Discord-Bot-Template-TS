import { Client, ClientOptions, Collection } from "discord.js";
import botCommand from "./botCommand";

export default class bot extends Client {
    commands: Collection<string, botCommand>
    contextCommands: Collection<string, botCommand>
    
    constructor(options: ClientOptions){
        super(options)
        this.commands = new Collection()
        this.contextCommands = new Collection()
    }
}