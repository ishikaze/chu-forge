module.exports = {
  name: "updateMusicPlayer",
  params: [
    {
      name: "commandData",
      required: false
    }
  ],
  code: `
    $onlyIf[$playerExists==true;]
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

    $let[currentArtwork;$env[data;current;info;artworkUrl]]
    $if[$isValidLink[$get[currentArtwork]]==false;
        $let[currentArtwork;https://cloud.ishikaze.space/f/ylc9/album%20cover%20placholder.png]
    ]

    $let[themeRaw;$djsEval[
        (async () => {
            const { Vibrant } = require('node-vibrant/node');
            try {
                const palette = await Vibrant.from('$get[currentArtwork]').getPalette();
                
                // Print all generated colors to your bot's terminal
                // console.log("=== NEW IMAGE PALETTE ===");
                // for (const key in palette) {
                //     if (palette[key\\]) {
                //         console.log(
                //             key + ": " + palette[key\\].hex + 
                //             " | Suggested Title Text: " + palette[key\\].titleTextColor +
                //             " | Suggested Body Text: " + palette[key\\].bodyTextColor
                //         );
                //     }
                // }
                // console.log("=========================");
                
                // Return all of them so you can use whichever you pick!
                return JSON.stringify({
                    Vibrant: palette.Vibrant ? palette.Vibrant.hex : '#FFFFFF',
                    VibrantTitle: palette.Vibrant ? palette.Vibrant.titleTextColor : '#000000',
                    
                    LightVibrant: palette.LightVibrant ? palette.LightVibrant.hex : '#FFFFFF',
                    LightVibrantTitle: palette.LightVibrant ? palette.LightVibrant.titleTextColor : '#000000',
                    
                    DarkVibrant: palette.DarkVibrant ? palette.DarkVibrant.hex : '#000000',
                    DarkVibrantTitle: palette.DarkVibrant ? palette.DarkVibrant.titleTextColor : '#FFFFFF',
                    
                    Muted: palette.Muted ? palette.Muted.hex : '#888888',
                    MutedTitle: palette.Muted ? palette.Muted.titleTextColor : '#FFFFFF',
                    
                    LightMuted: palette.LightMuted ? palette.LightMuted.hex : '#CCCCCC',
                    LightMutedTitle: palette.LightMuted ? palette.LightMuted.titleTextColor : '#000000',
                    
                    DarkMuted: palette.DarkMuted ? palette.DarkMuted.hex : '#444444',
                    DarkMutedTitle: palette.DarkMuted ? palette.DarkMuted.titleTextColor : '#FFFFFF'
                });
            } catch (err) {
                return JSON.stringify({ Vibrant: '#FFFFFF', VibrantTitle: '#000000' });
            }
        })();
    ]]

    $jsonLoad[theme;$get[themeRaw]]

    $let[composed;$addContainer[

        $createCanvas[playing;1550;550;
            $newLinearGradient[test;0;0;0;550;0;1]
            $addColorStop[test;0;$env[theme;DarkVibrant]]
            $addColorStop[test;0.1;$env[theme;DarkVibrant]]
            $addColorStop[test;0.9;rgba(0,0,0,0)]
            $drawRect[;fill;gradient://test;0;0;1550;550]
            
            $if[$isValidLink[$env[data;current;info;artworkUrl]]==true;
                $drawImage[;$env[data;current;info;artworkUrl];50;50;450;450;16]
            ;
                $drawImage[;https://cloud.ishikaze.space/f/ylc9/album%20cover%20placholder.png;25;500;500;500;16]
            ]
            
            $drawText[;fill;$env[data;current;info;title];64px Google Sans Flex-latin;$env[theme;LightVibrant];550;125;;false]
            $drawText[;fill;$env[data;current;info;author];48px Google Sans Flex-latin;$env[theme;LightVibrant]80;552.5;190;;false]
            
            $if[$env[data;current;info;duration]!=null;
                $drawText[;fill;$parseDigital[$playerElapsedTime];32px Google Sans Flex-latin;$env[theme;LightMuted];555;475;;false]
                $drawRect[;fill;$env[theme;DarkMuted];705;447.5;630;32;32]
                
                $drawRect[;fill;$env[theme;LightMuted];705;447.5;$math[32 + (($playerElapsedTime / $env[data;current;info;duration]) * 598)];32;32]
                
                $drawText[;fill;$parseDigital[$env[data;current;info;duration]];32px Google Sans Flex-latin;$env[theme;LightMuted];1355;475;;false]
            ;
                $drawText[;fill;Failed to load track duration data.;32px Google Sans Flex-latin;$env[theme;LightMuted];555;475;;false]
            ]
        ]
        $renderCanvas[playing;playing.webp]

        $addMediaGallery[
            $addMediaItem[attachment://playing.webp]
        ]
        
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
        $addButton[musicSeek;Seek;Secondary;<:seek:1550869652693979228>]

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

        $addTextDisplay[$getServerVar[latestMusicAction]]

        $addSeparator[Small;true]
        $addSection[
            $addTextDisplay[Queue ($get[loop] total)\n$get[finalQueueData]]
            $addButton[musicSearch;;Secondary;<:search:1550869659354665050>]
        ]

        $if[$getUserVar[addingTracks;$authorID;false]==true;
            $addSeparator[Small;true]
            $addTextDisplay[## ⌛ Please wait, adding a playlist to the queue... ($getUserVar[addingTracksProgress]/$getUserVar[addingTracksMax])]
        ]
    ;$if[$isValidHex[$env[theme;DarkVibrant]]==true;$env[theme;DarkVibrant]]]]

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
            $if[$getServerVar[musicChnSent;$guildID;0]>4;
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
            $try[
                $let[deleted;$deleteMessage[$getServerVar[musicPlayerChn];$getServerVar[musicPlayer]]]
                $if[
                    $get[deleted]==1;
                    $setServerVar[musicChnSent;0]
                    $setServerVar[musicPlayerChn;]
                    $setServerVar[musicPlayer;]
                    $if[$clearTimeout[updatePlayerTimeout]==false;]
                ;
                    $setServerVar[musicChnSent;0]
                    $setServerVar[musicPlayerChn;]
                    $setServerVar[musicPlayer;]
                    $if[$clearTimeout[updatePlayerTimeout]==false;]
                ]
            ;
                $setServerVar[musicChnSent;0]
                $setServerVar[musicPlayerChn;]
                $setServerVar[musicPlayer;]
                $if[$clearTimeout[updatePlayerTimeout]==false;]
            ]
        ;
            $setServerVar[placeholderTrack;true]
            $jsonLoad[data;$playerAddTrack[$guildID;https://youtu.be/EKZNd2JMQPE]]

            $setServerVar[latestRequestData;$jsonStringify[data]]
            $if[$playerSetVolume[$guildID;10]==true;]
        ]
    ]
  `
};