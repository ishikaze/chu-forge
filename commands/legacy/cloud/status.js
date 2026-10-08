module.exports = {
    name: "cloud",
    type: "messageCreate",
    code: `
    $onlyIf[$authorID==$botOwnerID;No.]

    $startTyping

    $if[$httpRequest[https://cloud.ishikaze.space/api/v4/site/ping;GET;res1]==200;
        $jsonLoad[statusRes;$env[res1]]
        $let[cloudOnline;true]
    ]
    
    $if[$getUserVar[cloudToken]!=;
        $httpAddHeader[Authorization;Bearer $getUserVar[cloudToken]]
    ]
    $if[$httpRequest[https://cloud.ishikaze.space/api/v4/session/oauth/userinfo;GET;res2]==200;
        $jsonLoad[userRes;$env[res2]]
    ]

    $let[composed;
        $addContainer[
            $addTextDisplay[## KazeCloud Status]

            $if[$env[userRes;code]==;
                $httpAddHeader[Authorization;Bearer $getUserVar[cloudToken]]
                $if[$httpRequest[https://cloud.ishikaze.space/api/v4/user/info/$env[userRes;sub];GET;res3]==200;
                    $jsonLoad[userResFull;$env[res3]]
                ]

                $httpAddHeader[Authorization;Bearer $getUserVar[cloudToken]]
                $if[$httpRequest[https://cloud.ishikaze.space/api/v4/user/capacity;GET;res4]==200;
                    $jsonLoad[userResStorage;$env[res4]]
                ]

                $if[$env[userResFull;code]==0;
                    $addSection[
                        $addTextDisplay[### $env[userRes;preferred_username]\n-# Email: $env[userRes;email]\n-# ID: $env[userRes;sub]]
                        $addThumbnail[$env[userRes;picture]]
                    ]
                    $addSeparator[Small;false]
                    $addTextDisplay[Cloud tier: **$env[userResFull;data;group;name]**\n-# $round[$divide[$env[userResStorage;data;used];1073741824];2] GB / $round[$divide[$env[userResStorage;data;total];1073741824];2] GB used]

                    $addActionRow
                    $addButton[cloudLogOut;Log out;Danger]
                ;
                    $addTextDisplay[Error: $env[userResFull;msg]]
                ]
            ]

            $if[$env[userRes;code]==401;
                $addTextDisplay[You are not logged in.\nRegistetred $getUserVar[registeredAccount;$authorID;0]/$getUserVar[registeredAccountLimit;$authorID;1] account(s)]

                $addActionRow
                $addButton[cloudLogin;Login;Primary]
                $addButton[cloudRegister;Register;Secondary;;true]
            ]
        ]
    ]

    $If[$get[cloudOnline]==true;
        $setMessageVar[author;$authorID;$sendMessage[$channelID;$get[composed];true]]
    ]
    `
};