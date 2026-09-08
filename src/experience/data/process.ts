export interface ProcessStep {
  index: string;
  title: string;
  line: string;
}

/**
 * How ZERIV works — English expression of the studio's existing process
 * (idea → strategy → design → development → launch / ongoing care).
 */
export const methodSteps: ProcessStep[] = [
  {
    index: "01",
    title: "DISCOVER",
    line: "We listen to the vision, the constraints and the real goal — then turn them into a plan.",
  },
  {
    index: "02",
    title: "DESIGN",
    line: "Interfaces and identity with a point of view — systems, motion, detail.",
  },
  {
    index: "03",
    title: "BUILD",
    line: "Clean engineering. Fast, secure, ready to scale.",
  },
  {
    index: "04",
    title: "LAUNCH",
    line: "We ship, watch the first users, and stay with the product as it goes live.",
  },
  {
    index: "05",
    title: "EVOLVE",
    line: "The work continues after launch — iteration, care, the next version.",
  },
];
