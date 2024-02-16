import {
  ActionRowBuilder,
  ComponentType,
  EmbedBuilder,
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from "discord.js";
import { randomUUID } from "node:crypto";
import { BotCommand } from "../../../classes/BotCommand";
import { DiscordClient } from "../../../classes/DiscordClient";
import api from "../../../providers/squarecloud";
import { CommandProps } from "../../../types";
import { embedError } from "../../../utils/messages";

export default class pingCommand extends BotCommand {
  constructor(client: DiscordClient) {
    super(client, {
      name: "apps",
      userPermissions: ["AddReactions"],
      clientPermissions: ["SendMessages"],
      data: new SlashCommandBuilder()
        .setName("apps")
        .setDescription("Veja todas as aplicações disponíveis")
        .setDMPermission(false),
    });
  }

  async execute({ interaction, client }: CommandProps): Promise<any> {
    if (!interaction.isCommand()) return;

    await interaction.deferReply({
      ephemeral: true,
    });

    const user = await api.users.get();

    if (!user) {
      return interaction.editReply({
        embeds: [embedError("Você não está registrado na SquareCloud")],
      });
    }

    const applications = user.applications;

    const options = [];

    applications.forEach((application) => {
      options.push(
        new StringSelectMenuOptionBuilder()
          .setLabel(application.tag)
          .setDescription(application.description)
          .setValue(application.id)
          .setEmoji(
            application.language == "typescript"
              ? "1036970731692634153"
              : application.language == "javascript"
              ? "1036970761509945474"
              : application.language == "python"
              ? "1036971035909693470"
              : "🔧"
          )
      );
    });

    const applications_select = new StringSelectMenuBuilder()
      .setCustomId(randomUUID())
      .setPlaceholder("Selecione uma aplicação para mais informações")
      .addOptions(options);

    const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
      applications_select
    );

    const response = await interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`Selecione uma aplicação para ver as informações`)
          .setColor("Blue"),
      ],
      components: [row],
    });

    const collector = response.createMessageComponentCollector({
      componentType: ComponentType.StringSelect,
      time: 60 * 5,
    }); // 5 minutes

    collector.on("collect", async (i) => {
      console.log(applications.find((x) => x.id == i.values[0]));
    });
  }
}
