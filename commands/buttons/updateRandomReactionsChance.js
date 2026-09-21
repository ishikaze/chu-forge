module.exports = {
    name: "updateRandomReactionsChance",
    type: "interactionCreate",
    code: `
    $onlyIf[$or[$hasPerms[$guildID;$authorID;ManageGuild]==true;$authorID==$botOwnerID];]

    $if[$isModal==false;
        $modal[updateRandomReactionsChance;Update random reactions chance]
        $addTextInput[chanceInput;Chance (%);Short;true;Enter a value between 0 and 100;$getServerVar[randomReactionsChance;$guildID;5];0;3]
    ;
        $setServerVar[randomReactionsChance;$input[chanceInput];$guildID]

        $if[$input[chanceInput]<1;
            $setServerVar[randomReactionsEnabled;false;$guildID]
        ;
            $setServerVar[randomReactionsEnabled;true;$guildID]
        ]

        $updateConfigMenu[update]
    ]


    `
}