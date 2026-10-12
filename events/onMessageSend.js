module.exports = {
    type: "messageCreate",
    code: `
        $if[$and[$channelID==$getServerVar[musicPlayerChn];$authorID!=$botID]==true;
            $setServerVar[musicChnSent;$sum[$getServerVar[musicChnSent;$guildID;0];1]]
        ]
    `
}