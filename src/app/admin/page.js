"use client"
import { useState } from "react";

const ExtraRooms = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);

  const options = [
    { id: "kitchen", label: "Kitchen" },
    { id: "storage", label: "Storage" },
    { id: "more", label: "More Rooms" },
  ];

  const handleRoomSelection = (roomId) => {
    setSelectedRooms((prev) =>
      prev.includes(roomId) ? prev.filter((room) => room !== roomId) : [...prev, roomId]
    );
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg w-80 mx-auto mt-5">
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={showDropdown}
          onChange={(e) => setShowDropdown(e.target.checked)}
          className="w-5 h-5"
        />
        <span className="text-lg">Do you want any extra rooms?</span>
      </label>

      {showDropdown && (
        <div className="mt-3 border p-3 rounded-md bg-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Extra Rooms:
          </label>
          {options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={option.id}
                checked={selectedRooms.includes(option.id)}
                onChange={() => handleRoomSelection(option.id)}
                className="w-4 h-4"
              />
              <label htmlFor={option.id} className="text-md">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExtraRooms;
