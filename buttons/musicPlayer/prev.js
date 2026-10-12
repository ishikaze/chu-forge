module.exports = {
    name: "musicPrev",
    type: "interactionCreate",
    code: `
    $onlyIf[$playerExists==true;]
    $if[$playerPrevious==true;
        $jsonLoad[data;$playerNextTrack]
        $updateMusicAction[[@$username\\]($userURL[$authorID]) jumped back from $env[data;title]]
    ]
    
    `
};