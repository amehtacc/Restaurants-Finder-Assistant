import React from "react";
import foodPlateImage from "../assets/plate.png"
/**
 * A reusable component to display restaurant details in a styled card format.
 *
 * @param {string} name - The name of the restaurant.
 * @param {string} cuisine - The type of cuisine served at the restaurant.
 * @param {number} seating_capacity - The seating capacity of the restaurant.
 * @param {string} contact - The restaurant's contact number.
 * @param {string} email - The restaurant's email address.
 * @param {string} address - The physical address of the restaurant.
 * @param {string} website_url - The website link for the restaurant.
 */
function RestaurantCard({
  name,
  cuisine,
  seating_capacity,
  contact,
  email,
  address,
  website_url,
}) {
  return (
    <div className="w-[1000px] h-[350px] flex bg-yellow-200 rounded-xl shadow-xl border-6 border-green-500">
      {/* Left Section: Displays a food plate image and restaurant name */}
      <div className="w-[30%] p-2 flex flex-col items-center">
        <img className="w-60" src={foodPlateImage} alt="Food Plate" />
        <p className="font-bold text-xl text-center">{name}</p>
      </div>

      {/* Divider Line */}
      <div className="w-[2px] bg-gray-500"></div>

      {/* Right Section: Displays restaurant details */}
      <div className="w-[70%] p-5 flex flex-col flex-wrap justify-between font-semibold">
        <p>
          <b>Cuisine:</b> {cuisine ? cuisine : "Not Available"}
        </p>
        <p>
          <b>Capacity:</b>{" "}
          {seating_capacity ? seating_capacity : "Not Available"}
        </p>
        <p>
          <b>Phone:</b> {contact ? contact : "Not Available"}
        </p>
        <p>
          <b>Email:</b> {email ? email : "Not Available"}
        </p>
        <p>
          <b>Address:</b> {address ? address : "Not Available"}
        </p>

        {/* Website Button: Displays a button linking to the restaurant's website if available */}
        {website_url ? (
          <button className="w-full h-10 bg-blue-400 rounded-lg cursor-pointer border-4 border-transparent hover:bg-blue-500 hover:border-blue-700 hover:text-white transition-all duration-300">
            <a href={website_url} target="_blank" rel="noopener noreferrer">
              Visit Website →
            </a>
          </button>
        ) : (
          <button className="w-full h-10 bg-blue-400 rounded-lg cursor-pointer border-4 border-transparent hover:bg-blue-500 hover:border-blue-700 hover:text-white transition-all duration-300">
            Website Not Available!
          </button>
        )}
      </div>
    </div>
  );
}

export default RestaurantCard;
