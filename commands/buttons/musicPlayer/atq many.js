module.exports = {
    type: "interactionCreate",
    code: `
    $textSplit[$customID;__&&&SEP__]

    $if[$splitText[0]==musicATQMany;
        $interactionUpdate[$addTextDisplay[Adding tracks...]]
       $jsonLoad[data;$playerSearchTrack[$guildID;$splitText[1]]]
        $if[$env[data;status]==success;
            $setUserVar[addingTracks;true]
            $loop[$env[data;trackCount];
                $let[q;$env[data;tracks;$sub[$env[i];1];url]]
                $jsonLoad[yuh;$playerAddTrack[$guildID;$get[q]]]
                $setUserVar[addingTracksProgress;$env[i]]
                $setUserVar[addingTracksMax;$env[data;trackCount]]
            ;i;true]
            $setUserVar[addingTracks;false]
        ;
            $addTextDisplay[# ❌ Track search failed: $env[data;message]]
        ]
        $if[$getServerVar[placeholderTrack;$guildID;false]==true;
            $if[$playerSkip==true;
                $updateMusicAction[Player auto-skipped a placeholder track]
                $setServerVar[placeholderTrack;false]
                $if[$playerSetVolume[$guildID;$getServerVar[defaultVolume;$guildID;50]]==true;]
            ]
        ]
        $addTextDisplay[✅ Added **$env[data;trackCount] tracks** to the queue!]
        $interactionUpdate
    ]
    `
};