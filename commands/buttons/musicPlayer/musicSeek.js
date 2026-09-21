module.exports = {
    name: "musicSeek",
    type: "interactionCreate",
    code: `
    $if[$isButton==true;
        $modal[musicSeek;Seek track]
        $addTextInput[seekTo;Enter time to seek to in the track...;Short;true;Example: 10s, 3m30s, 1h2m10s]
    ]
    $elseif[$isModal==true;
        $if[$seekTrack[$input[seekTo]]==true;
            $setServerVar[musicActions;<@$authorID> seeked to $input[seekTo]]
            $updateMusicMenu[update;$trackInfo[title];$trackInfo[author];$trackInfo[duration];$trackInfo[thumbnail]]
        ;
            $interactionReply[
                $ephemeral
                ❌ Error seeking, maybe you input an invalid value or out of bounds time value?
            ]
        ]
    ]
    `
};