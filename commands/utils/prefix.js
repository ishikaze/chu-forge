module.exports = {
    name: "prefix",
    type: "messageCreate",
    code: `
    $onlyIf[$message!=;Ping Chu for the prefixes!]
    $setUserVar[prefixBuffer;$message]
    You would like to set the prefix to \`$getUserVar[prefixBuffer]\` for where?
    $addActionRow
    $addButton[setPrefix_BUFFER_user_BUFFER_$getUserVar[prefixBuffer]_BUFFER_$authorID;For myself;Primary]
    $if[$hasPerms[$guildID;$authorID;ManageGuild]==true;
        $addButton[setPrefix_BUFFER_guild_BUFFER_$getUserVar[prefixBuffer]_BUFFER_$authorID;For this server;Secondary]
    ;
        $addButton[setPrefix_BUFFER_guild_BUFFER_$getUserVar[prefixBuffer]_BUFFER_$authorID;For this server;Secondary;;true]
    ]
    `
};