module.exports = {
    name: "musicVolDown",
    type: "interactionCreate",
    code: `
    $setServerVar[defaultVolume;$sub[$getVolume;10]]
    $setVolume[$sub[$getVolume;10]]
    $setServerVar[musicActions;<@$authorID> turned the volume down to **$getVolume%**]
    $updateMusicMenu[update;$trackInfo[title];$trackInfo[author];$trackInfo[duration];$trackInfo[thumbnail]]
    `
};