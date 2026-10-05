module.exports = {
    name: "anti",
    type: "messageCreate",
    code: `
    $onlyIf[$authorID==$botOwnerID;No.]

    $if[$userExists[$mentioned[0]]==false;
        $if[$userExists[$message[0]]==false;
            $sendMessage[$channelID;Please mention a user or provide a valid user ID!]
        ;
            $let[target;$message[0]]
        ]
    ;
        $let[target;$mentioned[0]]
    ]

    $if[$get[target]!=;
        $createCanvas[anti;512;512;
            $drawRect[;fill;#FFFFFF;0;0;512;512]
            $drawImage[;$userAvatar[$get[target]];0;0;512;512]
            $drawText[;fill;x;1510px Cordia New;#FF0000;8;512]
        ]
        $renderCanvas[anti]
    ]
    `
};