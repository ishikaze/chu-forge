module.exports = {
    type: "messageCreate",
    code: `
    $onlyIf[$dmChannelID[$authorID]!=$channelID;]
    $onlyIf[$getUserVar[reactCooldown]<$getTimestamp;]
    $onlyIf[$getServerVar[randomReactionsEnabled;$guildID;false]==true;]

    $let[emojis;$guildEmojis[$guildID; ]]

    $if[$getServerVar[allowBaffEmojis;$guildid;false]==true;
        $let[emojis;$get[emojis] $guildEmojis[1131915328083984384; ]]
    ]

    $textSplit[$get[emojis]; ]

    $let[e;$splitText[$randomNumber[2;$getSplitTextLength]]]
    $let[roll;$randomNumber[1;100]]

    $if[$authorID==570470307748380673; $c[ishi]
        $letSub[roll;0]
    ]

    $if[$authorID==500537270940598283; $c[yuiko]
        $letSub[roll;50]
    ]

    $if[$get[roll]<=$getServerVar[randomReactionsChance;$guildID;5];
        $let[success;$addMessageReactions[$channelID;$messageID;$get[e]]]
        $if[$get[success]==1;
            ; $sendMessage[1547530969286967356;error reacting to $username on $guildName[$guildID];false]
        ]
        $setUserVar[reactCooldown;$sum[$getTimestamp;10000]]
    ]
    
    `
}