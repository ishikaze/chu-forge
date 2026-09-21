module.exports = {
    name: "test",
    type: "messageCreate",
    code: `
    $sendMessage[$channelID;
        $addContainer[
            $addSection[
                $addTextDisplay[Option text goes here!]
                $addButton[17080fe6170e4330df06fb94c7494c20;button label;Success]
            ]
            $addSeparator
            ;#5865F2
        ]
    ]
    `
};