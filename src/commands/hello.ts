import { SlashCommandBuilder, ChatInputCommandInteraction, ContextMenuCommandBuilder, ContextMenuCommandInteraction } from "discord.js"
import botCommand from "../structures/botCommand";

export default class hello extends botCommand {
    constructor(){
        super(
            new SlashCommandBuilder()
                .setName("hello")
                .setDescription("Replies with \"Hello!\"")
            .toJSON(),
            
            new ContextMenuCommandBuilder()
                .setName("Hello")
                // 2 = User Context Menu Command
                // 3 = Message Context Menu Command
                .setType(2)
        )
    }

    public async execute(interaction: ChatInputCommandInteraction){
        interaction.reply({content: "Hello!", ephemeral: true})
    }

    public async contextExecute(interaction: ContextMenuCommandInteraction) {
        interaction.reply({content: "Hello from the context command!", ephemeral: true})
    }

}