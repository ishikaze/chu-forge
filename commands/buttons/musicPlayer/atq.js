module.exports = {
    type: "interactionCreate",
    code: `
    $textSplit[$customID;__&&&SEP__]

    $if[$splitText[0]==musicATQ;
        $jsonLoad[data;$playerSearchTrack[$guildID;$splitText[1]]]
        
        $if[$isValidJSON[$playerAddTrack[$guildID;$env[data;tracks;0;url]]]==true;]

        $setServerVar[latestRequestData;$jsonStringify[data]]
        $if[$playerSetVolume[$guildID;10]==true;]
        $if[$getServerVar[placeholderTrack;$guildID;false]==true;
            $if[$playerSkip==true;
                $updateMusicAction[Player auto-skipped a placeholder track]
                $setServerVar[placeholderTrack;false]
                $if[$playerSetVolume[$guildID;$getServerVar[defaultVolume;$guildID;50]]==true;]
            ]
        ]
        $addTextDisplay[✅ Added [$env[data;tracks;0;title]\\]($env[data;tracks;0;url]) to the queue!]
        $interactionUpdate
    ]
    `
};