// Lab highlights. Each card shows a real photo or screenshot from the lab with
// its key result as a label; full source, screenshots, and write-ups live in
// the engineering-labs repo.
export const LABS_REPOSITORY = "https://github.com/KhaledM03/engineering-labs";

export const labHighlights = [
  {
    id: "alu",
    image: {
      src: "/media/gallery/nexys-a7.webp",
      width: 1200,
      height: 1200,
      position: "50% 62%",
      alt: "Nexys A7 Artix-7 FPGA board with its seven-segment display lit",
    },
    result: "Testbench: 8 of 8 checks pass",
    course: "Digital Design · VHDL on FPGA",
    title: "4-bit ALU",
    summary:
      "Eight operations (add, subtract, increment, decrement, AND, OR, NOT, XOR) in VHDL for a Nexys A7 board, with a self-checking testbench that asserts every result.",
    href: `${LABS_REPOSITORY}/tree/main/digital-design-vhdl/02-four-bit-alu`,
  },
  {
    id: "max-power",
    image: {
      src: "/media/engineering-lab/electronics-bench-04.webp",
      width: 1350,
      height: 1800,
      position: "50% 68%",
      alt: "Resistor network on perfboard clipped to test leads, with a decade resistance box and an oscilloscope on the lab bench",
    },
    result: "Peak power 10.39 W at the matched load",
    course: "Network Analysis · Multisim",
    title: "Thévenin and maximum power",
    summary:
      "Reduced a resistor network to a 90.8 V, 198 Ω Thévenin equivalent, checked it against the original circuit, then swept the load to confirm power peaks when the load matches the Thévenin resistance.",
    href: `${LABS_REPOSITORY}/tree/main/circuit-analysis-multisim/02-thevenin-norton-max-power`,
  },
  {
    id: "comparator",
    image: {
      src: "/media/lab-comparator-logisim.webp",
      width: 636,
      height: 601,
      fit: "contain",
      alt: "Logisim circuit: two 4-bit inputs feed unsigned and two's-complement comparator subcircuits, with a mode input selecting the less-than, equal, and greater-than outputs",
    },
    result: "Unsigned or two's complement, one switch",
    course: "Digital logic · Logisim",
    title: "Controlled comparator",
    summary:
      "Compares two 4-bit numbers as unsigned or two's complement, chosen by a control input, built from my own less-than, equal, and greater-than subcircuits.",
    href: `${LABS_REPOSITORY}/tree/main/logisim`,
  },
];
