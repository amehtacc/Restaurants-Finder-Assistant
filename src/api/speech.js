/**
 * Initializes speech recognition and processes user input.
 *
 * @param {function} onResult - Callback function to handle recognized speech.
 * @param {function} onError - Callback function to handle errors during recognition.
 */
export const startSpeechRecognition = (onResult, onError) => {
  // Check if the browser supports the SpeechRecognition API (or webkitSpeechRecognition for older versions).
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  // Create a new SpeechRecognition instance.
  const recognition = new SpeechRecognition();

  // Set the recognition language to English (US).
  recognition.lang = "en-US";

  /**
   * Event handler for successful speech recognition.
   * Extracts and processes the recognized speech.
   */
  recognition.onresult = (event) => {
    // Retrieve the recognized text from the first result.
    const userSpeech = event.results[0][0].transcript.toLowerCase();

    // Pass the recognized text to the callback function for further processing.
    onResult(userSpeech);
  };

  /**
   * Event handler for errors during speech recognition.
   * Logs the error and triggers the provided error callback.
   */
  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);

    // Notify the user of the error using the provided callback function.
    onError("Error occurred. Please try again.");
  };

  // Start listening for speech input.
  recognition.start();
};

/**
 * Converts text to speech using the Web Speech API.
 *
 * @param {string} text - The text to be spoken aloud.
 */
export const speakText = (text) => {
  // Create a new SpeechSynthesisUtterance instance for text-to-speech conversion.
  const speech = new SpeechSynthesisUtterance(text);

  // Set the language of the speech output to English (US).
  speech.lang = "en-US";

  // Speak the provided text using the browser's speech synthesis engine.
  window.speechSynthesis.speak(speech);
};
