module.exports = {
    name: "musicSearch",
    type: "interactionCreate",
    code: `
    $if[$isButton==true;
        $modal[musicSearch;Track search]
        $addTextInput[q;Enter track name or link;Short;true;Many platforms supported]
    ]
    $elseif[$isModal==true;
        $interactionReply[
            $ephemeral
            $let[result;$searchTrack[$input[q];{track.title}__SPLITTER__{track.author}__SPLITTER__{track.url}__SPLITTER__{track.thumbnail};__NEWRESULTLINE__;;;5;false;]]
            $textSplit[$get[result];__NEWRESULTLINE__]
            $addContainer[
                $addTextDisplay[# Results]
                $addSeparator[Small;true]
                $loop[$getSplitTextLength;
                    $textSplit[$splitText[$math[$env[i]-1]];__SPLITTER__]

                    $if[$splitText[0]!=;
                        $if[$and[$isValidLink[$input[q]]==true;$checkContains[$toLowerCase[$input[q]];playlist]]==false;
                            $addSeparator[Small;false]
                            $addSection[
                                $addTextDisplay[## [$splitText[0]\\]($splitText[2])\nBy $splitText[1]]
                                $if[$isValidLink[$splitText[3]]==true;
                                    $addThumbnail[$splitText[3]]
                                ;
                                    $addThumbnail[https://www.gstatic.com/marketing-cms/assets/images/99/75/ba9b20c04dc2b37c7165e70ba215/external-icon-core-2.png=n-w908-h511-fcrop64=1,00000000ffffffff-rw]
                                ]
                                
                            ]
                            $addActionRow
                            $addButton[ATQ%LINK%$splitText[2];Add to queue;Success]
                            $textSplit[$get[result];__NEWRESULTLINE__]
                        ;
                            $let[finalResults;$get[finalResults]\n-# [$splitText[0]\\]($splitText[2]) By $splitText[1]]
                        ]
                        
                    ;
                        $if[$and[$isValidLink[$input[q]]==true;$checkContains[$toLowerCase[$input[q]];playlist]]==true;
                            $addTextDisplay[Playlist detected. Playlist previews are unavailable, only showing the first track of the playlist.\nYou can still add the whole playlist!\n$get[finalResults]]
                            $addActionRow
                            $addButton[ATQ%LINK%$input[q];Add playlist to queue;Success]
                        ]
                        $addTextDisplay[-# No more results... $math[$env[i] - 1] Found]
                        $break
                    ]
                    
                ;i;true]
            ]  
        ]
    ]
    `
};