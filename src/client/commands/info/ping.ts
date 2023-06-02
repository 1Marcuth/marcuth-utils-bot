import * as discord from "discord.js"

import ICommand from "../../interfaces/command"

export const command: ICommand = {
    name: "ping",
    description: "Envia o ping do bot.",
    type: discord.ApplicationCommandType.ChatInput,
    run: async (interaction) => {
        const client = interaction.client
        const ping = client.ws.ping
        const botAvatarUrl = client.user.displayAvatarURL()
        
        const pingEmbed = new discord.EmbedBuilder()
            .setAuthor({ name: client.user.username, iconURL: botAvatarUrl })
            .setTitle("Ping Bot")
            .setDescription(`Olá ${interaction.user}, meu ping está em \`${ping}\` ms`)
            .setColor("Random")
            .setThumbnail(botAvatarUrl)

        await interaction.reply({ embeds: [ pingEmbed ] })
    }
}