module.exports = {
    name: "volume",
    type: "messageCreate",
    code: `
    $onlyIf[$authorID==$botOwnerID;No.]
    $onlyIf[$isNumber[$message]==true;Please provide a valid number.]
    $onlyIf[$and[$message>=0;$message<=200]==true;Please provide a number between 0 and 200.]

    $setServerVar[defaultVolume;$message]
    $setVolume[$message]
    `
};