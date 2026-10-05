require("dotenv").config();
const { ForgeClient } = require("@tryforge/forgescript");
const { ForgeDB } = require("@tryforge/forge.db");
const { ForgeLinked } = require('@tryforge/forge.linked')
const { ForgeJSON } = require("forge.json")
const { ForgeCanvas } = require("@tryforge/forge.canvas")
const fs = require("fs");
const path = require("path");

const lavalink = new ForgeLinked({
  nodes: [
    {
      id: "kazelavalink",
      host: "lavalink.ishikaze.space",   // or your VPS IP/domain
      port: 443,
      authorization: "301204Hb!", // ✅ must be 'authorization'
      secure: true
    }
  ],
  playerOptions: {
    defaultSearchPlatform: "youtube"
  },
  events: ['linkedPlayerCreate', 'linkedPlayerDestroy']
})


const client = new ForgeClient({
  intents: [
    "Guilds",
    "GuildMembers",
    "GuildModeration",
    "GuildEmojisAndStickers",
    "GuildIntegrations",
    "GuildWebhooks",
    "GuildInvites",
    "GuildVoiceStates",
    "GuildPresences",
    "GuildMessages",
    "GuildMessageReactions",
    "GuildMessageTyping",
    "DirectMessages",
    "DirectMessageReactions",
    "DirectMessageTyping",
    "MessageContent",
    "GuildScheduledEvents",
    "AutoModerationConfiguration",
    "AutoModerationExecution",
    "GuildMessagePolls",
    "DirectMessagePolls"
  ],
  events: ["messageCreate", "clientReady", "interactionCreate"],
  prefixes: [
    "c!",
    "$getGuildVar[prefix;$guildID;c!]",
    "$getUserVar[prefix;$authorID;c!]",
    "<@1447615755985227776> ",
    "<@!1447615755985227776> "
  ],
  allowBots: true,
  extensions: [new ForgeDB(), lavalink, new ForgeJSON(), new ForgeCanvas()]
});

const functionsPath = path.join(__dirname, "functions");

if (fs.existsSync(functionsPath)) {
  const functionFiles = fs.readdirSync(functionsPath).filter(file => file.endsWith(".js"));

  for (const file of functionFiles) {
    const customFunction = require(`./functions/${file}`);
    client.functions.add(customFunction);
  }

  console.log(`Loaded ${functionFiles.length} custom functions.`);
}


client.commands.load("./commands");

client.login(process.env.DISCORD_TOKEN);