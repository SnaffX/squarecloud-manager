import { Client, ClientEvents, ClientOptions, Collection } from "discord.js";
import fs from "node:fs";
import path from "node:path";

import { BotOptions } from "../types";

import { bold, getTime, info } from "../utils/Logger";
import { BotCommand } from "./BotCommand";
import { DiscordEvent } from "./DiscordEvent";

export class DiscordClient extends Client {
  public commands = new Collection<string, BotCommand>();
  public aliases = new Collection<string, string>();

  constructor(options: ClientOptions) {
    super(options);
    this.commands = new Collection();
    this.aliases = new Collection();
  }

  async start(options: BotOptions) {
    this.loadEvents(path.join(__dirname, "../events"));
    this.login(options.token);
  }

  async loadEvents(path: string): Promise<void> {
    const eventsFolder = fs.readdirSync(path);

    eventsFolder.forEach(async (fileEvent) => {
      const event: DiscordEvent<keyof ClientEvents> = (
        await import(`${path}/${fileEvent}`)
      )?.default;

      console.log(
        `[${info("EVENTS")}] ${getTime(new Date())} > Loading event '${bold(
          event.event
        )}'`
      );

      this.on(event.event, event.execute);
    });
  }
}
