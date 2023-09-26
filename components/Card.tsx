import React from "react";

interface CardProps {
  title: string;
  description: string;
  headlineItem?: boolean | false;
  vector: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  headlineItem,
  vector,
}) => {
  return (
    <div className="card">
      <div
        className={`max-w-sm rounded overflow-hidden shadow-lg w-[64vw]  ${
          headlineItem ? "h-[24vh] md:h-[55vh] md:w-[33vw]" : "h-[20vh] md:h-[50vh] md:w-[30vw]"
        }`}
      >
        {headlineItem && (
          <div className="bg-red-500  text-white text-right p-2 text-xs font-semibold rounded-tl">
            Popular
          </div>
        )}

        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <div className="text-gray-700 text-base">{description}</div>

          <div className="mt-4">
            <div className="text-gray-500 font-semibold text-3xl line-through">
              £1000
              
            </div>
            <div className="text-darkPink font-semibold text-4xl">
              £999
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
