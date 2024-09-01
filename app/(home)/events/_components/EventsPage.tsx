"use client";
import React from 'react';
import Events from "./Events";

import { getOngoingEvents, getPastEvents } from "@/services/events";
import TemporaryEmptyEvents from "@/components/TemporaryEmptyEvents";


const EventPage = async (events: any) => {

  const pastevents = await getPastEvents()
  const ongoingevents = await getOngoingEvents();
  let pastEvents = null;
  let ongoingEvents = null;
  if(pastevents){
    pastEvents = pastevents.sort((a, b) => b.date.getTime() - a.date.getTime());
  }
  if(ongoingevents){
      ongoingEvents = ongoingevents.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  return (
    <section className="section lg:ml-7">
      <article className="container">
        {ongoingEvents && ongoingEvents.length > 0 ?
          <>
            <div className="pt-24">
              <h1 className="text-5xl flex justify-center font-bold">Ongoing Events</h1>
            </div>
            <div className="all-events pt-8">
              <div className="grid-4">
                {ongoingEvents?.map((e) => (
                  <Events key={e.id} {...e} />
                ))}
              </div>
            </div>
          </>
          // : <TemporaryEmptyEvents text="Empty Ongoing Events" />}
          :(<></>)}
        {
          pastEvents && pastEvents.length > 0 ?
            <>
              <div className="pt-24">
                <h1 className="text-5xl flex justify-center font-bold">Past Events</h1>
              </div>
              <div className=" pt-8">
                <div className="grid-4">
                  {pastEvents?.map((e) => (
                    <Events key={e.id} {...e} />
                  ))}
                </div>
              </div>
            </>
            : <TemporaryEmptyEvents text="Empty Past Events" />
        }
        {/* <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div> */}
      </article>
    </section>
  );
};

export default EventPage;
