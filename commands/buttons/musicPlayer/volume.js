module.exports = {
    name: "musicSetVol",
    type: "interactionCreate",
    code: `
    $if[$isButton==true;
        $modal[musicSetVol;Set volume]
        $addTextInput[v;Enter volume percentage;Short;true;Enter a number from 1 to 100;$playerGetVolume;1;3]
    ;
        $onlyIf[$isNumber[$input[v]]==true;$interactionReply[$ephemeral NAN]]
        $let[volume;$input[v]]

        $if[$get[volume]>100;
            $let[volume;100]
        ]
        $if[$get[volume]<1;
            $let[volume;1]
        ]

        $setServerVar[defaultVolume;$get[volume]]

        $if[$playerSetVolume[$guildID;$get[volume]]==true;
            $updateMusicAction[[@$username\\]($userURL[$authorID]) set the volume to $get[volume]]
        ]
    ]
    
    `
};