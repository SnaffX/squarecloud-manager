import { Interaction, PermissionResolvable } from "discord.js";
import { CommandProps } from "../types";
import { DiscordClient as Client } from "./DiscordClient";

type Options = {
  name: string;
  userPermissions?: PermissionResolvable[];
  clientPermissions?: PermissionResolvable[];
  data?: any;
};

export class BotCommand {
  execute(options: CommandProps) {
    throw new Error("Method not implemented.");
  }
  autocomplete?(interaction: Interaction) {}
  public config: Options;
  public client: Client;

  constructor(client: Client, options: Options) {
    this.client = client;
    this.config = {
      name: options.name || null,
      userPermissions: options.userPermissions || [],
      clientPermissions: options.clientPermissions || [],
      data: options.data || null,
    };
  }
}
