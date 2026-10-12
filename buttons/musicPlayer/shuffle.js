module.exports = {
    name: "musicShuffle",
    type: "interactionCreate",
    code: `
    $onlyIf[$playerExists==true;]
    $if[$playerShuffle>0;
        $updateMusicAction[[@$username\\]($userURL[$authorID]) shuffled the queue]
    ]
    
    `
};