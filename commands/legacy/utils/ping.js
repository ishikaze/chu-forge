module.exports = {
    type: "messageCreate",
    code: `
    $let[mes;$messageSlice[1]]
    $if[$and[$checkContains[$messageContent[$channelID;$messageID];<@$botID>];$get[mes]==]==true;
        $onlyIf[$getServerVar[pingCooldown;$guildID;0]<$getTimestamp;]

        $let[p;$getUserVar[prefix;$authorID;c!]]
        $addContainer[
            $addSection[
                $addTextDisplay[# Hello!
Chu, at your service!
-# Chu was built to be useful and do fun stuff!\n-# Running v0.3 (2569.10.5.08)]
                $addThumbnail[https://cdn.discordapp.com/attachments/1455724628843430033/1551637900016357386/image_cropped.png]
            ]
            $addSeparator[Large;true]

            $addTextDisplay[## Prefixes
For now, Chu uses legacy commands!
Default prefix: \`c!\`
Custom prefix for this server: \`$getGuildVar[prefix;$guildID;c!]\`
Custom prefix for you: \`$getUserVar[prefix;$authorID;c!]\`
-# Tip: Set your prefix with \`c!prefix <new prefix>\`]
            
            $addSeparator[Small;true]

            $addTextDisplay[## Available commands]
            $addTextDisplay[### 🎶 Music
$get[p]join, $get[p]join
(All other music functions are available on the player)]

            $addTextDisplay[### 🔧 Configuration
$get[p]prefix $get[p]config]
        ]

        $setServerVar[pingCooldown;$sum[$getTimestamp;60000]]
    ]
    `
}