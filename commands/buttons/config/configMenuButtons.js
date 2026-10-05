module.exports = {
    type: "interactionCreate",
    code: `
    $onlyIf[$getMessageVar[author;$messageID]==$authorID;]

    $if[$customID==toggleAllowBafEmojis;
        $onlyIf[$or[$hasPerms[$guildID;$authorID;ManageGuild]==true;$authorID==$botOwnerID];]

        $if[$getServerVar[allowBaffEmojis;$guildID;false]==true;
            $setServerVar[allowBaffEmojis;false;$guildID]
        ;
            $setServerVar[allowBaffEmojis;true;$guildID]
        ]

        $updateConfigMenu[update]
    ]

    $if[$customID==toggleRandomReactions;
        $onlyIf[$or[$hasPerms[$guildID;$authorID;ManageGuild]==true;$authorID==$botOwnerID];]

        $if[$getServerVar[randomReactionsEnabled;$guildID;false]==true;
            $setServerVar[randomReactionsEnabled;false;$guildID]
        ;
            $setServerVar[randomReactionsEnabled;true;$guildID]
        ]

        $updateConfigMenu[update]
    ]

    $if[$customID==updateRandomReactionsChance;
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
    ]

    $if[$customID==toggleAllowSayHi;
        $onlyIf[$or[$hasPerms[$guildID;$authorID;ManageGuild]==true;$authorID==$botOwnerID];]

        $if[$getServerVar[allowSayHi;$guildID;false]==true;
            $setServerVar[allowSayHi;false;$guildID]
        ;
            $setServerVar[allowSayHi;true;$guildID]
        ]

        $updateConfigMenu[update]
    ]
    
    `
};