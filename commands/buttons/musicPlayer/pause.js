module.exports = {
    name: "musicPause",
    type: "interactionCreate",
    code: `
    $if[$playerIsPaused==true;
        $if[$playerResume==true;
            $updateMusicAction[[@$username\\]($userURL[$authorID]) resumed the track]
        ]
    ;
        $if[$playerPause==true;
            $updateMusicAction[[@$username\\]($userURL[$authorID]) paused the track]
        ]
    ]
    
    `
};