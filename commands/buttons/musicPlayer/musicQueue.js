module.exports = {
    name: "musicQueue",
    type: "interactionCreate",
    code: `
    $interactionReply[
        $ephemeral
        $description[$cropText[## There are $queueLength Tracks total\n$queue[0;9999;-# <@{track.requestedBy.id}> {track.title};\n];0;1900;...\nQueue is too long for Discord.]]
    ]
    `
};