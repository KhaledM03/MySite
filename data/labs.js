// Lab highlights. Full source and write-ups live in the engineering-labs repo.
export const LABS_REPOSITORY = "https://github.com/KhaledM03/engineering-labs";

export const labHighlights = [
  {
    id: "alu",
    course: "Digital Design · VHDL on FPGA",
    title: "4-bit ALU",
    summary:
      "Eight operations (add, subtract, increment, decrement, AND, OR, NOT, XOR) in VHDL for a Nexys A7 board, with a self-checking testbench that asserts every result.",
    image: {
      src: "/media/labs/alu-waveform.webp",
      width: 996,
      height: 589,
      alt: "Vivado simulation waveform showing the ALU's inputs, select lines, and results",
    },
    href: `${LABS_REPOSITORY}/tree/main/digital-design-vhdl/02-four-bit-alu`,
  },
  {
    id: "max-power",
    course: "Network Analysis · Multisim",
    title: "Thévenin and maximum power",
    summary:
      "Reduced a resistor network to a 90.8 V, 198 Ω Thévenin equivalent, checked it against the original circuit, then swept the load to show power peaks at about 198 Ω.",
    image: {
      src: "/media/labs/max-power-curve.webp",
      width: 723,
      height: 309,
      fit: "contain",
      alt: "Multisim parameter sweep of load power against resistance, peaking near 198 ohms",
    },
    href: `${LABS_REPOSITORY}/tree/main/circuit-analysis-multisim/02-thevenin-norton-max-power`,
  },
  {
    id: "comparator",
    course: "Digital logic · Logisim",
    title: "Controlled comparator",
    summary:
      "Compares two 4-bit numbers as unsigned or two's complement, chosen by a control input, built from my own less-than, equal, and greater-than subcircuits.",
    image: {
      src: "/media/labs/logisim-comparator.webp",
      width: 723,
      height: 677,
      position: "center 20%",
      alt: "Logisim circuit with unsigned and two's-complement comparator blocks feeding multiplexers",
    },
    href: `${LABS_REPOSITORY}/tree/main/logisim`,
  },
];
