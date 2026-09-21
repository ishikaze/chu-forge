module.exports = {
    name: "musicLoop",
    type: "interactionCreate",
    code: `
    $if[$getLoopMode==OFF;
        $setLoopMode[TRACK]
        $setServerVar[musicActions;<@$authorID> toggled loop mode to **looping this track**]
    ;
        $if[$getLoopMode==TRACK;
            $setLoopMode[QUEUE]
            $setServerVar[musicActions;<@$authorID> toggled loop mode to **looping this queue**]
        ;
            $if[$getLoopMode==QUEUE;
                $setLoopMode[AUTOPLAY]
                $setServerVar[musicActions;<@$authorID> started **autoplay**.]
            ;
                $if[$getLoopMode==AUTOPLAY;
                    $setLoopMode[OFF]
                    $setServerVar[musicActions;<@$authorID> turned off autoplay]
                ]
            ]
        ]
    ]
    $updateMusicMenu[update;$trackInfo[title];$trackInfo[author];$trackInfo[duration];$trackInfo[thumbnail]]  
    `
};