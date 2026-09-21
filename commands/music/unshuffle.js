module.exports = {
    name: "unshuffle",
    type: "messageCreate",
    code: `
    $onlyIf[$authorID==$botOwnerID;No.]
    $unshuffleQueue
    `
};