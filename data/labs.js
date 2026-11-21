// Lab highlights. Each card draws its key result (components/work/LabFigures);
// full source, screenshots, and write-ups live in the engineering-labs repo.
export const LABS_REPOSITORY = "https://github.com/KhaledM03/engineering-labs";

export const labHighlights = [
  {
    id: "alu",
    figure: "alu",
    course: "Digital Design · VHDL on FPGA",
    title: "4-bit ALU",
    summary:
      "Eight operations (add, subtract, increment, decrement, AND, OR, NOT, XOR) in VHDL for a Nexys A7 board, with a self-checking testbench that asserts every result.",
    href: `${LABS_REPOSITORY}/tree/main/digital-design-vhdl/02-four-bit-alu`,
  },
  {
    id: "max-power",
    figure: "power",
    course: "Network Analysis · Multisim",
    title: "Thévenin and maximum power",
    summary:
      "Reduced a resistor network to a 90.8 V, 198 Ω Thévenin equivalent, checked it against the original circuit, then swept the load to confirm power peaks when the load matches the Thévenin resistance.",
    href: `${LABS_REPOSITORY}/tree/main/circuit-analysis-multisim/02-thevenin-norton-max-power`,
  },
  {
    id: "comparator",
    figure: "comparator",
    course: "Digital logic · Logisim",
    title: "Controlled comparator",
    summary:
      "Compares two 4-bit numbers as unsigned or two's complement, chosen by a control input, built from my own less-than, equal, and greater-than subcircuits.",
    href: `${LABS_REPOSITORY}/tree/main/logisim`,
  },
];
