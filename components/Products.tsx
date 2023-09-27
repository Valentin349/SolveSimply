import { Html, useScroll } from "@react-three/drei";
import { Vector3 } from "three";
import Card from "./Card";
import ContactForm from "./ContactForm";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Products() {
  const scroll = useScroll();
  const htmlPosition = new Vector3(3, -1, 8);
  const ref = useRef<HTMLDivElement>(null)

  useFrame(() => {

    ref.current!.style.transform = `translateY(-${200 * scroll.range(0.9,0.1)}%)`
  })

  return (
    <Html ref={ref} portal={{ current: scroll.fixed }} position={htmlPosition} fullscreen>
      <div className="flex items-center h-screen flex-col mt-48 top-[-2rem]">
        <div className="relative flex flex-col md:flex-row gap-1 my-auto">
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

        <ContactForm/>
      </div>
    </Html>
  );
}
