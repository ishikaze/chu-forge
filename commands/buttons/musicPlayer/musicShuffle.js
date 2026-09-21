module.exports = {
    name: "musicShuffle",
    type: "interactionCreate",
    code: `
    $if[false==false;
        $shuffleTracks
        $setServerVar[musicShuffled;true]
        $setServerVar[musicActions;<@$authorID> shuffled the queue]
    ;
        $if[$unshuffleQueue==true;
            $setServerVar[musicShuffled;false]
            $setServerVar[musicActions;<@$authorID> unshuffled the queue]
        ;
            $setServerVar[musicActions;<@$authorID> tried to unshuffle the queue but it failed]
        ]
        
    ]
    $updateMusicMenu[update;$trackInfo[title];$trackInfo[author];$trackInfo[duration];$trackInfo[thumbnail]]
    `
};