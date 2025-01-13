import * as Tone from "tone";

// Create a sampler (use your own drum samples in /samples/)
export const sampler = new Tone.Sampler({
  urls: {
    C4: "kick.wav",
    D4: "snare.wav",
    E4: "hihat.wav",
  },
  baseUrl: "/samples/", // Adjust this to your folder structure
}).toDestination();

// Initialize Tone.js
export const startAudio = async () => {
  await Tone.start();
  console.log("Audio started");
};
