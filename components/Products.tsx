import { Html, useScroll } from "@react-three/drei";
import { Group, Vector3 } from "three";
import Card from "./Card";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Products() {
  const scroll = useScroll();
  const htmlPosition = new Vector3(3, -1, 8);

  return (
    <Html portal={{ current: scroll.fixed }} position={htmlPosition} fullscreen>
      <div className="flex justify-center items-center h-screen flex-col mt-24 md:mt-0">
        <div className="flex flex-col md:flex-row items-center gap-1">
          <Card
            title={"Bespoke Website"}
            description={
              "Your Very Own Awesome Website: We make special websites that look and feel amazing, showing off your properties and enhancing your image!"
            }
            price={1000}
            offerPrice={999}
          />

          <Card
            title={"SA Chat Assistant"}
            description={
              "A Super Helper for AirBnB: It's like having a friendly personal assistant that answers questions and helps with bookings for your short term rentals, available 24/7!"
            }
            headlineItem={true}
            price={1000}
            offerPrice={999}
          />

          <Card
            title={"Booking System"}
            description={
              "Easy Booking Magic: We have a tool that helps you take bookings from guests without any fuss. You get to be in charge and keep all the money!"
            }
            price={1000}
            offerPrice={999}
          />
        </div>
        <button className="bg-beige text-white p-3 rounded-md my-2 md:my-5">
          Contact Us
        </button>
      </div>
    </Html>
  );
}
