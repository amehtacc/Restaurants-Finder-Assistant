import React, { useState } from "react";
import { getRestaurants } from "../api/geoapify"; // Function to fetch restaurant data from Geoapify API
import { startSpeechRecognition, speakText } from "../api/speech"; // Functions to handle voice input and text-to-speech
import RestaurantCard from "./RestaurantCard"; // Component to display restaurant details
import micImage from "../assets/mic.png"

// Main VoiceAssistant Component
export default function VoiceAssistant() {
  // State variables to manage UI messages and restaurant data
  const [message, setMessage] = useState(
    "Click the Button (Mic) and ask for food suggestions!"
  );
  const [scrollMessage, setScrollMessage] = useState(false); // Controls visibility of scroll-down prompt
  const [restaurantsDetails, setRestaurantsDetails] = useState([]); // Stores fetched restaurant data

  // Function to start voice recognition when the mic button is clicked
  const startListening = () => {
    setMessage("Listening..."); // Update UI message to indicate that the assistant is listening
    startSpeechRecognition(handleSpeechResult, handleSpeechError); // Start speech recognition process
  };

  // Function to process the recognized speech input
  const handleSpeechResult = async (userSpeech) => {
    setMessage(`You said: "${userSpeech}"`); // Display the recognized speech

    // Extract number from speech (e.g., "Show me 10 restaurants" → extracts "10")
    const numberMatch = userSpeech.match(/\d+/); // Regex to find numbers in the speech
    const count = numberMatch ? parseInt(numberMatch[0]) : 5; // Default to 5 restaurants if no number is specified

    // Check if user mentioned "food" or "restaurant" in their speech
    if (userSpeech.includes("food") || userSpeech.includes("restaurant")) {
      getNearbyRestaurants(count); // Fetch restaurant data based on the extracted number
    } else {
      speakText("Sorry, I didn't understand. Please ask about food near you."); // Provide feedback if request is unclear
      setMessage("Sorry, I didn't understand. Please ask about food near you.")
    }
  };

  // Function to handle errors during speech recognition
  const handleSpeechError = (errorMessage) => {
    setMessage(errorMessage); // Update UI with error message
  };

  // Function to fetch nearby restaurants based on user's location
  const getNearbyRestaurants = async (count) => {
    speakText(`Finding the top ${count} restaurants near you...`); // Inform user that search is in progress

    // Check if geolocation is available in the user's browser
    if (!navigator.geolocation) {
      speakText("Geolocation is not supported by your browser."); // Notify user if geolocation is unavailable
      return;
    }

    // Get user's current latitude and longitude
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const nearbyRestaurants = await getRestaurants(lat, lng, count); // Fetch restaurants using API
      
      // Check if any restaurants were found
      if (nearbyRestaurants.length === 0) {
        speakText("Sorry, I couldn't find any restaurants near you."); // Notify user if no results are found
        return;
      }

      setRestaurantsDetails(nearbyRestaurants); // Store the fetched restaurant data in state

      // Generate a list of restaurant names to read out to the user
      const names = nearbyRestaurants
        .map((r, i) => `${i + 1}. ${r.properties.name || "Unnamed Restaurant"}`)
        .join(", ");
      speakText(`Here are the top ${count} restaurants near you, Click on Scroll Down button to see more details: ${names}`);

      setScrollMessage(true); // Show scroll-down message
    });
  };

  // Function to smoothly scroll down to restaurant list
  const handleScroll = () => {
    window.scrollTo({
      top: 700, // Scrolls to the restaurant section
      behavior: "smooth", // Enables smooth scrolling animation
    });
    setScrollMessage(false); // Hide scroll message after scrolling
  };

  return (
    <>
      {/* Main container for the voice assistant UI */}
      <div className="w-full flex flex-col items-center justify-between">
        {/* Display message box */}
        <div className="w-[550px] h-[280px] rounded-xl border-8 border-yellow-200 flex flex-col justify-between items-center px-3 py-5 text-center bg-[#21262C] absolute top-10">
          <h1 className="text-4xl font-extrabold text-white text-center">
            Find The Best Restaurants Near You
          </h1>
          <p className="text-xl font-semibold text-white mb-4">{message}</p>
        </div>

        {/* Microphone button to start voice input */}
        <div className="w-full h-72 flex justify-center items-center absolute top-[370px]">
          <button onClick={startListening}>
            <img
              className="w-60 cursor-pointer"
              src={micImage}
              alt="mic"
            />
          </button>
        </div>

        {/* Scroll down prompt if restaurants are found */}
        {scrollMessage && (
          <button
            onClick={handleScroll}
            className="flex flex-col justify-center items-center absolute top-[650px] cursor-pointer"
          >
            <span className="font-semibold">^</span>
            <p className="font-medium -mt-2">Scroll Down</p>
          </button>
        )}
      </div>

      {/* Section to display the list of restaurants */}
      <div className="w-full flex flex-col justify-center items-center absolute top-[700px] px-32 mt-20">
        {restaurantsDetails?.map((restaurant, index) => (
          <div key={index} className="mb-20">
            <RestaurantCard
              name={restaurant?.properties?.name} // Restaurant name
              cuisine={restaurant?.properties?.catering?.cuisine?.slice(0, 70)} // Cuisine type (limited to 70 characters)
              seating_capacity={restaurant?.properties?.catering?.capacity} // Seating capacity
              contact={restaurant?.properties?.contact?.phone} // Contact phone number
              email={restaurant?.properties?.contact?.email} // Contact email
              address={restaurant?.properties?.address_line2} // Address
              website_url={restaurant?.properties?.datasource?.raw?.website} // Website URL
            />
          </div>
        ))}
      </div>
    </>
  );
}
