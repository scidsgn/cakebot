import { Bot } from "../../bot";
import { Command } from "../../bot/commands/commands";
import { Message, TextChannel } from "discord.js";
import { IConversationHandler, IConversationHandlerCtor } from "../../bot/conversation";
import { HangmanGame } from "./games/hangman";

let gamesChannel: TextChannel

type GameDescription = {
    name: string,
    description: string,
    handler: IConversationHandlerCtor
}

const games: GameDescription[] = [
    {
        name: "hangman",
        description: "Hangman i guess",
        handler: HangmanGame
    }
]

class GamesCommand extends Command {
    constructor() {
        super(
            "cmd.games.games",
            "games",
            ""
        )
    }

    async process(
        bot: Bot, message: Message,
        args: {}
    ) {
        if (message.channel.id !== gamesChannel.id) return

        const gameList = games.map(
            game => `- \`$game ${game.name}\` - ${game.description}`
        ).join("\n")

        await message.channel.send(
            `Let's play a *game*!\n${gameList}`
        )
    }
}

class GameCommand extends Command {
    constructor() {
        super(
            "cmd.games.game",
            "game",
            "$name?:string"
        )
    }

    async process(
        bot: Bot, message: Message,
        args: {
            name?: string
        }
    ) {
        if (message.channel.id !== gamesChannel.id) return
        if (!args.name) return

        let game = games.find(g => g.name === args.name.toLowerCase())
        if (!game) return

        bot.startConversation(
            message.channel as TextChannel, message.author,
            new game.handler()
        )
    }
}

class ExitGameCommand extends Command {
    constructor() {
        super(
            "cmd.games.exitgame",
            "exitgame",
            ""
        )
    }

    async process(
        bot: Bot, message: Message,
        args: {}
    ) {
        bot.endConversation(
            message.channel as TextChannel, message.author
        )
    }
}

export async function handler(bot: Bot) {
    gamesChannel = await bot.getMarkedChannel("gamesChannel") as TextChannel

    bot.addCommand(
        new GamesCommand(),
        new GameCommand(),
        new ExitGameCommand()
    )
}