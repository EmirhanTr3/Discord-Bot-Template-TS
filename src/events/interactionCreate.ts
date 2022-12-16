import { Interaction, CommandInteraction } from "discord.js"
import bot from "../structures/bot"
import botEvent from "../structures/botEvent"

export default class interactionCreate extends botEvent<"interactionCreate"> {
    constructor(client: bot){
        super(client, "interactionCreate")
    }

    public async execute(interaction: Interaction){
        if (interaction.isCommand() && interaction.isChatInputCommand()){
            const command = this.client.commands.get(interaction.commandName)
            if (!command) return
            try {
                await command.execute(interaction, this.client)
            } catch(error) {
                handleError(interaction, error)
            }
        }else if (interaction.isCommand() && interaction.isContextMenuCommand()){
            const command = this.client.contextCommands.get(interaction.commandName)
            if (!command) return
            try {
                if (command.contextExecute) await command.contextExecute(interaction, this.client)
            } catch(error) {
                handleError(interaction, error)
            }
        }
    }
}

function handleError(interaction: CommandInteraction, error: any){
    let message = "There was an error while executing this command!"
    console.error(error)
    if (interaction.replied) return interaction.followUp({content: message})
    if (interaction.deferred) return interaction.editReply({content: message})
    return interaction.reply({content: message, ephemeral: true})
}