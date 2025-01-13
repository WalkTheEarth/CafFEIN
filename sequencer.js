import * as Tone from "tone";
import { sampler } from "./audio.js";

const STEPS = 16; // Number of steps in the sequencer
const ROWS = [
  { name: "Kick", note: "C4" },
  { name: "Snare", note: "D4" },
  { name: "Hi-Hat", note: "E4" },
];

// Sequencer state: Array of rows, each with an array of steps
export const sequencerState = ROWS.map(() => Array(STEPS).fill(false));

// Render the sequencer grid
export const renderSequencer = (container, onToggleStep) => {
  container.innerHTML = ""; // Clear the container
  sequencerState.forEach((row, rowIndex) => {
    const rowDiv = document.createElement("div");
    rowDiv.className = "row";

    row.forEach((isActive, stepIndex) => {
      const stepDiv = document.createElement("div");
      stepDiv.className = `step ${isActive ? "active" : ""}`;
      stepDiv.addEventListener("click", () => {
        onToggleStep(rowIndex, stepIndex);
      });

      rowDiv.appendChild(stepDiv);
    });

    container.appendChild(rowDiv);
  });
};

// Schedule the sequencer to play
export const scheduleSequencer = () => {
  let currentStep = 0;

  // Schedule the sequencer to repeat every 16th note
  Tone.Transport.scheduleRepeat((time) => {
    // Trigger sounds for the current step
    sequencerState.forEach((row, rowIndex) => {
      if (row[currentStep]) {
        sampler.triggerAttackRelease(ROWS[rowIndex].note, "8n", time);
      }
    });

    // Move to the next step, looping back to the start
    currentStep = (currentStep + 1) % STEPS;
  }, "16n");
};
