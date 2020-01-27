import { Command } from "../../bot/commands/commands";
import { Bot } from "../../bot";
import { Message, Attachment } from "discord.js";
import { Image } from "../../bot/graphics/image";
import { fxGrayscale, fxInvert } from "../../bot/graphics/shader";
import { IArgType } from "../../bot/commands/arguments";
import { Rectangle } from "../../bot/ui/components/rectangle";
import { UnboundedTextComponent, UnboundedText } from "../../bot/ui/components/unboundedText"
import { renderComponent } from "../../bot/ui";
import { LinearGradient } from "../../bot/ui/fill";
import { pronounTemplate } from "../../bot/util/pronouns";

class UITestCommand extends Command {
    constructor() {
        super(
            "cmd.test.ui",
            "ui",
            ""
        )
    }

    async process(
        bot: Bot,
        message: Message,
        args: {}
    ) {
        let uiDefinition = Rectangle(
            332, 232,
            [
                UnboundedText(
                    "Welcome to the"
                )
                    .fill("#000"),
                UnboundedText(
                    "Bold Guess Club"
                )
                    .fill("red")
            ]
        ).fill("#ddd")

        let buf = renderComponent(uiDefinition)

        let attachment = new Attachment(buf)
        await message.channel.send(attachment)
    }
}

export class PronounTestCommand extends Command {
    constructor() {
        super(
            "cmd.test.pronoun",
            "pronoun",
            ""
        )
    }

    async process(
        bot: Bot,
        message: Message,
        args: {}
    ) {
        let p = pronounTemplate(message.member)

        await message.channel.send(
            p`Ah yeah, ${message.member.displayName}. They must exist, right?`
        )
    }
}

export async function handler(bot: Bot) {
    bot.addCommand(
        new UITestCommand(),
        new PronounTestCommand()
    )
    console.log(2)
}