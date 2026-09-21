module.exports = {
    name: "shuffle",
    type: "messageCreate",
    code: `
    $onlyIf[$authorID==$botOwnerID;No.]
    $shuffleTracks
    `
};