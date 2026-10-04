module.exports = {
    name: "musicShuffle",
    type: "interactionCreate",
    code: `
    $if[$playerShuffle>0;
        $updateMusicAction[<@$authorID> shuffled the queue]
    ]
    
    `
};