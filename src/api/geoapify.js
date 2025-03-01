// Import the API key from environment variables (stored securely in .env file).
// Using import.meta.env ensures that sensitive information is not hardcoded into the source code.
const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

/**
 * Fetches nearby restaurants based on the user's latitude and longitude.

 * @param {number} lat - The latitude of the user's current location.
 * @param {number} lng - The longitude of the user's current location.
 * @param {number} count - The number of restaurant results to fetch.
 * @returns {Promise<Array>} - A promise that resolves to an array of restaurant objects.
 */

export async function getRestaurants(lat, lng, count) {
    // Construct the API request URL using the provided latitude, longitude, and count.
    // - `categories=catering.restaurant`: Filters results to return only restaurants.
    // - `filter=circle:${lng},${lat},5000`: Searches within a 5km radius around the given location.
    // - `limit=${count}`: Limits the number of results to the specified count.
    // - `apiKey=${API_KEY}`: Appends the API key for authentication.
    
    const url = `https://api.geoapify.com/v2/places?categories=catering.restaurant&filter=circle:${lng},${lat},5000&limit=${count}&apiKey=${API_KEY}`;

    try {
        // Make an API request using the fetch() function.
        const response = await fetch(url);

        // Parse the response as JSON.
        const data = await response.json();

        // Return the list of restaurants extracted from the API response.
        // The relevant data is stored inside the `features` array.
        return data.features;
    } catch (error) {
        // Log an error message to the console if the API request fails.
        console.error("Error fetching restaurant data:", error);

        // Return an empty array to avoid breaking the application in case of an error.
        return [];
    }
};
