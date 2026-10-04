module.exports = {
  name: "updateMusicAction",
  params: [
    {
      name: "action",
      required: true
    }
  ],
  code: `
    $if[$env[action]==%clear;
      $setServerVar[musicActions;]
    ;
      $if[$getServerVar[musicActions]==;
        $setServerVar[musicActions;$env[action]]
      ;
        $setServerVar[musicActions;<t:$cropText[$getTimestamp;0;10]:R> $env[action]_$%@%$^@!SEP_$getServerVar[musicActions]]
        $setServerVar[musicActions;$cropText[$getServerVar[musicActions];0;10000]]
      ]
    ]

    $textSplit[$getServerVar[musicActions];_$%@%$^@!SEP_]

    $setServerVar[latestMusicAction;$splitText[0]\n$splitText[1]]
    $updateMusicPlayer[fromUpdate]
  `
};