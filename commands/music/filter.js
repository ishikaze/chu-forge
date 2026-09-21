module.exports = {
    name: "filter",
    type: "messageCreate",
    code: `
    $onlyIf[$authorID==$botOwnerID;No.]
    $if[$message==;
        $description[-# usage: \`filter <filter/reset/all>\`;]
    ;
        $try[
            $toggleFilters[$replace[$toTitleCase[$message]; ;\\;]]
             $description[Success: Enabled $message]
        ;
            $description[Error: Invalid filter name.]
        ]
    ]

    $title[Sound filters]
    $addField[Active filters;$getEnabledFilters;true]
    $addField[Available filters;$$getDisabledFilters;true]
    `
};