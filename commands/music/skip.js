module.exports = {
    name: "skip",
    type: "messageCreate",
    code: `
    $onlyIf[$authorID==$botOwnerID;No.]
    $if[$skipTrack==true;
        ;
        Failed...
    ]
    `
};