module.exports = {
    name: "musicNext",
    type: "interactionCreate",
    code: `
    $if[$playerSkipExists==true;
        $if[$playerSkip==true;
            $jsonLoad[data;$playerPreviousTrack]
            $updateMusicAction[<@$authorID> Skipped $env[data;title]]
        ]
    ;
        $if[$playerStop[$guildId;false]==true;]
        $jsonLoad[data;$playerPreviousTrack]
        $updateMusicAction[<@$authorID> Skipped $env[data;title]]
    ]
    `
};