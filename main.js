import * as Tone from "tone";
import { startAudio } from "./audio.js";
import { renderSequencer, sequencerState, scheduleSequencer } from "./sequencer.js";

// DOM Elements
const startButton = document.getElementById("start-btn");
const bpmInput = document.getElementById("bpm-input");
const sequencerContainer = document.getElementById("sequencer");

// Toggle step in the sequencer state
const toggleStep = (rowIndex, stepIndex) => {
  sequencerState[rowIndex][stepIndex] = !sequencerState[rowIndex][stepIndex];
  renderSequencer(sequencerContainer, toggleStep);
};

// Initialize the app
const init = async () => {
  renderSequencer(sequencerContainer, toggleStep);

  // Start audio and sequencer on button click
  startButton.addEventListener("click", async () => {
    await startAudio();
    Tone.Transport.start();
    console.log("Sequencer started!");
  });

  // Update BPM
  bpmInput.addEventListener("input", (e) => {
    Tone.Transport.bpm.value = parseInt(e.target.value, 10);
  });

  scheduleSequencer();
};

// Start the app
init();
