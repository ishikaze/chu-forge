module.exports = {
    name: "cloudLogOut",
    type: "interactionCreate",
    code: `
    $onlyIf[$getMessageVar[author;$messageID]==$authorID;]

    $if[$isButton==true;
        $httpSetBody[{
            "refresh_token": "$getUserVar[cloudToken]"
        }]

        $if[$httpRequest[https://cloud.ishikaze.space/api/v4/session/token;DELETE;loginRes]==200;
            $if[$env[loginRes;code]==0;
                $setUserVar[cloudToken;]
                $setUserVar[cloudRefreshToken;]
                $addContainer[
                    $addTextDisplay[Logged out.]
                ]
                $interactionUpdate
            ;
                $addContainer[
                    $addTextDisplay[Log out error: $env[loginRes;msg]]
                ]
                $interactionUpdate
            ]
        ]
    ]
    `
}