import { EmbedBuilder } from "discord.js";

export function embedError(message: string) {
    return new EmbedBuilder().setColor('Red').setDescription(message)
}
export function embedSucess(message: string) {
    return new EmbedBuilder().setColor('Green').setDescription(message)
}