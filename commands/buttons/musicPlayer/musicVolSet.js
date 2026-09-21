module.exports = {
    name: "musicVolNum",
    type: "interactionCreate",
    code: `
    $if[$isButton==true;
        $modal[musicVolNum;Set volume]
        $addTextInput[setTo;Enter a number from 1-100 (%);Short;true;Anything >100 or <1 will get set to the nearest number;;1;3]
    ]
    $elseif[$isModal==true;
        $if[$isNumber[$input[setTo]]==true;
            $let[set;$input[setTo]]
            $if[$get[set]<1;
                $let[set;1]
            ]
            $if[$get[set]>100;
                $let[set;100]
            ]
            $setVolume[$get[set]]
            $setServerVar[musicActions;<@$authorID> set the volume to **$get[set]**]
            $updateMusicMenu[update;$trackInfo[title];$trackInfo[author];$trackInfo[duration];$trackInfo[thumbnail]]
        ]
    ]
    `
};