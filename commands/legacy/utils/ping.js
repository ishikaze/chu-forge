module.exports = {
    type: "messageCreate",
    code: `
    $let[mes;$messageSlice[1]]
    $if[$and[$checkContains[$messageContent[$channelID;$messageID];<@$botID>];$get[mes]==]==true;
        $let[p;$getUserVar[prefix;$authorID;c!]]
        $addContainer[
            $addSection[
                $addTextDisplay[# Hello!
Chu, at your service!
-# Chu was built to be useful and do fun stuff!\n-# Running v0.4 (Build 256910051511)]
                $addThumbnail[https://cloud.ishikaze.space/f/40C4/Untitled32_20261001192643_cropped.jpg]
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
$get[p]join, $get[p]play <link/track name>
(All other music functions are available on the player)]

            $addTextDisplay[### 😂 Fun
$get[p]anti]

            $addTextDisplay[### 🔧 Configuration
$get[p]prefix $get[p]config]
        ]
    ]
    `
}