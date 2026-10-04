module.exports = {
    name: "toggleRandomReactions",
    type: "interactionCreate",
    code: `
    $onlyIf[$or[$hasPerms[$guildID;$authorID;ManageGuild]==true;$authorID==$botOwnerID];]

    $if[$getServerVar[randomReactionsEnabled;$guildID;false]==true;
        $setServerVar[randomReactionsEnabled;false;$guildID]
    ;
        $setServerVar[randomReactionsEnabled;true;$guildID]
    ]

    $updateConfigMenu[update]
    `
};