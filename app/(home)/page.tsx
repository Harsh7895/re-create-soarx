import React from "react";
import HomeSlider from "./_components/HomeSlider";
import OurAim from "./_components/OurAim";
import { getAllEvents } from "@/services/events";
import Events from "./_components/Events";
import Partners from "./_components/Partner";
import PressClippings from "./_components/PressClippings";
import Testimonial from "./_components/Testimonial";
import Discord from "./_components/Discord";

const HomePage = async () => {
  const events = await getAllEvents();
  return (
    <section>
      <HomeSlider />
      <OurAim />
      <Events events={events!} />
      <Partners />
      <PressClippings />
      <Testimonial />
      <Discord />
    </section>
  );
};

export default HomePage;
