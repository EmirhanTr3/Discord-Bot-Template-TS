import bot from './bot';
import { ChatInputCommandInteraction, RESTPostAPIApplicationCommandsJSONBody, ContextMenuCommandInteraction, RESTPostAPIContextMenuApplicationCommandsJSONBody } from 'discord.js';

export default abstract class botCommand {
    public readonly data: RESTPostAPIApplicationCommandsJSONBody
    public readonly cmdata?: RESTPostAPIContextMenuApplicationCommandsJSONBody

    public abstract execute(interaction: ChatInputCommandInteraction, client: bot): Promise<any>
    public async contextExecute(interaction: ContextMenuCommandInteraction, client: bot): Promise<any> {}
    
    constructor(data: RESTPostAPIApplicationCommandsJSONBody, cmdata?: RESTPostAPIContextMenuApplicationCommandsJSONBody){
        this.data = data
        this.cmdata = cmdata
    }
}