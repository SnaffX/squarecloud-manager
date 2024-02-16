import { CommandInteraction } from "discord.js";
import { client as Client } from "../";

export interface BotOptions {
  token: string;
}

export interface CommandProps {
  interaction: CommandInteraction;
  client: typeof Client;
}
