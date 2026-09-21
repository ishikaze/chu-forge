module.exports = {
    type: "interactionCreate",
    code: `
    $onlyIf[$cropText[$customID;0;3;]==ATQ;]
    $deferUpdate
    $textSplit[$customID;%LINK%]
    $playTrack[$voiceID[$guildID;$authorID];$splitText[1];;;]
    $setServerVar[musicActions;<@$authorID> requested [$searchTrack[$splitText[1];{track.title};;;;1;false]\\]($splitText[1])]
    $if[$getServerVar[justJoined;$guildID;false]==true;
        $setServerVar[justJoined;false]
        $setVolume[$getServerVar[defaultVolume;$guildID;50]]
        $setLoopMode[OFF]
        $playNext
    ]
    $addContainer[
        $addTextDisplay[## ✅ Track added to the queue!]
    ]
    $interactionUpdate
    `
}