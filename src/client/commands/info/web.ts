import * as discord from "discord.js"

import ICommand from "../../interfaces/command"

export const command: ICommand = {
    name: "web",
    description: "Envia o website oficial de ferramentas no qual o bot foi inspirado.",
    type: discord.ApplicationCommandType.ChatInput,
    run: async (interaction) => {
        const client = interaction.client
        const ping = client.ws.ping
        const botAvatarUrl = client.user.displayAvatarURL()
        
        const websiteEmbed = new discord.EmbedBuilder()
            .setAuthor({ name: client.user.username, iconURL: botAvatarUrl })
            .setTitle("Website")
            .setDescription(`Opa, o meu website está em: https://marcuth-utils.vercel.app/`)
            .setColor("Random")
            .setThumbnail(botAvatarUrl)

        await interaction.reply({ embeds: [ websiteEmbed ] })
    }
}