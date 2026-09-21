module.exports = {
    type: "messageCreate",
    code: `
    $let[mes;$messageSlice[1]]
    $if[$and[$checkContains[$messageContent[$channelID;$messageID];<@1447615755985227776>];$get[mes]==]==true;
        $title[Hi!!!!]
        $addField[About;Chu is a bot made to do fun stuff. Chu is in BETA, bug reporting available soon.\nChu is actively being developed on. If you are actively using Chu and Chu suddenly pauses, please give Chu a moment! Chu promises to not go down often!]
        $addField[Prefixes;Default prefix: \`c!\`
Custom prefix for this server: \`$getGuildVar[prefix;$guildID;c!]\`
Custom prefix for you: \`$getUserVar[prefix;$authorID;c!]\`
-# Set your prefix with \`c!prefix <new prefix>\`]
        $addField[Available commands;$commandNames[messageCreate;, ]\n-# The list of commands above were auto generated, some commands may not be finished or usable.]
    ]
    `
}