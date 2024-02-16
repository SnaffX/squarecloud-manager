import { DiscordClient } from "./classes/DiscordClient";

export const client = new DiscordClient({
  intents: ["Guilds"],
});

client.start({
  token: process.env.token,
});
