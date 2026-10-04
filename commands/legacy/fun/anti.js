module.exports = {
    name: "anti",
    type: "messageCreate",
    code: `
    $onlyIf[$authorID==$botOwnerID;No.]
    $if[$seekTrack[$message]==true;
        ;
        Failed...
    ]
    `
};