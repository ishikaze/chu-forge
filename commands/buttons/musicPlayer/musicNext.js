module.exports = {
    name: "musicNext",
    type: "interactionCreate",
    code: `
    $setServerVar[musicActions;<@$authorID> skippied **$trackInfo[title]**]
    $playNext
    $wait[1000]
    $updateMusicMenu[update;$trackInfo[title];$trackInfo[author];$trackInfo[duration];$trackInfo[thumbnail]]
    `
};