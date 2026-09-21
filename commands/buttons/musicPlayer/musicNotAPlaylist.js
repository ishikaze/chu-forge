module.exports = {
    name: "notAPlaylist",
    type: "interactionCreate",
    code: `
    $addContainer[
        $addTextDisplay[## \:( Sorry, Chu found nothing...]
    ]
    $interactionUpdate
    `
};