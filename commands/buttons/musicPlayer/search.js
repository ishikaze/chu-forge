module.exports = {
    name: "musicSearch",
    type: "interactionCreate",
    code: `
    $if[$playerExists==true;
        $if[$isButton==true;
            $modal[musicSearch;Track search]
            $addTextInput[q;Enter query or a direct link;Short;true]
        ]
        $if[$isStringSelectMenu==true;
            $ephemeral
            $setUserVar[preferedSearchEngine;$selectMenuValues[0]]
            $addTextDisplay[✅ Set your prefered search engine to: **$selectMenuValues[0]**]
            $interactionUpdate
        ]
        $if[$isModal==true;
            $try[
                $if[$getUserVar[preferedSearchEngine;$authorID;none]==none;
                    $setUserVar[preferedSearchEngine;youtube]
                ;
                    $interactionReply[$ephemeral ## 🔍 Please wait...]
                    $ephemeral
                    $if[$isValidLink[$input[q]]==true;
                        $if[$checkContains[$input[q];playlist;album]==true;
                            $jsonLoad[data;$playerSearchTrack[$guildID;$input[q];;;10]]
                            $if[$env[data;status]==success;
                                $addTextDisplay[# 🔍 Search results ($env[data;trackCount]/10 found)]
                                $loop[$env[data;trackCount];
                                    $addSeparator[Small;true]
                                    $addTextDisplay[$env[data;tracks;$sub[$env[i];1];title]\n-# by $env[data;tracks;$sub[$env[i];1];author]]
                                ;i;true]
                                $addSeparator[Small;true]
                                $if[$env[data;trackCount]==10;
                                    $addTextDisplay[### MAX PLAYLIST PREVIEW REACHED\nThe bot cannot preview anymore tracks, but you can still add the whole playlist to queue!]
                                ]
                                $addActionRow
                                $addButton[musicATQMany__&&&SEP__$input[q];Add playlist to queue;Primary]
                            ;
                                $addTextDisplay[# ❌ Track search failed: $env[data;message]]
                            ]
                        ;
                            $jsonLoad[data;$playerSearchTrack[$guildID;$input[q]]]
                            $setUserVar[searchBuffer;$input[q]]
                            $if[$env[data;status]==success;
                                $addTextDisplay[# 🔍 Search results ($env[data;trackCount] found)]
                                $loop[$env[data;trackCount];
                                    $addSeparator[Small;true]
                                    $addSection[
                                        $addTextDisplay[[$env[data;tracks;$sub[$env[i];1];title]\\]($env[data;tracks;$sub[$env[i];1];url])\n-# by $env[data;tracks;$sub[$env[i];1];author]]
                                        $addThumbnail[$env[data;tracks;$sub[$env[i];1];thumbnail]]
                                    ]
                                    $addSeparator[Small;true]
                                    $addTextDisplay[If this is a playlist, please click "This is a playlist" because the bot did not detect this as an album/ep/playlist]
                                    $addActionRow
                                    $addButton[musicATQ__&&&SEP__$input[q];Add this to queue;Primary]
                                    $addButton[musicATQMany__&&&SEP__$input[q];This is a playlist;Primary]
                                ;i;true]
                            ;
                                $addTextDisplay[# ❌ Track search failed: $env[data;message]]
                            ]
                        ]
                    ;
                        $jsonLoad[data;$playerSearchTrack[$guildID;$input[q];$getUserVar[preferedSearchEngine;$authorID;youtube];$authorID;5]]
                        $if[$env[data;status]==success;
                            $addTextDisplay[### 🔍 Search results ($env[data;trackCount]/5 found)]
                            $loop[$env[data;trackCount];
                                $addSeparator[Small;true]
                                $addSection[
                                    $addTextDisplay[[$env[data;tracks;$sub[$env[i];1];title]\\]($env[data;tracks;$sub[$env[i];1];url])\n-# by $env[data;tracks;$sub[$env[i];1];author]]
                                    $addThumbnail[$env[data;tracks;$sub[$env[i];1];thumbnail]]
                                ]
                                $addActionRow
                                $addButton[musicATQ__&&&SEP__$env[data;tracks;$sub[$env[i];1];url];Add this to queue;Primary]
                            ;i;true]
                        ;
                            $addTextDisplay[### ❌ Track search failed: $env[data;message]]
                        ]
                    ]

                    $addSeparator[Small;true]
                    $addActionRow
                    $addStringSelectMenu[musicSearch;Results from $toTitleCase[$getUserVar[preferedSearchEngine;$authorID;youtube]];false;1;1;true]
                    $addOption[YouTube;Includes video results;youtube]
                    $addOption[Spotify;Spotify results, music only;spotify]
                ]
            ;
                $interactionReply[$ephemeral ## ❌ Error searching: $env[err]]
            ;err]
        ]
    ]
    `
};