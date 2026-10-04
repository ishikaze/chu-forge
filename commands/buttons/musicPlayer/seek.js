module.exports = {
    name: "musicSeek",
    type: "interactionCreate",
    code: `
    $if[$isButton==true;
        $modal[musicSeek;Seek to a position]
        $let[seconds;$round[$divide[$playerElapsedTime;1000];1]]
        $addTextInput[position;Enter position in seconds;Short;true;Enter a number representing the position in seconds;$get[seconds];1;10]
    ;
        $deferUpdate
        $if[$playerSeek[$guildId;$multi[$input[position];1000]]==true;
            $updateMusicAction[[@$username\\]($userURL[$authorID]) seeked to $input[position] seconds]
        ]
    ]
    
    `
};