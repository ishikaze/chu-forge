const { GuildQueueEvent } = require("@tryforge/forge.music");

module.exports = {
    name: "queue",
    type: GuildQueueEvent.QueueCreate,
    code: `
    $let[toDelete;$sendMessage[$getServerVar[musicChannel;$guildID];Chu is on it!;true]]
    $wait[5000]
    $if[$deleteMessage[$getServerVar[musicChannel;$guildID];$get[toDelete]]!=1;
        error: delmes   
    ]
    $setServerVar[musicShuffled;false]

    $updateMusicMenu[send;$trackInfo[title];$trackInfo[author];$trackInfo[duration];$trackInfo[thumbnail]]
    `
};