import React from "react";

interface CardProps {
  title: string;
  description: string;
  headlineItem?: boolean | false;
  price: number;
  offerPrice?: number;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  headlineItem,
  price,
  offerPrice,
}) => {
  return (
    <div className="card ">
      <div
        className={`rounded overflow-hidden shadow-lg w-[88vw] min-h-[380px] ${
          headlineItem
            ? "h-[24vh] md:h-[55vh] md:w-[33vw]"
            : "h-[20vh] md:h-[50vh] md:w-[30vw]"
        } `}
      >
        {headlineItem && (
          <div className="bg-red-500  text-white text-right p-2 text-xs font-semibold rounded-tl">
            Popular
          </div>
        )}

        <div className="flex px-2 flex-col md:px-6 py-4 h-[90%]">
          <div className="font-bold text-xl mb-2">{title}</div>
          <div className="hidden text-gray-500 text-lg md:flex items-center gap-x-4">
            What is it
            <div className="h-px flex-auto bg-gray-500" />
          </div>

          <div className="mt-0 md:mt-10 text-smokeyGrey text-lg flex items-center gap-x-4">
            {description}
          </div>

          <div className="mt-auto mb-0 md:mb-5 flex gap-2 pt-3 ">
            {offerPrice && (
              <div className="text-gray-500 font-semibold text-2xl line-through">
                £{price}
              </div>
            )}
            <div className="text-darkPink font-semibold text-4xl md:text-5xl lg:text-7xl">
              £{offerPrice || price}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
