module.exports = {
    type: "messageCreate",
    code: `
        $if[$channelID==$getServerVar[musicPlayerChn];
            $setServerVar[musicChnSent;$sum[$getServerVar[musicChnSent;$guildID;0];1]]
        ]
    `
}