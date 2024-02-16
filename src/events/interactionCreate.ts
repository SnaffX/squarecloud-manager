import { client } from "..";

import { BotCommand } from "../classes/BotCommand";
import { DiscordEvent } from "../classes/DiscordEvent";
import { embedError } from "../utils/messages";

export default new DiscordEvent("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    const command: BotCommand = client.commands.get(interaction.commandName);

    if (!command || !command.config.name) return;

    try {
      if (!interaction.memberPermissions.has(command.config.userPermissions))
        return interaction.reply({
          ephemeral: true,
          content: `Você precisa da permissão: **${command.config.userPermissions
            .map((x) => x)
            .join(" ")}** para utilizar esse comando`,
        });

      return command.execute({ interaction, client });
    } catch (err) {
      console.log(err);

      return interaction.reply({
        embeds: [embedError("Ocorreu um erro ao executar esse comando" + err)],
        ephemeral: true,
      });
    }
  }
});
