module.exports = {
    name: "musicVolUp",
    type: "interactionCreate",
    code: `
    $setServerVar[defaultVolume;$sub[$getVolume;10]]
    $setVolume[$sum[$getVolume;10]]
    $setServerVar[musicActions;<@$authorID> turned the volume up to **$getVolume%**]
    $updateMusicMenu[update;$trackInfo[title];$trackInfo[author];$trackInfo[duration];$trackInfo[thumbnail]]
    `
};