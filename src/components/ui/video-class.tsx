"use client";
import { useState } from 'react';
import { JitsiMeeting } from "@jitsi/react-sdk";
import { redirect, useSearchParams } from 'next/navigation';
import { toast } from "sonner";
import { useTheme } from 'next-themes';
export default function VideoClass({classId, userType, password, displayName, emailId}: {
    classId: string;
    userType: string;
    password: string;
    displayName: string;
    emailId: string
}) {
    const [isMeetingRunning, setIsMeetingRunning] = useState<boolean>(true);
    const { theme } = useTheme()
    if (!classId || classId == "") {
        setTimeout(() => {
            toast("Invalid class, class does not exist");
        }, 10);
        return <>Invalid</>;
    }

    if (!isMeetingRunning) {
        redirect("/");
        return <></>;
    }

    return (
        <>
            <JitsiMeeting
                domain={"meet.yashk.dev"}
                roomName={classId}
                lang="en"
                onReadyToClose={() => {
                    setIsMeetingRunning(false);
                }}
                configOverwrite={{
                    enableLobby: true, 
                    enableUserRolesBasedOnToken: true, 
                    startWithAudioMuted: true,
                    disableModeratorIndicator: true,
                    startScreenSharing: true,
                    enableEmailInStats: true,
                    disableDeepLinking: true,
                    disableInviteFunctions: true,
                    disableMobileAppBanner: true,
                    securityUi: {
                        hideLobbyButton: false,
                        disableLobbyPassword: true, 
                        enableLobby: false,
                    },
                    lobby: {
                        autoKnock: true, 
                        enableChat: true,
                    },
                    participantsPane: {
                        hideModeratorSettingsTab: true,
                    },
                    prejoinPageEnabled: false,
                    toolbarButtons: [
                        "whiteboard",
                        'camera',
                        'chat',
                        "desktop",
                        'feedback',
                        'fullscreen',
                        "noisesuppression",
                        'hangup',
                        // 'help',
                        'microphone',
                        'participants-pane',
                        'profile',
                        'raisehand',
                        // 'security',
                        'select-background',
                        'settings',
                        'tileview',
                        'toggle-camera',
                        'videoquality',
                        'mute-everyone',
                        'mute-video-everyone',
                        '__end',
                    ],
                    ENABLE_LOBBY: true,
                    mainToolbarButtons: [
                        ['microphone', 'camera', "desktop", 'whiteboard', 'chat', 'raisehand', 'reactions', 'participants-pane', 'tileview'],
                    ],
                    corsAvatarURLs: ['https://www.gravatar.com/avatar/'],
                    gravatar: {
                        baseUrl: 'https://www.gravatar.com/avatar/',
                        disabled: false,
                    },
                }}
                interfaceConfigOverwrite={{
                    APP_NAME: "GengoConnect",
                    DISABLE_LOBBY: false,
                    ENABLE_LOBBY: true,
                    DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
                    AUDIO_LEVEL_PRIMARY_COLOR: (theme != "dark"? "black":"white"),
                    AUDIO_LEVEL_SECONDARY_COLOR: (theme != "dark"? "black":"white"),
                    LANG_DETECTION: false,
                    DEFAULT_BACKGROUND: (theme == "dark"? "black":"white"),
                    TOOLBAR_BACKGROUND: '#4caf50',
                    TOOLBAR_BUTTON_HOVER: '#4caf50',
                    BRAND_WATERMARK_LINK: 'https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg',
                    PRIMARY_COLOR: '#4caf50',
                    SHOW_WATERMARK_FOR_GUESTS: false,
                    TILE_VIEW_MAX_COLUMNS: 3,
                    SHOW_BRAND_WATERMARK: false,
                    MOBILE_APP_PROMO: false,
                    SHOW_JITSI_WATERMARK: false,
                    SHOW_POWERED_BY: false,
                    SHOW_PROMOTIONAL_CLOSE_PAGE: false,
                    DEFAULT_LOGO_URL: 'https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg',
                    CLOSE_PAGE_GUEST_HINT: false,
                }}
                userInfo={{
                    displayName: displayName,
                    email: emailId,
                }}
                spinner={() => <>Loading...</>}
                onApiReady={(api) => {
                    api.on('readyToClose', () => {
                        setIsMeetingRunning(false)
                        api.executeCommand('hangup')
                    });

                    api.on("videoConferenceLeft", function (event) {
                        setIsMeetingRunning(false);
                        api.executeCommand('hangup')
                    });

                    api.on("passwordRequired", function (event) {
                        api.executeCommand('password', password);
                    })
                }}
                getIFrameRef={(iframeRef) => {
                    iframeRef.style.height = '90vh';
                }}
            />
        </>
    );
}