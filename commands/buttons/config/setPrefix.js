module.exports = {
    type: "interactionCreate",
    code: `
    $onlyIf[$cropText[$customID;0;9;]==setPrefix;]
    $textSplit[$customID;_BUFFER_]
    $onlyIf[$splitText[3]==$authorID;$customID]
    $if[$splitText[1]==user;
        $setUserVar[prefix;$getUserVar[prefixBuffer]]
        Set prefix to \`$getUserVar[prefix]\` for you!
        $interactionUpdate
    ;
        $setUserVar[prefix;$getUserVar[prefixBuffer]]
        Set prefix to \`$getUserVar[prefix]\` for this server!
        $interactionUpdate
    ]
    `
}