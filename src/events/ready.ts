import { ActivityType, Client } from "discord.js";

import { DiscordClient } from "../classes/DiscordClient";
import { DiscordEvent } from "../classes/DiscordEvent";
import _registerSlashCommands from "../classes/RegisterCommands";
import { bold, success } from "../utils/Logger";

export default new DiscordEvent("ready", async (client: Client) => {
  const registerSlashCommands = new _registerSlashCommands();

  registerSlashCommands.execute(client as DiscordClient);

  console.log(
    `[${success(`DISCORD`)}] ${bold(client.user.tag)} is online | ${
      client.guilds.cache.size
    } servers and ${client.users.cache.size} users`
  );

  client.user.setActivity({
    type: ActivityType.Playing,
    name: "Você pode editar indo em src/events/ready.ts!",
  });
});
