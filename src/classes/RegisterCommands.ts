import { REST, Routes } from "discord.js";
import { readdirSync } from "fs";
import path, { sep } from "path";
import { bold, error, getTime, info, success } from "../utils/Logger";
import { DiscordClient } from "./DiscordClient";

export default class _registerSlashCommands {
  public async execute(client: DiscordClient) {
    const rest = new REST({ version: "10" }).setToken(client.token);

    const dir = path.join(__dirname, "../commands/slashCommands");
    const commands: any[] = [];

    readdirSync(dir).forEach(async (dirs) => {
      const files = readdirSync(`${dir}${sep}${dirs}${sep}`).filter(
        (files) => files.endsWith(".ts") || files.endsWith(".js")
      );

      for (const file of files) {
        try {
          const requireSlashCommand = await import(`${dir}/${dirs}/${file}`);
          const slashCommand = new requireSlashCommand.default(client);

          client.commands.set(slashCommand.config.name, slashCommand);

          commands.push(slashCommand.config.data.toJSON());

          console.log(
            `[${info("SLASH COMMANDS")}] ${getTime(
              new Date()
            )} > Loading command ${bold(slashCommand.config.name)}`
          );
        } catch (err) {
          console.log(
            `[${error("SLASH COMMANDS")}] ${getTime(
              new Date()
            )} > Error in load command ${file}`,
            err
          );
        }
      }
    });

    try {
      setTimeout(async () => {
        await rest
          .put(Routes.applicationCommands(client.user.id), {
            body: commands,
          })
          .then(() => {
            console.log(
              `[${success("SLASH COMMANDS")}] ${getTime(
                new Date()
              )} > Commands registred with success`
            );
          });
      }, 2 * 1000);
    } catch (err) {
      console.log(error(err));
      process.exit(1);
    }
  }
}
