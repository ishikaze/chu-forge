const { GuildQueueEvent } = require("@tryforge/forge.music");

module.exports = {
    name: "queue",
    type: GuildQueueEvent.QueueDelete,
    code: `
    $if[$deleteMessage[$getServerVar[musicChannel];$getServerVar[playingMessage]]!=1;
        $sendMessage[$getServerVar[musicChannel];Couldn't delete the player...]
    ]

    $setServerVar[playingMessage;;$guildID]
    $setServerVar[musicChannel;;$guildID]
    `
};