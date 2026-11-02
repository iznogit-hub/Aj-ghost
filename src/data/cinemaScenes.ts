export interface CinemaScene {
    id: string;
    title: string;
    act: number;
    actName: string;
    timecode: string;
    caption: string;
    gifSrc: string;
    subGifs?: string[];
    tag: string;
}

export const CINEMA_ACTS: {
    act: number;
    name: string;
    subtitle: string;
    scenes: CinemaScene[];
}[] = [
    {
        act: 1,
        name: "ACT I",
        subtitle: "The Displaced Veteran",
        scenes: [
            {
                id: "act1-1",
                title: "Corridor of Shadows",
                act: 1,
                actName: "The Displaced",
                timecode: "00:01:14:12",
                caption: "They told Ryan to 'get help'. They didn't say the help was already hunting him.",
                gifSrc: "/gif/Soldier_walking_down_corridor_7faff79d.gif",
                subGifs: [
                    "/gif/Soldier_silhouette_pauses_in_cor…_c14c5e2c.gif",
                    "/gif/Weary_soldier_walking_toward_lamp_b23f421d.gif",
                ],
                tag: "TERMINAL ECHOES",
            },
            {
                id: "act1-2",
                title: "Terminal Solitude",
                act: 1,
                actName: "Lost Hours",
                timecode: "00:01:38:04",
                caption: "Hours go missing. Voices linger in empty halls. The boundary between memory and trap begins to blur.",
                gifSrc: "/gif/Soldier_lowers_head_in_terminal_3d0dbf76.gif",
                subGifs: [
                    "/gif/Soldier_walking_in_terminal_82b8a921.gif",
                    "/gif/Soldier_walking_down_airport_cor…_9c2586e3.gif",
                ],
                tag: "FRACTURE",
            },
        ],
    },
    {
        act: 2,
        name: "ACT II",
        subtitle: "The Sedan Sanctuary",
        scenes: [
            {
                id: "act2-1",
                title: "White Knuckles",
                act: 2,
                actName: "Sanctuary",
                timecode: "00:02:44:18",
                caption: "A parked sedan in a desolate lot. When you have nowhere left to retreat, a locked door is all you have.",
                gifSrc: "/gif/Man_slumped_in_parked_sedan_7ffe03dc.gif",
                subGifs: [
                    "/gif/Trembling_hands_on_steering_wheel_710e84e1.gif",
                    "/gif/Man_gripping_steering_wheel_383b8b05.gif",
                ],
                tag: "ISOLATION",
            },
            {
                id: "act2-2",
                title: "Tremor & Will",
                act: 2,
                actName: "The Collapse",
                timecode: "00:02:59:22",
                caption: "Hands shaking against the wheel. The adrenaline never left. Only the war changed shape.",
                gifSrc: "/gif/Man_buries_head_in_car_23274e75.gif",
                subGifs: [
                    "/gif/Hands_holding_steering_wheel_73ef354d.gif",
                    "/gif/Man_staring_from_sedan_window_36ad36f3.gif",
                ],
                tag: "PARANOIA",
            },
        ],
    },
    {
        act: 3,
        name: "ACT III",
        subtitle: "The 72-Hour Warning",
        scenes: [
            {
                id: "act3-1",
                title: "Yellow Windshield Notice",
                act: 3,
                actName: "The Clock Starts",
                timecode: "00:03:12:09",
                caption: "Three days. That's what the slip of paper gave him. But the predator in the gray suit had been counting for weeks.",
                gifSrc: "/gif/Dusty_windshield_with_yellow_notice_15e263c5.gif",
                subGifs: [
                    "/gif/Paper_notice_flutters_in_wind_150a6098.gif",
                    "/gif/Yellow_notice_on_sedan_windshield_d75264a5.gif",
                ],
                tag: "72 HOURS",
            },
            {
                id: "act3-2",
                title: "Fluttering in the Wind",
                act: 3,
                actName: "Tearing Paper",
                timecode: "00:03:41:15",
                caption: "Every second that flutters past closes the trap. No one is coming to look for a soldier society forgot.",
                gifSrc: "/gif/Windshield_notice_tearing_in_wind_2ccdc54c.gif",
                subGifs: [
                    "/gif/Windshield_paper_trembling_in_da…_2513829f.gif",
                    "/gif/Note_on_car_windshield_49988651.gif",
                ],
                tag: "COUNTDOWN",
            },
        ],
    },
    {
        act: 4,
        name: "ACT IV",
        subtitle: "The Predator in the Dark",
        scenes: [
            {
                id: "act4-1",
                title: "The Figure in the Alley",
                act: 4,
                actName: "He Watches",
                timecode: "00:04:19:01",
                caption: "He doesn't target politicians. He hunts the invisible ones. The ones no one will ever look for.",
                gifSrc: "/gif/Figure_watching_street_at_night_99884dfe.gif",
                subGifs: [
                    "/gif/Figure_watching_dark_alleyway_f82a2ae2.gif",
                    "/gif/Silhouetted_figure_standing_on_wall_5b64b22c.gif",
                ],
                tag: "THE PREDATOR",
            },
            {
                id: "act4-2",
                title: "Desolate Avenue",
                act: 4,
                actName: "The Trap Closes",
                timecode: "00:04:55:18",
                caption: "When you finally realize someone has been orchestrating every step... it's already too late.",
                gifSrc: "/gif/Figure_looking_down_desolate_avenue_c2c0b5a7.gif",
                subGifs: [
                    "/gif/Figure_leaning_against_wall_7f9078d4.gif",
                    "/gif/Figure_watching_street_through_f…_d0734d78.gif",
                ],
                tag: "SURVIVAL",
            },
        ],
    },
];

export const ALL_FEATURED_SCENES: CinemaScene[] = CINEMA_ACTS.flatMap(act => act.scenes);
