/// <reference types="@workadventure/iframe-api-typings" />

import { CreateUIWebsiteEvent } from "@workadventure/iframe-api-typings/Api/Events/ui/UIWebsite";
import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    
    // @ts-ignore
    WA.player.proximityMeeting.onJoin().subscribe(async (players) => {
        // @ts-ignore
        WA.chat.open()
    });
    // @ts-ignore
    WA.controls.disableWebcam()
    // @ts-ignore
    WA.controls.turnOffMicrophone()

    const mapUrl = WA.room.mapURL
    const root = mapUrl.substring(0, mapUrl.lastIndexOf("/"))

    let apiIframe: CreateUIWebsiteEvent = {
        url:  root + "/api.html",
        visible: false,
        allowApi: true,
        allowPolicy: "",   // The list of feature policies allowed
        position: {
            vertical: "top",
            horizontal: "middle",
        },
        size: {            // Size on the UI (available units: px|em|%|cm|in|pc|pt|mm|ex|vw|vh|rem and others values auto|inherit)
            height: "0px",
            width: "0px",
        },
    }
    WA.ui.website.open(apiIframe)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
