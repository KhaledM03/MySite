// Hands-on personal builds. Wording follows the canonical résumé PDF.
export const builds = [
  {
    id: "fpv-drone",
    title: "Custom FPV drone",
    summary:
      "Built a custom first-person-view quadcopter, programmed a TX15 radio transmitter, and bound it to the drone’s ExpressLRS receiver so both run on the same radio link. Then I learned to fly it from the live camera feed.",
    tags: ["ExpressLRS", "TX15 transmitter", "FPV video", "Flight testing"],
    image: {
      src: "/media/builds/fpv-drone.webp",
      width: 1050,
      height: 1050,
      alt: "Small FPV quadcopter with clear prop guards and a front-mounted camera on a blue repair mat",
    },
    video: {
      youtubeId: "DPGMJUyqAjA",
      title: "Flying my FPV drone in class",
      url: "https://youtu.be/DPGMJUyqAjA",
    },
  },
  {
    id: "window-shelf",
    title: "3D-printed window shelf",
    summary:
      "Designed a window-mounted plant shelf in Fusion 360: a tray with a raised lip, a plate that screws to the sill, and a triangular brace underneath. Then I printed it, and it's been holding a cactus ever since.",
    tags: ["Fusion 360", "CAD", "3D printing", "Design for fit"],
    image: {
      src: "/media/engineering-lab/cad-study-01.webp",
      width: 1561,
      height: 939,
      alt: "Fusion 360 model of a window shelf with a lipped tray, a mounting plate with screw holes, and a triangular support brace",
    },
  },
  {
    id: "fm-walkie-talkies",
    title: "FM walkie-talkie pair",
    summary:
      "Hand-soldered and assembled two DIY FM radio walkie-talkies: the PCB components, OLED display, push-button controls, speaker, and antenna, each mounted in its own clear enclosure.",
    tags: ["Soldering", "PCB assembly", "OLED display", "Antennas"],
    image: {
      src: "/media/builds/fm-walkie-talkies.webp",
      width: 1340,
      height: 990,
      alt: "Two hand-assembled FM walkie-talkie boards with OLED displays, push buttons, and coiled antennas in clear cases",
    },
  },
];
