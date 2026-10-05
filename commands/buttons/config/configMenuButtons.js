module.exports = {
    type: "interactionCreate",
    code: `
    $onlyIf[$getMessageVar[author;$messageID]==$authorID;]

    $if[$customID==configPage;
        $setUserVar[configPage;$selectMenuValues[0]]
        $updateConfigMenu[update]
    ]

    $if[$customID==goToConfig;
        $updateConfigMenu[update]
    ]

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

    $if[$customID==updateBotProfile;
        $onlyIf[$or[$hasPerms[$guildID;$authorID;ManageGuild]==true;$authorID==$botOwnerID];]

        $if[$nickname[$guildID;$botID]==;
            $let[name;$username[$botID]]
        ;
            $let[name;$nickname[$guildID;$botID]]
        ]

        $addContainer[
            $addTextDisplay[## Customize Chu's profile]
            $addSeparator[Small;true]

            $addTextDisplay[### Bot nickname\nCurrent: $get[name]]
            $addActionRow
            $addButton[updateBotNickname;Update Nickname;Success]

            $addSection[
                $addTextDisplay[### Bot avatar]
                $addThumbnail[$memberAvatar[$guildID;$botID];Current avatar]
            ]
            $addActionRow
            $addButton[updateBotAvatar;Update Avatar;Success]

            $addTextDisplay[### Bot banner]
            $if[$memberBanner[$guildID;$botID]==;
                $addTextDisplay[No banner set]
            ;
                $addMediaGallery[
                    $addMediaItem[$memberBanner[$guildID;$botID];Current banner]
                ]
            ]
            $addActionRow
            $addButton[updateBotBanner;Update Banner;Success]

            $addSeparator[Small;true]
            $addActionRow
            $addButton[goToConfig;Go back to config;Secondary]
            $addButton[resetBotProfile;Reset Profile;Danger]
        ]
        $interactionUpdate
    ]

    $if[$customID==updateBotNickname;
        $if[$nickname[$guildID;$botID]==;
            $let[name;$username[$botID]]
        ;
            $let[name;$nickname[$guildID;$botID]]
        ]

        $if[$isButton==true;
            $modal[updateBotNickname;Update bot name]
            $addTextInput[value;Enter a new name;Short;true;;$get[name];1;32]
        ;
            $ephemeral
            $if[$memberSetNickname[$guildID;$botID;$input[value]]==true;
                $addContainer[
                    $addTextDisplay[✅ Set the bot's nickname to "$input[value]"]
                ]
            ;
                $addContainer[
                    $addTextDisplay[❌ Failed to set the bot's nickname. Chu may not have perms to manage her own nickname...]
                ]
            ]
        ]
    ]

    $if[$customID==updateBotAvatar;
        $if[$isButton==true;
            $modal[updateBotAvatar;Update bot avatar]
            $addLabel[Upload a new avatar;;
                $addFileUpload[value;1;1;true]
            ]
        ;
            $ephemeral
            $if[$setBotGuildAvatar[$guildID;$input[value]]==true;
                $addContainer[
                    $addTextDisplay[✅ Set the bot's avatar]
                ]
            ;
                $addContainer[
                    $addTextDisplay[❌ Failed to set the bot's avatar. Chu may not have perms to manage her own avatar...]
                ]
            ]
        ]
    ]

    $if[$customID==updateBotBanner;
        $if[$isButton==true;
            $modal[updateBotBanner;Update bot banner]
            $addLabel[Upload a new banner;;
                $addFileUpload[value;1;1;true]
            ]
        ;
            $ephemeral
            $if[$setBotGuildBanner[$guildID;$input[value]]==true;
                $addContainer[
                    $addTextDisplay[✅ Set the bot's banner]
                ]
            ;
                $addContainer[
                    $addTextDisplay[❌ Failed to set the bot's banner. Chu may not have perms to manage her own banner...]
                ]
            ]
        ]
    ]

    $if[$customID==resetBotProfile;
        $if[$isButton==true;
            $modal[resetBotProfile;Reset bot profile]
            $addLabel[Are you sure?;This action can't be undone.;
                $addRadioGroup[value;true]
                $addRadioOption[Yes;yes;Reset the bot's profile]
                $addRadioOption[No;no;Do not reset.;true]
            ]
        ;
            $ephemeral
            $if[$toLowerCase[$input[value]]==yes;
                $let[resetMes;⏳ Resetting the bot's profile, please wait...]
                $addTextDisplay[$get[resetMes]]
                $interactionUpdate

                $if[$memberSetNickname[$guildID;$botID;$username[$botID]]==true;
                    $let[resetMes;$get[resetMes]\n✅ Reset the bot's nickname]
                    $addTextDisplay[$get[resetMes]]
                ;
                    $let[resetMes;$get[resetMes]\n❌ Failed to reset the bot's nickname. Chu may not have perms to manage her own nickname...]
                    $addTextDisplay[$get[resetMes]]
                ]
                $interactionUpdate

                $if[$setBotGuildAvatar[$guildID;$userAvatar[$botID]]==true;
                    $let[resetMes;$get[resetMes]\n✅ Reset the bot's avatar]
                    $addTextDisplay[$get[resetMes]]
                ;
                    $let[resetMes;$get[resetMes]\n❌ Failed to reset the bot's avatar. Chu may not have perms to manage her own avatar...]
                    $addTextDisplay[$get[resetMes]]
                ]
                $interactionUpdate

                $if[$setBotGuildBanner[$guildID;$userBanner[$botID]]==true;
                    $let[resetMes;$get[resetMes]\n✅ Reset the bot's banner]
                    $addTextDisplay[$get[resetMes]]
                ;
                    $let[resetMes;$get[resetMes]\n❌ Failed to reset the bot's banner. Chu may not have perms to manage her own banner...]
                    $addTextDisplay[$get[resetMes]]
                ]
                $interactionUpdate
            ;
                $addContainer[
                    $addTextDisplay[✅ No changes were made.]
                ]
            ]
        ]
    ]

    `
};