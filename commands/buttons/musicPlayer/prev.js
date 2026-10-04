module.exports = {
    name: "musicPrev",
    type: "interactionCreate",
    code: `
    $if[$playerPrevious==true;
        $jsonLoad[data;$playerNextTrack]
        $updateMusicAction[<@$authorID> jumped back from $env[data;title]]
    ]
    
    `
};