import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetOneEventQuery } from "../../../rtk/eventApi/eventApi"; // تأكد من المسار الصحيح

const useViewEvent = () => {
  const { id } = useParams();

  console.log("Event ID:", id);

  const { data: eventData, isLoading, error } = useGetOneEventQuery(id);

  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (eventData?.data) {
      const mappedEvent = {
        titleAR: eventData.data.titleAR || "",
        titleEN: eventData.data.titleEN || "",
        descriptionAR: eventData.data.descriptionAR || "",
        descriptionEN: eventData.data.descriptionEN || "",
        date: eventData.data.date || "",
        locationAR: eventData.data.locationAR || "",
        locationEN: eventData.data.locationEN || "",
        photo: eventData.data.photo || null,
        images: Array.isArray(eventData.data.images) ? eventData.data.images : [],
        video: eventData.data.video || null,
        createdAt: eventData.data.createdAt ? new Date(eventData.data.createdAt) : null,
        updatedAt: eventData.data.updatedAt ? new Date(eventData.data.updatedAt) : null,
      };
      setEvent(mappedEvent);
    } else {
      setEvent(null);
    }
  }, [eventData]);

  return {
    event,
    isLoading,
    error,
  };
};

export default useViewEvent;
