import dotenv from "dotenv"

dotenv.config()

const bot = {
    name: "Marcuth Utils",
    description: "Um bot de utilitários!",
    commands: {
        prefix: "/",
        optionsSeparator: ":"
    },
    token: process.env.BOT_TOKEN,
    admin: {
        id: process.env.ADMIN_ID
    },
    application: {
        id: process.env.APPLICATION_ID,
        publicKey: process.env.APPLICATION_PUBLIC_KEY
    },
    webhook: {
        id: "",
        token: "",
        url: "",
        avatarUrl: ""
    }
}

export { bot }