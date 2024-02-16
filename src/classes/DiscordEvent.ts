import { ClientEvents } from "discord.js";

export class DiscordEvent<Key extends keyof ClientEvents> {
  constructor(
    public event: Key,
    public execute: (...args: ClientEvents[Key]) => any
  ) {}
}
