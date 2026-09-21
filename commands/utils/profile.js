module.exports = {
    name: "profile",
    type: "messageCreate",
    code: `
    $title[$username[$authorID]'s profile]
    $thumbnail[$userAvatar[$authorID]]
    $description[
Tokens: $getUserVar[token;$authorID]
Tickets: $getUserVar[ticket;$authorID]
Cheese: $getUserVar[cheese;$authorID]
        
Level: 0 ($getUserVar[xp;$authorID])

-# Data version: $getUserVar[init;$authorID;0]
    ]
    `
}