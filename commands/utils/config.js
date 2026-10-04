module.exports = {
    name: "config",
    type: "messageCreate",
    code: `
    $onlyIf[$or[$hasPerms[$guildID;$authorID;ManageGuild]==true;$authorID==$botOwnerID];You need at least the \`Manage Server\` permission to use this command.]

    $updateConfigMenu[send]
    `
};