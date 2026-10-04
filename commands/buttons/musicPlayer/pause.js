module.exports = {
    name: "musicPause",
    type: "interactionCreate",
    code: `
    $if[$playerIsPaused==true;
        $if[$playerResume==true;
            $updateMusicAction[<@$authorID> resumed the track]
        ]
    ;
        $if[$playerPause==true;
            $updateMusicAction[<@$authorID> paused the track]
        ]
    ]
    
    `
};