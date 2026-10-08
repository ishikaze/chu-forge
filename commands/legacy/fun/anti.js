module.exports = {
    name: "anti",
    type: "messageCreate",
    code: `
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
            $drawText[;fill;X;740px M PLUS U-latin;#FF0000;-10;522]
        ]
        $renderCanvas[anti]
    ]
    `
};