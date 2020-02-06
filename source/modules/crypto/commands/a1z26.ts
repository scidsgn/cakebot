import alphabet from "../util/alphabet"
import { Command } from "../../../bot/commands/commands"
import { DocsCommandArgType } from "../../../bot/docs/types"
import { Bot } from "../../../bot"
import { Message } from "discord.js"

function a1z26(
    arr: string[], input: string, out: string
) {
    if (!input.length && out.length)
        return arr.push(out)
    
    if (
        input.length > 1 &&
        /^(1[0-9]|2[0-6]).*/.test(input)
    )
        a1z26(
            arr,
            input.substring(2),
            out + alphabet[
                (+input[0] * 10 + +input[1]) - 1
            ]
        )
    
    if (
        input.length &&
        /^[1-9].*/.test(input)
    )
        a1z26(
            arr,
            input.substring(1),
            out + alphabet[
                +input[0] - 1
            ]
        )
    
    if (
        !/^([1-9]|1[0-9]|2[0-6]).*/.test(input)
    )
        a1z26(
            arr,
            input.substring(1),
            out + input[0]
        )
}

export class A1Z26Command extends Command {
    constructor() {
        super(
            "cmd.crypto.a1z26",
            "a1z26",
            "$str:string",
            {
                description: "Decodes an A1Z26-encoded string of digits",
                parameters: [
                    {
                        name: "str",
                        type: DocsCommandArgType.number,
                        description: "The string of numbers"
                    }
                ]
            }
        )
    }

    async process(
        bot: Bot,
        message: Message,
        args: {
            str: string
        }
    ) {
        let results: string[] = []
        a1z26(results, args.str, "")

        await message.channel.send(
            results.map(s => `\`${s}\``).join(", ")
        )
    }
}