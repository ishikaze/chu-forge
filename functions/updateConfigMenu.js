module.exports = {
  name: "updateConfigMenu",
  params: [
    {
      name: "type",
      required: true
    }
  ],
  code: `
    $if[$djsEval[ctx.container.components = [\\]]==;]$if[$djsEval[ctx.container.components = [\\]]==;]
    
    $if[$getUserVar[configPage;$authorID;1]==1;
        $let[composed;
            $addContainer[
                $addTextDisplay[## Config Menu - Fun]
                $addSeparator[Small;true]

                $addSection[
                    $addTextDisplay[**Random reactions**\n-# Chu will react with random emojis to messages in the server.]
                    $if[$getServerVar[randomReactionsEnabled;$guildID;false]==true;
                        $addButton[toggleRandomReactions;Enabled;Success]
                    ;
                        $addButton[toggleRandomReactions;Disabled;Secondary]
                    ]
                ]
                $addSeparator[Small;false]

                $addSection[
                    $addTextDisplay[**Random reactions chance**\n-# Chance for Chu to react with random emojis to messages in the server, click to change.]
                    $if[$getServerVar[randomReactionsChance;$guildID;5]>0;
                        $addButton[updateRandomReactionsChance;$getServerVar[randomReactionsChance;$guildID;5]%;Success]
                    ;
                        $addButton[updateRandomReactionsChance;0%;Secondary]
                    ]
                ]
                $addSeparator[Small;false]

                $addSection[
                    $addTextDisplay[**Allow BAF emojis**\n-# Chu will react with random emojis from my friend group server. Warning: May contain funnies.]
                    $if[$getServerVar[allowBaffEmojis;$guildID;false]==true;
                        $addButton[toggleAllowBafEmojis;Enabled;Success]
                    ;
                        $addButton[toggleAllowBafEmojis;Disabled;Secondary]
                    ]
                ]
                $addSeparator[Small;false]

                $addSection[
                    $addTextDisplay[**Say hi!**\n-# Chu will say hi to people every time they say I'm ...!\n-# Example: I'm hungry -> Hi hungry, I'm Chu!]
                    $if[$getServerVar[allowSayHi;$guildID;false]==true;
                        $addButton[toggleAllowSayHi;Enabled;Success]
                    ;
                        $addButton[toggleAllowSayHi;Disabled;Secondary]
                    ]
                ]
                $addSeparator[Small;false]
            ]
        ]
    ]
    
    $if[$getUserVar[configPage;$authorID;1]==2;
        $let[composed;
            $addContainer[
                $addTextDisplay[## Config Menu - Bot]
                $addSeparator[Small;true]

                $addSection[
                    $addTextDisplay[**Bot profile**\n-# Customize Chu's profile on this server!]
                    $addButton[updateBotProfile;Update Profile;Success]
                ]

                $addSeparator[Small;false]
            ]
        ]
    ]
    
    $addActionRow
    $addStringSelectMenu[configPage;Switch page;false;1;1;true]
    $addOption[Page 1;Fun;1]
    $addOption[Page 2;Bot;2]

    $if[$env[type]==send;
        $let[mes;$sendMessage[$channelID;$get[composed];true]]
        $setMessageVar[author;$authorID;$get[mes]]
    ;
        $get[composed]
        $interactionUpdate
    ]
  `
};