import { SlashCommandBuilder } from "discord.js";
import { BotCommand } from "../../../classes/BotCommand";
import { DiscordClient } from "../../../classes/DiscordClient";
import { CommandProps } from "../../../types";

export default class pingCommand extends BotCommand {
  constructor(client: DiscordClient) {
    super(client, {
      name: "ping",
      userPermissions: ["SendMessages"],
      clientPermissions: ["SendMessages"],
      data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Veja minha conexão")
        .setDMPermission(false),
    });
  }

  async execute({ interaction, client }: CommandProps): Promise<any> {
    if (!interaction.isCommand()) return;

    await interaction.deferReply({
      ephemeral: true,
    });

    return interaction.editReply({
      content: `${client.ws.ping}`,
    });
  }
}
