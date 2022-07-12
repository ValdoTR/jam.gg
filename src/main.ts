/// <reference types="@workadventure/iframe-api-typings" />

import { CreateUIWebsiteEvent } from "@workadventure/iframe-api-typings/Api/Events/ui/UIWebsite";
import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)
    
    WA.controls.disablePlayerProximityMeeting()
    // TODO: remove only cam
    // TODO: disable mic (users can always enable it)
    // TODO: Open chat with proximity

    const mapUrl = WA.room.mapURL
    const root = mapUrl.substring(0, mapUrl.lastIndexOf("/"))

    let availabilityButton: CreateUIWebsiteEvent = {
        url:  root + "/availabilityButton.html", // Dev Webiste URL
        visible: true,     // The website is visible or not
        allowApi: true,    // Allow scripting API on the website
        allowPolicy: "",   // The list of feature policies allowed
        position: {
            vertical: "bottom",
            horizontal: "middle",
        },
        size: {            // Size on the UI (available units: px|em|%|cm|in|pc|pt|mm|ex|vw|vh|rem and others values auto|inherit)
            height: "70px",
            width: "350px",
        },
        margin: {          // Website margin (available units: px|em|%|cm|in|pc|pt|mm|ex|vw|vh|rem and others values auto|inherit)
            top: "5px",
            bottom: "5px",
            left: "5px",
            right: "5px",
        },
    }
    WA.ui.website.open(availabilityButton)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
