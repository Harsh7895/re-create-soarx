"use client";
import Link from "next/link";
import React, { useState, useRef, useTransition } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import { Event } from "@prisma/client";
import { deleteEvent } from "@/actions/event";
interface EventProps {
  events: Event[];
}
const AdminEvents = ({ events }: EventProps) => {
  const toast = useRef<any>(null);
  const [isPending, startTransition] = useTransition();

  const accept = (id: string) => {
    startTransition(() => deleteEvent(id));
    toast.current.show({
      severity: "warn",
      summary: "Confirmed",
      detail: "You have successfully deleted",
      life: 3000,
    });
  };

  const reject = () => {
    toast.current.show({
      severity: "info",
      summary: "Rejected",
      detail: "You have cancelled",
      life: 3000,
    });
  };

  const confirm2 = (id: string) => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => accept(id),
      reject,
    });
  };

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium">All Events</h2>
        <Link href={"/admin/event/add"}>
          <button className="btn-primary">Add Events</button>
        </Link>
      </div>
      <section className="all-events pt-8">
        <div className="grid-4">
          {events.map((e) => (
            <div className="events-box aim-box" key={e.id}>
              <div className="events-img">
                <Image
                  src={e.imageUrl}
                  alt="Banner"
                  className="img-responsive"
                  width={300}
                  height={200}
                />
              </div>
              <div className="event-content">
                <h2 className="text-2xl font-medium">{e.title}</h2>
                <p className="pt-2">{e.description.slice(0, 180) + "..."}</p>
                <p className="pt-2 flex items-center gap-2 font-medium">
                  <AiOutlineCalendar />
                  {formatDate(e.createdAt)}
                </p>
                <div className="flex items-center gap-3">
                  {/* <Link href={`/admin/events/edit/${e.id}`}>
                    <button className="btn-primary mt-4">Edit</button>
                  </Link> */}
                  <button
                    className="btn-primary red mt-4"
                    onClick={() => confirm2(e.id)}
                  >
                    Delete
                  </button>
                  <Link
                    href={`/admin/event/edit/${e.id}`}
                    className="btn-primary red mt-4"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default AdminEvents;
