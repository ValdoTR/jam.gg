/// <reference types="@workadventure/iframe-api-typings" />

import { CreateUIWebsiteEvent } from "@workadventure/iframe-api-typings/Api/Events/ui/UIWebsite";
import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)
    
    WA.player.proximityMeeting.onJoin().subscribe(async (players) => {
        console.log("onJoin players",players)
        WA.chat.open()
    });
    WA.player.proximityMeeting.onLeave().subscribe(async (players) => {
        console.log("onLeave players",players)
        WA.chat.close()
    });
    WA.controls.disableWebcam()
    WA.controls.turnOffMicrophone()

    const mapUrl = WA.room.mapURL
    const root = mapUrl.substring(0, mapUrl.lastIndexOf("/"))

    let availabilityButton: CreateUIWebsiteEvent = {
        url:  root + "/availabilityButton.html", // Dev Webiste URL
        visible: true,     // The website is visible or not
        allowApi: true,    // Allow scripting API on the website
        allowPolicy: "",   // The list of feature policies allowed
        position: {
            vertical: "top",
            horizontal: "middle",
        },
        size: {            // Size on the UI (available units: px|em|%|cm|in|pc|pt|mm|ex|vw|vh|rem and others values auto|inherit)
            height: "70px",
            width: "350px",
        },
        margin: {          // Website margin (available units: px|em|%|cm|in|pc|pt|mm|ex|vw|vh|rem and others values auto|inherit)
            top: "5px",
            bottom: "0px",
            left: "0px",
            right: "0px",
        },
    }
    WA.ui.website.open(availabilityButton)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
