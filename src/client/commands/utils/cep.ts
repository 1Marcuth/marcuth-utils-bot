import * as discord from "discord.js"
import consultCep from "cep-promise"

import ICommand from "../../interfaces/command"

export const command: ICommand = {
    name: "cep",
    description: "Faz uma consulta de CEP.",
    options: [
        {
            name: "cep",
            description: "CEP a ser consultado",
            type: discord.ApplicationCommandOptionType.String,
            required: true
        }
    ],
    type: discord.ApplicationCommandType.ChatInput,
    run: async (interaction) => {
        const client = interaction.client
        const cep = interaction.options.get("cep")?.value as string
        const botAvatarUrl = client.user.displayAvatarURL()

        await interaction.deferReply()

        try {
            const data: { [key: string]: any } = await consultCep(cep)

            for (const key in data) {
                if (!data[key]) {
                    data[key] = "DESCONHECIDO"
                }
            }
        
            const cepEmbed = new discord.EmbedBuilder()
                .setAuthor({ name: client.user.username, iconURL: botAvatarUrl })
                .setTitle("Consulta de CEP")
                .setDescription(`### Dados do CEP\n\n- **CEP:** ${cep}\n- **Estado:** ${data.state}\n- **Cidade:** ${data.city}\n- **Bairro:** ${data.neighborhood}\n- **Rua:** ${data.street}\n- **Serviço:** ${data.service}`)
                .setColor("Random")
                .setThumbnail(botAvatarUrl)

            await interaction.editReply({ embeds: [ cepEmbed ] })
        } catch(error: any) {
            console.log(error)

            const errorEmbed = new discord.EmbedBuilder()
                .setAuthor({ name: client.user.username, iconURL: botAvatarUrl })
                .setTitle("Consulta de CEP")
                .setDescription(`Ocorreu um erro ao tentar consultar o CEP '${cep}'! Cheque o CEP inserido e tente novamente mais tarde!\n**Error:** \`\`\`${error.message}\`\`\``)
                .setColor("Red")
                .setThumbnail(botAvatarUrl)

            await interaction.editReply({ embeds: [ errorEmbed ] })
        }
    }
}