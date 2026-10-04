module.exports = {
    name: "musicShuffle",
    type: "interactionCreate",
    code: `
    $if[$playerShuffle>0;
        $updateMusicAction[[@$username\\]($userURL[$authorID]) shuffled the queue]
    ]
    
    `
};