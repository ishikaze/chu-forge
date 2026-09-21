module.exports = {
  name: "updateMusicMenu",
  params: [
    { name: "type", required: true },
    { name: "trackTitle", required: true },
    { name: "trackArtist", required: true },
    { name: "currentTrackTotalDuration", required: true },
    { name: "albumCover", required: true }
  ],
  code: `
  $let[title;$env[trackTitle]]
  $let[artist;-# $env[trackArtist]]

  $if[$get[artist]==-# ;
    $let[artist;]
  ]
  $textSplit[●────────────────── ─●───────────────── ──●──────────────── ───●─────────────── ────●────────────── ─────●───────────── ──────●──────────── ───────●─────────── ────────●────────── ─────────●───────── ─────────●───────── ──────────●──────── ───────────●─────── ────────────●────── ─────────────●───── ──────────────●──── ───────────────●─── ────────────────●── ─────────────────●─ ──────────────────● ──────────────────●; ]
  $let[buttonState;$getServerVar[justJoined;$guildID;false]]
    $if[$env[type]==send;
        $if[$deleteMessage[$getServerVar[musicChannel];$getServerVar[playingMessage]];]
        $setServerVar[playingMessage;
            $sendMessage[$getServerVar[musicChannel;$guildID];
                $addContainer[
                    $addTextDisplay[### Music player]
                    $addSeparator[Small;true]

                    $addSection[
                        $addTextDisplay[## $env[trackTitle]\n$get[artist]]
                        $addThumbnail[$env[albumCover]]
                    ]
                    
                    $if[$playerElapsedTime==NaN;
                    ;
                        $addTextDisplay[\`$parseDigital[$math[($playerElapsedTime/100000) * $currentTrackTotalDuration]] $splitText[$round[$math[($playerElapsedTime / 1000) * (20 / 100)]]] $parseDigital[$currentTrackTotalDuration]\`]
                    ]
                    $addTextDisplay[$getServerVar[musicActions;$guildID;-# *No actions logged.*]]
                    $addSeparator[Small;false]

                    $addActionRow
                    $addButton[musicVolDown;;Secondary;<:voldown:1550869642417807420>;$get[buttonState]]
                    $addButton[musicPrev;;Secondary;<:prev:1550869626752082040>;$get[buttonState]]
                    $if[$isPaused==true;
                        $addButton[musicPlay;;Secondary;<:play:1550869633932857445>;$get[buttonState]]
                    ;
                        $addButton[musicPause;;Secondary;<:pause:1550869637531697172>;$get[buttonState]]
                    ]
                    $addButton[musicNext;;Secondary;<:next:1550869623958929579>;$get[buttonState]]
                    $addButton[musicVolUp;;Secondary;<:volup:1550869645391691866>;$get[buttonState]]

                    $addActionRow
                    $addButton[musicShuffle;;Secondary;<:shuffle:1550869661732573266>;$get[buttonState]]
                    $if[$getLoopMode==OFF;
                        $addButton[musicLoop;;Secondary;<:loopoff:1550873493732855838>;$get[buttonState]]
                    ]
                    $elseif[$getLoopMode==TRACK;
                        $addButton[musicLoop;;Secondary;<:loop1:1550871941135474699>;$get[buttonState]]
                    ]
                    $elseif[$getLoopMode==QUEUE;
                        $addButton[musicLoop;;Secondary;<:loop:1550871938262503465>;$get[buttonState]]
                    ]
                    $elseif[$getLoopMode==AUTOPLAY;
                        $addButton[musicLoop;;Secondary;<:autoplay:1550869649112174663>;$get[buttonState]]
                    ]
                    $addButton[musicQueue;;Secondary;<:queue:1550869655516741652>;$get[buttonState]]
                    $addButton[musicSeek;;Secondary;<:seek:1550869652693979228>;$get[buttonState]]
                    $addButton[musicSearch;;Secondary;<:search:1550869659354665050>]
                    
                    $addActionRow
                    $addButton[musicVolNum; $getVolume%;Secondary;<:vol:1550869640220254340>;$get[buttonState]]
                    $addButton[musicGuide;Help;Secondary;<:info:1551583828844224512>]

                    $addSeparator[Small;false]
 
                    $addTextDisplay[Up next ($queueLength)\n$queue[0;10;-# [@\\](https://discord.com/users/{track.requestedBy.id}) {track.title};\n]]
                ]
            ;true] 
        ]

        $wait[10000]

        $updateMusicMenu[timer;$trackInfo[title];$trackInfo[author];$trackInfo[duration];$trackInfo[thumbnail]]
    ]

    $elseIf[$env[type]==timer;
        $let[id;$getServerVar[playingMessage]]
        $let[id;$replace[$get[id]; ;]]
        $let[id;$replace[$get[id];
;]]

        $if[$getServerVar[playerUpdates;$guildID;0]<$getTimestamp;
            $editMessage[$getServerVar[musicChannel];$get[id];
                $addContainer[
                    $addTextDisplay[### Music player]
                    $addSeparator[Small;true]

                    $addSection[
                        $addTextDisplay[## $env[trackTitle]\n$get[artist]]
                        $addThumbnail[$env[albumCover]]
                    ]
                    
                    $if[$playerElapsedTime==NaN;
                    ;
                        $addTextDisplay[\`$parseDigital[$math[($playerElapsedTime/100000) * $currentTrackTotalDuration]] $splitText[$round[$math[($playerElapsedTime / 1000) * (20 / 100)]]] $parseDigital[$currentTrackTotalDuration]\`]
                    ]
                    $addTextDisplay[$getServerVar[musicActions;$guildID;-# *No actions logged.*]]
                    $addSeparator[Small;false]

                    $addActionRow
                    $addButton[musicVolDown;;Secondary;<:voldown:1550869642417807420>;$get[buttonState]]
                    $addButton[musicPrev;;Secondary;<:prev:1550869626752082040>;$get[buttonState]]
                    $if[$isPaused==true;
                        $addButton[musicPlay;;Secondary;<:play:1550869633932857445>;$get[buttonState]]
                    ;
                        $addButton[musicPause;;Secondary;<:pause:1550869637531697172>;$get[buttonState]]
                    ]
                    $addButton[musicNext;;Secondary;<:next:1550869623958929579>;$get[buttonState]]
                    $addButton[musicVolUp;;Secondary;<:volup:1550869645391691866>;$get[buttonState]]

                    $addActionRow
                    $addButton[musicShuffle;;Secondary;<:shuffle:1550869661732573266>;$get[buttonState]]
                    $if[$getLoopMode==OFF;
                        $addButton[musicLoop;;Secondary;<:loopoff:1550873493732855838>;$get[buttonState]]
                    ]
                    $elseif[$getLoopMode==TRACK;
                        $addButton[musicLoop;;Secondary;<:loop1:1550871941135474699>;$get[buttonState]]
                    ]
                    $elseif[$getLoopMode==QUEUE;
                        $addButton[musicLoop;;Secondary;<:loop:1550871938262503465>;$get[buttonState]]
                    ]
                    $elseif[$getLoopMode==AUTOPLAY;
                        $addButton[musicLoop;;Secondary;<:autoplay:1550869649112174663>;$get[buttonState]]
                    ]
                    $addButton[musicQueue;;Secondary;<:queue:1550869655516741652>;$get[buttonState]]
                    $addButton[musicSeek;;Secondary;<:seek:1550869652693979228>;$get[buttonState]]
                    $addButton[musicSearch;;Secondary;<:search:1550869659354665050>]
                    
                    $addActionRow
                    $addButton[musicVolNum; $getVolume%;Secondary;<:vol:1550869640220254340>;$get[buttonState]]
                    $addButton[musicGuide;Help;Secondary;<:info:1551583828844224512>]
                    
                    $addSeparator[Small;false]

                    $addTextDisplay[Up next ($queueLength)\n$queue[0;10;-# [@\\](https://discord.com/users/{track.requestedBy.id}) {track.title};\n]]
                ]
            ]
            $setServerVar[playerUpdates;$sum[$getTimestamp;9000];$guildID]
        ]

        $wait[5000]

        $updateMusicMenu[timer;$trackInfo[title];$trackInfo[author];$trackInfo[duration];$trackInfo[thumbnail]]
    ]

    $else[
        $addContainer[
            $addTextDisplay[### Music player]
            $addSeparator[Small;true]

            $addSection[
                $addTextDisplay[## $env[trackTitle]\n$get[artist]]
                $addThumbnail[$env[albumCover]]
            ]
            
            $if[$playerElapsedTime==NaN;
            ;
                $addTextDisplay[\`$parseDigital[$math[($playerElapsedTime/100000) * $currentTrackTotalDuration]] $splitText[$round[$math[($playerElapsedTime / 1000) * (20 / 100)]]] $parseDigital[$currentTrackTotalDuration]\`]
            ]
            $addTextDisplay[$getServerVar[musicActions;$guildID;-# *No actions logged.*]]
            $addSeparator[Small;false]

            $addActionRow
            $addButton[musicVolDown;;Secondary;<:voldown:1550869642417807420>;$get[buttonState]]
            $addButton[musicPrev;;Secondary;<:prev:1550869626752082040>;$get[buttonState]]
            $if[$isPaused==true;
                $addButton[musicPlay;;Secondary;<:play:1550869633932857445>;$get[buttonState]]
            ;
                $addButton[musicPause;;Secondary;<:pause:1550869637531697172>;$get[buttonState]]
            ]
            $addButton[musicNext;;Secondary;<:next:1550869623958929579>;$get[buttonState]]
            $addButton[musicVolUp;;Secondary;<:volup:1550869645391691866>;$get[buttonState]]

            $addActionRow
            $addButton[musicShuffle;;Secondary;<:shuffle:1550869661732573266>;$get[buttonState]]
            $if[$getLoopMode==OFF;
                $addButton[musicLoop;;Secondary;<:loopoff:1550873493732855838>;$get[buttonState]]
            ]
            $elseif[$getLoopMode==TRACK;
                $addButton[musicLoop;;Secondary;<:loop1:1550871941135474699>;$get[buttonState]]
            ]
            $elseif[$getLoopMode==QUEUE;
                $addButton[musicLoop;;Secondary;<:loop:1550871938262503465>;$get[buttonState]]
            ]
            $elseif[$getLoopMode==AUTOPLAY;
                $addButton[musicLoop;;Secondary;<:autoplay:1550869649112174663>;$get[buttonState]]
            ]
            $addButton[musicQueue;;Secondary;<:queue:1550869655516741652>;$get[buttonState]]
            $addButton[musicSeek;;Secondary;<:seek:1550869652693979228>;$get[buttonState]]
            $addButton[musicSearch;;Secondary;<:search:1550869659354665050>]
            
            $addActionRow
            $addButton[musicVolNum; $getVolume%;Secondary;<:vol:1550869640220254340>;$get[buttonState]]
            $addButton[musicGuide;Help;Secondary;<:info:1551583828844224512>]
            
            $addSeparator[Small;false]

            $addTextDisplay[Up next ($queueLength)\n$queue[0;10;-# [@\\](https://discord.com/users/{track.requestedBy.id}) {track.title};\n]]
        ]

        $interactionUpdate
    ]
  `
};