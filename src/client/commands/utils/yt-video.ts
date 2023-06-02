import * as discord from "discord.js"

import ICommand from "../../interfaces/command"

export const command: ICommand = {
    name: "yt-video",
    description: "Envia um link para baixar qualquer vídeo do YouTube",
    type: discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "url",
            description: "URL do vídeo a ser baixado.",
            type: discord.ApplicationCommandOptionType.String,
            required: true
        }
    ],
    run: async (interaction) => {
        const client = interaction.client
        const botAvatarUrl = client.user.displayAvatarURL()

        const url = interaction.options.get("url")?.value as string
        const apiUrl = `https://marcuth-utils-api.fly.dev/scraping/youtube/video/file/?url=${url}`
        
        const videoEmbed = new discord.EmbedBuilder()
            .setAuthor({ name: client.user.username, iconURL: botAvatarUrl })
            .setTitle("YT Downloader - Vídeo")
            .setDescription(`Baixe seu vídeo aqui: [Clique aqui para baixar!](${apiUrl})`)
            .setColor("Random")
            .setThumbnail(botAvatarUrl)

        await interaction.reply({ embeds: [ videoEmbed ] })
    }
}