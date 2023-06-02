import * as discord from "discord.js"

import ICommand from "../../interfaces/command"

type Iterable_ = any[] | string

function generatePassword(
    length: number,
    allowUpperLetters: boolean,
    allowDigits: boolean,
    allowSpecialCharacters: boolean
) {
    const letters = {
        lower: "abcdefghijklmnopqrstuvwxyz",
        upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    }
    const digits = "0123456789"
    const specialCharacters = "^!$%&|/\\[](){}:;.,*+-#@<>~"

    let characters = `${letters.lower}`

    if (allowUpperLetters) characters += letters.upper
    if (allowDigits) characters += digits
    if (allowSpecialCharacters) characters += specialCharacters

    function choices(iterable: Iterable_, length: number) {
        let results = []

        for (let i = 0; i < length; i++) {
            const result = choice(iterable)
            results.push(result)
        }

        function choice(iterable: Iterable_) {
            const randomIndex = Math.floor(Math.random()  * iterable.length)
            return iterable[randomIndex]
        }

        return results
    }

    const results = choices(characters, length)
    const password = results.join("")

    return password
}

export const command: ICommand = {
    name: "gen-pwd",
    description: "Gera uma forte senha baseando-se em escolha pseudo-aleatória.",
    type: discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "length",
            description: "Tamanho da senha a ser gerada.",
            type: discord.ApplicationCommandOptionType.Integer,
            required: true
        },
        {
            name: "allow-upper-letters",
            description: "Se é permitido ou não letras maiúsculas.",
            type: discord.ApplicationCommandOptionType.Boolean,
            required: false
        },
        {
            name: "allow-digits",
            description: "Se é permitido ou não dígitos.",
            type: discord.ApplicationCommandOptionType.Boolean,
            required: false
        },
        {
            name: "allow-special-characters",
            description: "Se é permitido ou não caracteres especiais.",
            type: discord.ApplicationCommandOptionType.Boolean,
            required: false
        }
    ],
    run: async (interaction) => {
        const client = interaction.client
        const botAvatarUrl = client.user.displayAvatarURL()

        const length = interaction.options.get("length")?.value as number
        const allowUpperLetters = interaction.options.get("allow-upper-letters")?.value ? true : false
        const allowDigits = interaction.options.get("allow-digits")?.value ? true : false
        const allowSpecialCharacters = interaction.options.get("allow-special-characters")?.value ? true : false

        const password = generatePassword(
            length,
            allowUpperLetters,
            allowDigits,
            allowSpecialCharacters
        )
        
        const passwordEmbed = new discord.EmbedBuilder()
            .setAuthor({ name: client.user.username, iconURL: botAvatarUrl })
            .setTitle("Gerador de senhas")
            .setDescription(`### Sua senha foi gerada!\n\n**Sua senha gerada foi:** \`${password}\`.`)
            .setColor("Random")
            .setThumbnail(botAvatarUrl)

        await interaction.reply({ embeds: [ passwordEmbed ] })
    }
}