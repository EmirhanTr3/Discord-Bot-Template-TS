import bot from "./bot"
import { ClientEvents } from "discord.js"

export default abstract class botEvent<T extends EventName> {
    public readonly client: bot
    once: boolean
    eventName: EventName
    public abstract execute(...args: ClientEvents[T]): Promise<any>

    constructor(client: bot, eventName: EventName, once: boolean=false) {
        this.client = client
        this.eventName = eventName
        this.once = once
    }
}

export type EventName = keyof ClientEvents

export type EventListener<T extends EventName> = (client: bot, ...args: ClientEvents[T]) => void

export interface IBotEvent<T extends EventName> {
	eventName: T;
	once?: boolean;
	run: EventListener<T>;
}