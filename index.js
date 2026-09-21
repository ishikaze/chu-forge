require("dotenv").config();
const { ForgeClient } = require("@tryforge/forgescript");
const { ForgeDB } = require("@tryforge/forge.db");
const { DefaultExtractors, ForgeMusic, GuildQueueEvent } = require("@tryforge/forge.music");
const fs = require("fs");
const path = require("path");

const youtubei = require("discord-player-youtubei");
const YoutubeExtractor = 
    youtubei.YoutubeExtractor || 
    youtubei.YoutubeiExtractor || 
    youtubei.default || 
    youtubei;

const music = new ForgeMusic({
    events: [
        GuildQueueEvent.AudioTrackAdd,
        GuildQueueEvent.Connection,
        GuildQueueEvent.PlayerError,
        GuildQueueEvent.Error,
        GuildQueueEvent.PlayerStart,
        GuildQueueEvent.PlayerFinish,
        GuildQueueEvent.PlayerTrigger,
        GuildQueueEvent.QueueCreate,
        GuildQueueEvent.QueueDelete,
        GuildQueueEvent.VolumeChange
    ],
    includeExtractors: DefaultExtractors
});

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
    extensions: [new ForgeDB(), music]
});

(async () => {
    try {
        console.log("[INFO] Registering YoutubeExtractor...");
        await music.player.extractors.register(YoutubeExtractor, {
            overrideBridgeMode: "yt",
            streamOptions: {
                useClient: "ANDROID"
            }
        });
        console.log("[SUCCESS] YoutubeExtractor registered successfully!");

        // UNREGISTER SOUNDCLOUD so it stops stealing Spotify bridges THIS SHIT HAD ME STUMPED FOR HOURS IT KEPT PLAYING THE WRONG AUDIO AHHHHHH
        await music.player.extractors.unregister("com.discord-player.soundcloudextractor");
        console.log("[SUCCESS] Unregistered SoundCloud extractor!");

    } catch (err) {
        console.error("[ERROR] Failed in extractor setup:", err);
    }
})();

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
music.commands.load("./music stuff");

client.login(process.env.DISCORD_TOKEN);