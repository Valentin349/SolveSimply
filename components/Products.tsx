import Card from "./Card";

export default function Products(){
    return (
        <div className="relative flex flex-col md:flex-row gap-1 my-auto">
          <Card
            title={"Bespoke Website"}
            description={
              "Your Very Own Awesome Website: We make special websites that look and feel amazing, showing off your properties and enhancing your image!"
            }
            price={300}
          />

          <Card
            title={"SA Chat Assistant"}
            description={
              "A Super Helper for AirBnB: It's like having a friendly personal assistant that answers questions and helps with bookings for your short term rentals, available 24/7!"
            }
            headlineItem={true}
            price={799}
            offerPrice={550}
          />

          <Card
            title={"Booking System"}
            description={
              "Easy Booking Magic: We have a tool that helps you take bookings from guests without any fuss. You get to be in charge and keep all the money!"
            }
            price={499}
            offerPrice={350}
          />
        </div>
    );
}