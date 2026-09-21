module.exports = {
    name: "musicGuide",
    type: "interactionCreate",
    code: `
    $ephemeral
    $title[Music player guide]
    $description[## Buttons
### <:voldown:1550869642417807420> Volume down
Turns the volume down by 10%
### <:prev:1550869626752082040> Previous track
Starts playing the previously played track in the queue
### <:play:1550869633932857445> Play track
Plays/Resumes the current track
### <:pause:1550869637531697172> Pause track
Pauses the current track
### <:next:1550869623958929579> Next track
Starts playing the next track in the queue
### <:volup:1550869645391691866> Volume up
Turns the volume up by 10%
### <:loopoff:1550873493732855838> Loop mode off
Indicates that loop mode is off
### <:loop1:1550871941135474699> Loop mode track
Indicates that loop mode is on mode **TRACK**
The player will keep looping the current track
### <:loop:1550871938262503465> Loop mode queue
Indicates that loop mode is on mode **QUEUE**
The player will keep looping the current queue
### <:autoplay:1550869649112174663> Autoplay
Indicates that loop mode is on mode **AUTOPLAY**
Tracks will automatically be picked and added to the queue once it ends
### <:queue:1550869655516741652> Queue
Displays the current queue
### <:seek:1550869652693979228> Seek
Seek to a certain timestamp in the track
-# Example: 1m, 1m32s, 3h2m50s, 1h30s, ETC
### <:search:1550869659354665050> Search track
Search for tracks and add them to the queue via links or titles
### <:vol:1550869640220254340> Volume indicator
Shows the current volume level
You can also click on it to set the volume to a specific number of percentage
]
    `
};