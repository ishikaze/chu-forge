module.exports = {
    type: "messageCreate",
    code: `
    
    $if[$getUserVar[init;$authorID;0]<1;
        $setUserVar[token;0;$authorID]
        $setUserVar[ticket;0;$authorID]
        $setUserVar[cheese;0;$authorID]
        $setUserVar[xp;0;$authorID]
        $setUserVar[commands;0;$authorID]

        $setUserVar[init;1;$authorID]
    ]
    `
}