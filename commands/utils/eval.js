module.exports = {
    name: "eval",
    type: "messageCreate",
    code: `
    $onlyIf[$authorID==$botOwnerID;No.]
    $eval[$message;false]
    `
}