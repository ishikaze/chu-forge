module.exports = {
    name: "toggleAllowBafEmojis",
    type: "interactionCreate",
    code: `
    $onlyIf[$or[$hasPerms[$guildID;$authorID;ManageGuild]==true;$authorID==$botOwnerID];]

    $if[$getServerVar[allowBaffEmojis;$guildID;false]==true;
        $setServerVar[allowBaffEmojis;false;$guildID]
    ;
        $setServerVar[allowBaffEmojis;true;$guildID]
    ]

    $updateConfigMenu[update]
    `
};