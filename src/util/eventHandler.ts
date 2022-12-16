import bot from '../structures/bot'
import { getAllFiles } from './functions'
import fs from "fs"

export async function registerEvents(client: bot){
    // i have 128372163 files open i can auto import these cuz i alr have it open
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
    // console.log(event.once)
}

//reload
//breh
// its worse lol
// both undefined

// nope ready still doesnt run
// if i log eventname its undefined
//could u just use nodemon?
// no idk if it will even work cuz i have autosave
//then disable autosave / no.
//ok



//i forgot its not auto reload
// lol still both undefined

// bruh look the console
// there is no eventname or other shit
//i cant half of it is cut off
/*

class readyEvent extends botEvent_1.default {
    constructor(client) {
        super(client, "ready", true);
        this.commands = [];
    }
    async execute() {
        const commandFiles = (0, functions_1.getAllFiles)("./src/commands");
        for (const file of commandFiles) {
            const command = Promise.resolve().then(() => __importStar(require(`../.${file}`)));
            command.then((module) => {
                const command = module.default;
                if (command.data)
                    this.client.commands.set(command.data.name, command);
            });
        }
        console.log(`Logged in to ${this.client.user?.tag}`);
        let presence = { name: `${this.client.guilds.cache.size} servers!`, type: discord_js_1.ActivityType.Watching };
        this.client.user?.setPresence({ activities: [presence] });
        setInterval(() => {
            let presence = { name: `${this.client.guilds.cache.size} servers!`, type: discord_js_1.ActivityType.Watching };
            this.client.user?.setPresence({ activities: [presence] });
        }, 60000);
    }
}


this is the log
did tojson work / lemme see
nope its not a function

*/


//back / look discord or nvm
// ok so event.eventName is the class name not the event name wait ok
// also event.once doesnt exist well yeah bcs its op
// but still its set to true so its not supposed to be undefined 