module.exports = {
    name: "musicPlay",
    type: "interactionCreate",
    code: `
    $if[$resumeTrack==true;
        $updateMusicMenu[update;$trackInfo[title];$trackInfo[author];$trackInfo[duration];$trackInfo[thumbnail]]
    ]
    `
};