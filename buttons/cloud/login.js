module.exports = {
    name: "cloudLogin",
    type: "interactionCreate",
    code: `
    $onlyIf[$getMessageVar[author;$messageID]==$authorID;]

    $if[$isButton==true;
        $modal[cloudLogin;Login to KazeCloud]
        $addTextInput[loginEmail;Email;Short;true;Enter your email;;0;100]
        $addTextInput[loginPassword;Password;Short;true;Enter your password;;6;64]
    ;
        $httpSetBody[{
            "email": "$input[loginEmail]",
            "password": "$input[loginPassword]"
        }]
        $log[Result: $env[loginRes]]

        $if[$httpRequest[https://cloud.ishikaze.space/api/v4/session/token;POST;loginRes]==200;
            $if[$env[loginRes;code]==0;
                $setUserVar[cloudToken;$env[loginRes;data;token;access_token]]
                $setUserVar[cloudRefreshToken;$env[loginRes;data;token;refresh_token]]
                $addContainer[
                    $addTextDisplay[Logged in successfully as **$env[loginRes;data;user;nickname]**\nLogin expires: $env[loginRes;data;token;access_expires]\nRefresh expires:$env[loginRes;data;token;refresh_expires]\nPlease use the cloud command again to see your account.]
                ]
                $interactionUpdate
            ;
                $addContainer[
                    $addTextDisplay[Login error: $env[loginRes;msg]\nPlease try again.]
                ]
                $interactionUpdate
            ]
        ]
    ]
    `
}