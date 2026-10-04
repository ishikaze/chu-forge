module.exports = {
    name: "musicLoop",
    type: "interactionCreate",
    code: `
    $if[$playerLoopStatus==off;
        $if[$playerToggleLoop[$guildID;TRACK]==true;
            $updateMusicAction[[@$username\\]($userURL[$authorID]) toggled loop mode to: **Track**]
        ]
    ;
        $if[$playerLoopStatus==track;
            $if[$playerToggleLoop[$guildID;QUEUE]==true;
                $updateMusicAction[[@$username\\]($userURL[$authorID]) toggled loop mode to: **Queue**]
            ]
        ;
            $if[$playerLoopStatus==queue;
                $if[$playerToggleLoop[$guildID;OFF]==true;
                    $updateMusicAction[[@$username\\]($userURL[$authorID]) toggled loop mode **off**]
                ]
            ]
        ]
    ]
    `
};