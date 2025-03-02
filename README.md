# Restaurant Finder Assistant

## 📌 Project Overview

The **Voice Assistant Restaurant Finder** is a React-based web application that allows users to find nearby restaurants using voice commands. The app leverages speech recognition, text-to-speech, and geolocation to provide users with an interactive experience.

## 🚀 Live Project

Here's a live demo link: [Restaurant Finder Assistant](https://restaurants-finder-assistant.netlify.app/)

## 🎯 Features

- 🎙️ **Voice Command Recognition** - Users can ask for restaurant recommendations via voice.
- 🗺️ **Geolocation-Based Results** - Fetches nearby restaurants based on the user's location.
- 🔊 **Text-to-Speech Feedback** - Reads out the restaurant names.
- 📍 **Restaurant Listings** - Displays restaurant details such as name, cuisine, contact, address, and website.
- 🔄 **Smooth Scrolling** - Button for automatically scrolls to restaurant results when available.

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS
- **APIs:** Geoapify (for restaurant data), Web Speech API (for voice recognition & synthesis)
- **Other:** JavaScript, HTML, CSS

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/amehtacc/Restaurants-Finder-Assistant.git
cd restaurant-finder-assistant
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Set Up API Keys

- Create an account on [Geoapify](https://www.geoapify.com/) and obtain an API key.
- Store your API key in a `.env` file like this:
  ```bash
  VITE_GEOAPIFY_API_KEY=your_api_key_here
  ```

### 4️⃣ Start the Development Server

```bash
npm run dev
```

## 📂 Project Structure

```
restaurant-finder-assistant/
│── public/
│── src/
│   ├── api/
│   │   ├── geoapify.js  # Fetches restaurants data
│   │   ├── speech.js    # Handles speech recognition & text-to-speech
│   ├── assets/ # Contains images like mic.png
│   ├── components/
│   │   ├── RestaurantCard.jsx  # Displays restaurant details
│   │   ├── VoiceAssistant.jsx  # Main voice assistant component
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│── package.json
│── README.md
```

## 📝 Usage Instructions

1. Click the **microphone button** to start voice recognition.
2. Say something like *"Find 5 restaurants near me"* or *"Show food places nearby"*.
3. The assistant will fetch and read out the restaurant names.
4. The list of restaurants will be displayed on the page.
5. If no restaurants are found, the assistant will notify you.

## 🔥 Future Enhancements

- ✅ Add filtering options (e.g., cuisine type, price range)
- ✅ Improve speech recognition accuracy
- ✅ Add a map view for restaurant locations

## 🏆 Credits

Developed by **Aryan Mehta** 🚀

## 📜 License

This project is open-source under the MIT License.

