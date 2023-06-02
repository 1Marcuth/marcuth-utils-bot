import * as discord from "discord.js"
import axios from "axios"

import ICommand from "../../interfaces/command"

export const command: ICommand = {
    name: "short-url",
    description: "Encurta uma URL longa.",
    options: [
        {
            name: "url",
            description: "URL a ser encurtada.",
            type: discord.ApplicationCommandOptionType.String,
            required: true
        }
    ],
    type: discord.ApplicationCommandType.ChatInput,
    run: async (interaction) => {
        const client = interaction.client
        const url = interaction.options.get("url")?.value as string
        const botAvatarUrl = client.user.displayAvatarURL()

        await interaction.deferReply()

        try {
            const apiUrl = `https://cdpt.in/shorten?url=${url}`
            const response = await axios.get(apiUrl)
            const shortedUrl = response.data
        
            const cepEmbed = new discord.EmbedBuilder()
                .setAuthor({ name: client.user.username, iconURL: botAvatarUrl })
                .setTitle("Encurtador de URL")
                .setDescription(`Sua URL curta criada foi: ${shortedUrl}`)
                .setColor("Random")
                .setThumbnail(botAvatarUrl)

            await interaction.editReply({ embeds: [ cepEmbed ] })
        } catch(error: any) {
            console.log(error)

            const errorEmbed = new discord.EmbedBuilder()
                .setAuthor({ name: client.user.username, iconURL: botAvatarUrl })
                .setTitle("Encurtador de URL")
                .setDescription(`Ocorreu um erro ao tentar encurtar a URL '${url}'! Cheque o formato da url inserida e tente novamente mais tarde!\n**Error:** \`\`\`${error.message}\`\`\``)
                .setColor("Red")
                .setThumbnail(botAvatarUrl)

            await interaction.editReply({ embeds: [ errorEmbed ] })
        }
    }
}