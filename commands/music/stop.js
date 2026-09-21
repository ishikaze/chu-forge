module.exports = {
    name: "stop",
    type: "messageCreate",
    code: `
    $onlyIf[$authorID==$botOwnerID;No.]
    $deleteQueue
    $if[$deleteMessage[$getServerVar[musicChannel];$getServerVar[playingMessage]]!=1;
        $sendMessage[$getServerVar[musicChannel];Couldn't delete the player...]
    ]

    $setServerVar[playingMessage;;$guildID]
    $setServerVar[musicChannel;;$guildID]
    `
};