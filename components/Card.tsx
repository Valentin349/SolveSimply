import React from "react";

interface CardProps {
  title: string;
  description: string;
  vector: React.ReactNode; // Accept an SVG element or any React component
}

const Card: React.FC<CardProps> = ({ title, description, vector }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="p-4">{vector}</div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <div className="text-gray-700 text-base">{description}</div>
      </div>
    </div>
  );
};

export default Card;
