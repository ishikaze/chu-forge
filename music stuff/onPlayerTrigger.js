const { GuildQueueEvent } = require("@tryforge/forge.music");

module.exports = {
    name: "queue",
    type: GuildQueueEvent.PlayerTrigger,
    code: `
    $if[$isFilterEnabled[Normalizer2]==false;
        $if[$pauseTrack;]
        $toggleFilters[Normalizer2]
        $if[$resumeTrack;]
    ]
    $if[$isFilterEnabled[Normalizer]==false;\
        $if[$pauseTrack;]
        $toggleFilters[Normalizer]
        $if[$resumeTrack;]
    ]
    `
};