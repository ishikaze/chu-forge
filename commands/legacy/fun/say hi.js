module.exports = {
    type: "messageCreate",
    code: `
    $onlyIf[$authorID!=$botID;]
    $if[$getServerVar[allowSayHi;$guildID;false]==true;
        $if[$checkContains[$toLowercase[$message];i'm;im]==true;
            $textSplit[$message; ]
            $loop[$getTextSplitLength;
                $if[$checkContains[$toLowercase[$splitText[$sub[$env[n];1]]];i'm;im]==true;
                    $let[startFrom;$sub[$env[n]]]
                    $loop[$sub[$getTextSplitLength;$get[startFrom]];
                        $let[index;$sum[$get[startFrom];$sub[$env[m];1]]]
                        $let[sayHiTo;$get[sayHiTo] $splitText[$get[index]]]
                    ;m;true]
                    $break
                ]
            ;n;true]
            $replaceText[Hi$get[sayHiTo], I'm Chu!; , ;, ;-1]
        ]
    ]
    `
}