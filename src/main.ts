/// <reference types="@workadventure/iframe-api-typings" />

import { CreateUIWebsiteEvent } from "@workadventure/iframe-api-typings/Api/Events/ui/UIWebsite";
import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    console.log('playerId',WA.player.id)
    
    WA.controls.disablePlayerProximityMeeting()

    let letsPlayButton: CreateUIWebsiteEvent = {
        url: "http://localhost:3000/src/letsPlayButton.html", // Dev Webiste URL
        //url: "https://valdotr.github.io/jam.gg/src/letsPlayButton.html", // Website URL
        visible: true,     // The website is visible or not
        allowApi: true,    // Allow scripting API on the website
        allowPolicy: "",   // The list of feature policies allowed
        position: {
            vertical: "top",
            horizontal: "middle",
        },
        size: {            // Size on the UI (available units: px|em|%|cm|in|pc|pt|mm|ex|vw|vh|rem and others values auto|inherit)
            height: "200px",
            width: "400px",
        },
        margin: {          // Website margin (available units: px|em|%|cm|in|pc|pt|mm|ex|vw|vh|rem and others values auto|inherit)
            top: "5px",
            bottom: "5px",
            left: "5px",
            right: "5px",
        },
    }
    WA.ui.website.open(letsPlayButton)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
