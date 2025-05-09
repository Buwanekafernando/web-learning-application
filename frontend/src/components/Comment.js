import React from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Comment({ text }) {
  return (
    <div className="bg-white text-black p-3 rounded-md flex items-start gap-2">
      <FaUserCircle className="text-2xl mt-1" />
      <p>{text}</p>
    </div>
  );
}
