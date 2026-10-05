require("dotenv").config();
const { ForgeClient } = require("@tryforge/forgescript");
const { ForgeDB } = require("@tryforge/forge.db");
const { ForgeLinked } = require("@tryforge/forge.linked");
const { ForgeJSON } = require("forge.json");
const { ForgeCanvas } = require("@tryforge/forge.canvas");
const fs = require("fs");
const path = require("path");
const express = require("express");

// ─── 1. USER TRACKING (Unique Command/Interaction Users) ─────────────
const USERS_FILE = path.join(__dirname, "bot_users.json");
let botUsers = new Set();

// Load existing user IDs if the file exists
if (fs.existsSync(USERS_FILE)) {
  try {
    const data = JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
    botUsers = new Set(data);
  } catch (err) {
    console.error("Failed to load bot_users.json:", err);
  }
}

// Helper to save user IDs
function recordUser(userId) {
  if (!userId || botUsers.has(userId)) return;
  botUsers.add(userId);
  fs.writeFile(USERS_FILE, JSON.stringify([...botUsers]), (err) => {
    if (err) console.error("Error saving bot user:", err);
  });
}

// ─── 2. LAVALINK CONFIGURATION ──────────────────────────────────────
const lavalink = new ForgeLinked({
  nodes: [
    {
      id: "kazelavalink",
      host: "lavalink.ishikaze.space",
      port: 443,
      authorization: "301204Hb!",
      secure: true
    }
  ],
  playerOptions: {
    defaultSearchPlatform: "youtube"
  },
  events: ["linkedPlayerCreate", "linkedPlayerDestroy"]
});

// ─── 3. FORGE CLIENT INITIALIZATION ─────────────────────────────────
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

// ─── 4. LISTENERS TO TRACK BOT USAGE ────────────────────────────────
client.on("messageCreate", (message) => {
  if (message.author?.bot) return;

  // Check if message starts with any prefix or mention
  const hasPrefix =
    message.content.startsWith("c!") ||
    message.content.startsWith("<@1447615755985227776>") ||
    message.content.startsWith("<@!1447615755985227776>");

  if (hasPrefix) {
    recordUser(message.author.id);
  }
});

client.on("interactionCreate", (interaction) => {
  if (interaction.user?.bot) return;
  recordUser(interaction.user.id);
});

// ─── 5. FUNCTIONS & COMMANDS LOADER ─────────────────────────────────
const functionsPath = path.join(__dirname, "functions");

if (fs.existsSync(functionsPath)) {
  const functionFiles = fs.readdirSync(functionsPath).filter((file) => file.endsWith(".js"));

  for (const file of functionFiles) {
    const customFunction = require(`./functions/${file}`);
    client.functions.add(customFunction);
  }

  console.log(`Loaded ${functionFiles.length} custom functions.`);
}

client.commands.load("./commands");

// ─── 6. HELPER FOR ACTIVE NODELINK PLAYERS ─────────────────────────
function getActivePlayersCount() {
  // Access the underlying lavalink-client manager players map
  const players = lavalink.manager?.players || lavalink.players;
  if (!players) return 0;

  if (typeof players.size === "number") {
    // Count players that are connected or actively playing
    let active = 0;
    for (const player of players.values()) {
      if (player.connected || player.playing) active++;
    }
    return active;
  }
  return 0;
}

// ─── 7. EXPRESS API ENDPOINT ────────────────────────────────────────
const app = express();
const API_PORT = process.env.API_PORT || 3003;

app.get("/api/stats", (req, res) => {
  // Optional: add a secret token check
  // if (req.headers.authorization !== `Bearer ${process.env.API_SECRET}`) {
  //   return res.status(401).json({ error: "Unauthorized" });
  // }

  const stats = {
    guilds: client.guilds?.cache?.size || 0,
    activePlayers: getActivePlayersCount(),
    // Unique users who have run a command/interaction:
    totalUsedUsers: botUsers.size,
    // Total members across all guilds (reach):
    totalServerMembers: client.guilds?.cache?.reduce(
      (acc, g) => acc + (g.memberCount || 0),
      0
    ) || 0
  };

  res.json(stats);
});

app.listen(API_PORT, () => {
  console.log(`API endpoint running on http://localhost:${API_PORT}/api/stats`);
});

// ─── 8. LOGIN ───────────────────────────────────────────────────────
client.login(process.env.DISCORD_TOKEN);