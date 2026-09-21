module.exports = {
    name: "musicPrev",
    type: "interactionCreate",
    code: `
    $setServerVar[musicActions;<@$authorID> skippied **$trackInfo[title]** (To previous)]
    $playPrevious
    $wait[1000]
    $updateMusicMenu[update;$trackInfo[title];$trackInfo[author];$trackInfo[duration];$trackInfo[thumbnail]]
    `
};