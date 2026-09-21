module.exports = {
    name: "musicPause",
    type: "interactionCreate",
    code: `
    $if[$pauseTrack==true;
        $updateMusicMenu[update;$trackInfo[title];$trackInfo[author];$trackInfo[duration];$trackInfo[thumbnail]]  
    ]
    `
};