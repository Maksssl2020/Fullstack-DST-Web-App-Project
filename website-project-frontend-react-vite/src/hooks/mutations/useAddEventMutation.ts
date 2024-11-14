import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { handleAddNewEvent } from "../../helpers/api-integration/EventsHandling.js";

function UseAddEventMutation(onSuccessCallback) {
  const queryClient = useQueryClient();

  const { mutate: addEvent, isLoading: addingEvent } = useMutation({
    mutationKey: ["addNewEvent"],
    mutationFn: (eventData) => handleAddNewEvent(eventData),
    onSuccess: () => {
      queryClient.invalidateQueries(["eventsData"]);

      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error) => console.log(error),
  });

  return { addEvent, addingEvent };
}

export default UseAddEventMutation;
