import bot from '../structures/bot'
import { getAllFiles } from './functions'
import fs from "fs"

export async function registerEvents(client: bot){
    const events = getAllFiles('./src/events')
    const registerStartedAt = new Date().getTime()
    var registeredEvents = []
    for (const file of events){
        await registerEvent(client, `../.${file}`)
        registeredEvents.push(file)
    }
    console.log(`Successfully registered ${registeredEvents.length} events! (${new Date().getTime() - registerStartedAt}ms)`)
}

async function registerEvent(client: bot, path: fs.PathLike){
    import(`${path}`).then((module) => {
        const event = new (module.default)(client)
        if (event.once){
            client.once(event.eventName, async (...args) => {
                event.execute(...args)
            })
        }else{
            client.on(event.eventName, async (...args) => {
                event.execute(...args)
            })
        }
    })
}