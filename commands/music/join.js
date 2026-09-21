module.exports = {
    name: "join",
    type: "messageCreate",
    code: `
    $let[fail;false]
    $setServerVar[musicChannel;$channelID]

    $if[$hasMusicNode==true;
        $clearQueue
        $if[$voiceID[$guildID;$authorID]!=$voiceID[$guildID;$botID];
            $let[fail;Chu is already playing music in another voice channel! Please join that channel to add songs to the queue.]
        ]
    ;
        $setServerVar[justJoined;false]
    ]

   $if[$get[fail]==false;
    $let[track;$randomText[https://youtu.be/EKZNd2JMQPE;https://youtu.be/AASFUtNbLco]]
        $if[$voiceID[$guildID;$authorID]!=;
            $playTrack[$voiceID[$guildID;$authorID];$get[track];;;com.discord-player.applemusicextractor]
            $setServerVar[musicActions;<@$authorID> requested for Chu to join!\n# Welcome to the music player!\nChu is currently playing a waiting track! To get started, click the <:search:1550869659354665050> search icon to search for a song!]
            $setVolume[10]
            $setServerVar[justJoined;true]
            $setLoopMode[TRACK]
        ;
            $sendMessage[$channelID;You must be in a voice channel to play music!]
        ]
    ;
        $sendMessage[$channelID;$get[fail]]
    ]
    `
};