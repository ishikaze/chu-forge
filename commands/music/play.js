module.exports = {
    name: "play",
    type: "messageCreate",
    code: `
    $onlyIf[$authorID==$botOwnerID;No.]
    $onlyIf[$message!=;Please provide a song name or link!]
    $let[fail;false]
    $setServerVar[musicChannel;$channelID]

    $if[$hasMusicNode==true;
        $if[$voiceID[$guildID;$authorID]!=$voiceID[$guildID;$botID];
            $let[fail;Chu is already playing music in another voice channel! Please join that channel to add songs to the queue.]
        ]
    ]

   $if[$get[fail]==false;
        $let[defaultVolume;$getServerVar[defaultVolume;$guildID;50]]

        $if[$voiceID[$guildID;$authorID]!=;
            $playTrack[$voiceID[$guildID;$authorID];$message;;;com.discord-player.applemusicextractor]
            $setServerVar[musicActions;<@$authorID> requested [$trackInfo[title]\\]($trackInfo[url])]
            $if[$hasMusicNode==false;$setVolume[$get[defaultVolume]]]
            $if[$getServerVar[justJoined;$guildID;false]==true;
                $setServerVar[justJoined;false]
                $setVolume[$getServerVar[defaultVolume;$guildID;50]]
                $setLoopMode[OFF]
                $playNext
            ]
        ;
            $sendMessage[$channelID;You must be in a voice channel to play music!]
        ]
    ;
        $sendMessage[$channelID;$get[fail]]
    ]
    `
};