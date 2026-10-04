module.exports = {
    name: "join",
    type: "messageCreate",
    code: `
    $onlyIf[$authorID==$botOwnerID;No.]
    
    $if[$playerExists==true;
        $if[$voiceID[$guildID;$authorID]==$voiceID[$guildID;$botID];
            Chu already joined!
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
                    $setServerVar[musicChnSent;0]
                    $setServerVar[musicPlayerChn;]
                    $setServerVar[musicPlayer;]
                    
                    $setServerVar[placeholderTrack;true]
                    $requestTrack[https://youtu.be/EKZNd2JMQPE]
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