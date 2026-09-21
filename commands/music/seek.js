module.exports = {
    name: "seek",
    type: "messageCreate",
    code: `
    $onlyIf[$authorID==$botOwnerID;No.]
    $if[$seekTrack[$message]==true;
        ;
        Failed...
    ]
    `
};