module.exports = {
  name: "requestTrack",
  params: [
    {
      name: "query",
      required: true
    }
  ],
  code: `
    $jsonLoad[data;$playerAddTrack[$guildID;$env[query]]]

    $if[$env[data;type]==track;
        $updateMusicAction[<@$env[data;requester]> requested $env[data;trackTitle]]
    ;
        $updateMusicAction[<@$env[data;requester]> requested $env[data;playlistName]]
    ]

    $setServerVar[latestRequestData;$jsonStringify[data]]

    $updateMusicPlayer[]
  `
};