module.exports = {
  name: "updateConfigMenu",
  params: [
    {
      name: "type",
      required: true
    }
  ],
  code: `
    $if[$env[type]==send;
        $sendMessage[$channelID;
            $addContainer[
                $addTextDisplay[## Config Menu]
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
            ]
        ]
    ;
        $addContainer[
            $addTextDisplay[## Config Menu]
            $addSeparator[Large;true]

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

            ;#5865F2
        ]

        $interactionUpdate
    ]
  `
};