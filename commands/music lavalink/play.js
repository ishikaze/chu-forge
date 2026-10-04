module.exports = {
    name: "play",
    type: "messageCreate",
    code: `   
    $if[$playerExists==true;
        $if[$voiceID[$guildID;$authorID]==$voiceID[$guildID;$botID];
            Chu already joined! Please use the <:search:1550869659354665050> search button to request a new track.
        ;
            Chu is already in another VC...
        ]
    ;
        $if[$voiceID[$guildID;$authorID]==;
            You're not in a vc...
        ;
            $if[$playerCreate[$guildID;$voiceID;$channelID;10;false;false]==true;
                $if[$playerJoinVC==true;
                    $try[
                        $if[$deleteMessage[$getServerVar[musicPlayerChn];$getServerVar[musicPlayer]]==1;]
                    ]
                    $if[$playerSetVolume[$guildID;$getServerVar[defaultVolume;$guildID;50]]==true;]
                    $setServerVar[musicChnSent;0]
                    $setServerVar[musicPlayerChn;]
                    $setServerVar[musicPlayer;]

                    $requestTrack[$message]
                ;
                    Couldn't join the VC, did you leave?
                ]
            ;
                Couldn't create the player...
            ]
        ]
    ]
    `
};