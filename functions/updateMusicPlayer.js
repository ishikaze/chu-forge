module.exports = {
  name: "updateMusicPlayer",
  params: [
    {
      name: "commandData",
      required: false
    }
  ],
  code: `
    $jsonLoad[data;$playerQueue]
        
    $let[loop;0]
    $let[dataValid;true]
    $let[finalQueueData;]

    $while[$get[dataValid]==true;
        $if[$env[data;tracks;$get[loop];info;identifier]!=;
            $if[$get[loop]<10;
                $let[finalQueueData;$get[finalQueueData]-# [@$username[$env[data;tracks;$get[loop];userData;requester;userId]]\\](https://discord.com/users/$env[data;tracks;$get[loop];userData;requester;userId]) $env[data;tracks;$get[loop];info;title]\n]
            ]
            $letSum[loop;1]
        ;
            $let[dataValid;false]
        ]
    ]
    $if[$djsEval[ctx.container.components = [\\]]==;]
    $let[composed;$addContainer[
        $addSection[
            $addTextDisplay[## $env[data;current;info;title]\n-# by $env[data;current;info;author]]
            $if[$isValidLink[$env[data;current;info;artworkUrl]]==true;
                $addThumbnail[$env[data;current;info;artworkUrl]]
            ;
                $addThumbnail[https://cloud.ishikaze.space/f/ylc9/album%20cover%20placholder.png]
            ]
        ]
        $addSeparator[Small;true]
        $addSection[
            $if[$env[data;current;info;duration]!=null;
                $addTextDisplay[$parseDigital[$playerElapsedTime] / $parseDigital[$env[data;current;info;duration]]]
            ;
                $addTextDisplay[00:00:00 / 00:00:00]
            ]
            
            $addButton[musicSeek;Seek;Secondary;<:seek:1550869652693979228>]
        ]

        $addTextDisplay[$getServerVar[latestMusicAction]]

        $addActionRow
        
        $addButton[musicShuffle;;Secondary;<:shuffle:1550869661732573266>]
        $addButton[musicPrev;;Secondary;<:prev:1550869626752082040>]
        $if[$playerIsPaused==true;
            $addButton[musicPause;;Secondary;<:play:1550869633932857445>]
        ;
            $addButton[musicPause;;Secondary;<:pause:1550869637531697172>]
        ]
        $addButton[musicNext;;Secondary;<:next:1550869623958929579>]

        $let[loopIcon;<:loopoff:1550873493732855838>]
        $if[$playerLoopStatus==off;
            $let[loopIcon;<:loopoff:1550873493732855838>]
        ]
        $if[$playerLoopStatus==track;
            $let[loopIcon;<:loop1:1550871941135474699>]
        ]
        $if[$playerLoopStatus==queue;
            $let[loopIcon;<:loop:1550871938262503465>]
        ]
        $addButton[musicLoop;;Secondary;$get[loopIcon]]

        $addActionRow

        $if[$and[$playerGetVolume>0;$playerGetVolume<21]==true;
            $let[volIcon;<:voldown:1550869642417807420>]
        ]
        $if[$and[$playerGetVolume>20;$playerGetVolume<66]==true;
            $let[volIcon;<:vol:1550869640220254340>]
        ]
        $if[$and[$playerGetVolume>65;$playerGetVolume<101]==true;
            $let[volIcon;<:volup:1550869645391691866>]
        ]
        $addButton[musicSetVol;$playerGetVolume%;Secondary;$get[volIcon]]

        $addSeparator[Small;true]
        $addSection[
            $addTextDisplay[Queue ($get[loop] total)\n$get[finalQueueData]]
            $addButton[musicSearch;;Secondary;<:search:1550869659354665050>]
        ]

        $if[$getUserVar[addingTracks;$authorID;false]==true;
            $addSeparator[Small;true]
            $addTextDisplay[## ⌛ Please wait, adding a playlist to the queue... ($getUserVar[addingTracksProgress]/$getUserVar[addingTracksMax])]
        ]
    ]]

    $if[$getServerVar[musicPlayer]==;
        $setServerVar[musicPlayer;$sendMessage[$channelID;$get[composed];true]]
        $setServerVar[musicPlayerChn;$channelID]
        $if[$clearTimeout[updatePlayerTimeout]==false;]
        $setTimeout[$updateMusicPlayer[];5s;updatePlayerTimeout]
    ;
        $if[$or[$isButton==true;$env[commandData]==fromUpdate]==true;
            $if[$messageExists[$getServerVar[musicPlayerChn];$getServerVar[musicPlayer]]==true;
                $get[composed]
                $interactionUpdate
            ;
                $try[
                    $if[
                        $deleteMessage[$getServerVar[musicPlayerChn];$getServerVar[musicPlayer]]==1;
                        $setServerVar[musicChnSent;0]
                        $setServerVar[musicPlayerChn;]
                        $setServerVar[musicPlayer;]
                        $wait[500]
                        $updateMusicPlayer[]
                    ]
                ;
                    $setServerVar[musicChnSent;0]
                    $setServerVar[musicPlayerChn;]
                    $setServerVar[musicPlayer;]
                    $wait[500]
                    $updateMusicPlayer[]
                ]
            ]
        ;
            $if[$getServerVar[musicChnSent;$guildID;0]>0;
                $try[
                    $let[deleted;$deleteMessage[$getServerVar[musicPlayerChn];$getServerVar[musicPlayer]]]
                    $if[
                        $get[deleted]==1;
                        $setServerVar[musicChnSent;0]
                        $setServerVar[musicPlayerChn;]
                        $setServerVar[musicPlayer;]
                        $updateMusicPlayer[]
                    ;
                        $setServerVar[musicChnSent;0]
                        $setServerVar[musicPlayerChn;]
                        $setServerVar[musicPlayer;]
                        $updateMusicPlayer[]
                    ]
                ;
                    $setServerVar[musicChnSent;0]
                    $setServerVar[musicPlayerChn;]
                    $setServerVar[musicPlayer;]
                    $updateMusicPlayer[]
                ]
                
            ;
                $if[$getServerVar[playerUpdates;$guildID;0]<$getTimestamp;
                    $if[$editMessage[$getServerVar[musicPlayerChn];$getServerVar[musicPlayer];$get[composed]]==false;Failed to find the player...]
                    $setServerVar[playerUpdates;$sum[$getTimestamp;10000]]
                    $if[$clearTimeout[updatePlayerTimeout]==false;]
                    $setTimeout[$updateMusicPlayer[];5s;updatePlayerTimeout]
                ;
                    $if[$clearTimeout[updatePlayerTimeout]==false;]
                    $setTimeout[$updateMusicPlayer[];5s;updatePlayerTimeout]
                ]
                
            ]
            
        ]
    ]

    $if[$env[data;current;info;title]==null;
        $if[$channelVoiceMemberCount[$voiceID[$guildID;$botID]]==1;
            $playerDestroy[$guildID;botalone]
        ;
            $setServerVar[placeholderTrack;true]
            $jsonLoad[data;$playerAddTrack[$guildID;https://youtu.be/EKZNd2JMQPE]]

            $setServerVar[latestRequestData;$jsonStringify[data]]
            $if[$playerSetVolume[$guildID;10]==true;]
        ]
    ]
  `
};