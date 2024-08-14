import React from "react";
import FormItem from "../../components/form/FormItem";
import AdminForumSection from "../../components/form/AdminForumSection";
import PlusIcon from "../../icons/PlusIcon";
import { useForm } from "react-hook-form";
import DeleteIcon from "../../icons/DeleteIcon";

const EventForm = () => {
  const { register, getValues, setValue, formState, handleSubmit } = useForm();
  const { errors } = formState;
  const [tasks, setTasks] = React.useState([]);

  console.log(getValues().task);
  console.log(errors);

  const handleAddTask = () => {
    const task = getValues().task;
    if (task) {
      setTasks([...tasks, task]);
      setValue("task", ""); // Clear the input field
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddTask();
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div className="w-full h-auto flex justify-center font-lato py-8">
      <AdminForumSection
        handleSubmit={handleSubmit()}
        disabledButton={errors.length > 0}
        submitTitle={"Dodaj wydarzenie"}
      >
        <FormItem
          labelData={"Tytuł wydarzenia:"}
          containerStyling={
            "w-[650px] h-auto flex flex-col font-bold text-xl gap-2 items-center"
          }
          inputStyling={
            "h-[65px] w-full font-normal border-4 rounded-2xl px-4 py-2 focus:border-custom-orange-200"
          }
          errors={errors?.title?.message}
          register={{
            ...register("title", {
              required: "Tytuł nie może być pusty!",
            }),
          }}
        />
        <div className="w-[650px] h-auto flex flex-col gap-2">
          <label className="ml-3 text-xl font-bold">Opis wydarzenia:</label>
          <textarea
            className={`h-[500px] w-full resize-none focus:outline-none font-normal border-4 border-black rounded-2xl px-4 py-2 focus:border-custom-orange-200 ${errors?.description?.message && "border-red-500"}`}
            {...register("description", {
              required: "Opis nie może być pusty!",
            })}
          />
          {errors?.description?.message && (
            <p className="w-full text-center mt-2 text-lg text-red-500 font-bold">
              {errors?.description?.message}
            </p>
          )}
        </div>
        <FormItem
          labelData={"Data wydarzenia:"}
          type={"date"}
          containerStyling={
            "w-[650px] h-auto flex flex-col font-bold text-xl gap-2 items-center"
          }
          inputStyling={
            "h-[65px] w-full font-normal border-4 rounded-2xl px-4 py-2 focus:border-custom-orange-200"
          }
          errors={errors?.eventDate?.message}
          register={{
            ...register("eventDate", {
              required: "Data wydarzenia nie może być pusta!",
              validate: {
                futureDate: (value) =>
                  new Date(value) > new Date() ||
                  "Data wydarzenia musi być w przyszłości!",
              },
            }),
          }}
        />
        <FormItem
          labelData={"Data końca zapisów:"}
          type={"date"}
          containerStyling={
            "w-[650px] h-auto flex flex-col font-bold text-xl gap-2 items-center"
          }
          inputStyling={
            "h-[65px] w-full font-normal border-4 rounded-2xl px-4 py-2 focus:border-custom-orange-200"
          }
          errors={errors?.registrationEndDate?.message}
          register={{
            ...register("registrationEndDate", {
              required: "Data końca zapisów nie może być pusta!",
              validate: {
                beforeEventDate: (value) =>
                  new Date(value) < new Date(getValues().eventDate) ||
                  "Data końca zapisów musi być wcześniejsza niż data wydarzenia!",
                futureDate: (value) =>
                  new Date(value) > new Date() ||
                  "Data wydarzenia musi być w przyszłości!",
              },
            }),
          }}
        />
        <div className="w-[650px] flex flex-col relative group gap-2">
          <label className="ml-3 text-xl font-bold">Dodaj zadanie:</label>
          <div className={"w-[650px] h-auto flex flex-col font-bold text-xl "}>
            <input
              onKeyDown={handleKeyDown}
              className={`h-[65px] w-full font-normal border-4 border-black rounded-2xl px-4 py-2 focus:border-custom-orange-200 ${errors?.task?.message && "border-red-500"}`}
              {...register("task", {
                validate: {
                  minimumOneTask: () =>
                    tasks.length > 0 ||
                    "Liczba zadań musi wynosić co najmniej 1!",
                },
              })}
            />
            <button
              onClick={handleAddTask}
              className={`absolute group-focus-within:border-custom-orange-200 right-0 bg-custom-orange-200 size-[65px] rounded-2xl border-4 border-black flex justify-center items-center ${errors?.task?.message && "bg-red-300 border-red-500"}`}
            >
              <PlusIcon className={"size-10"} />
            </button>
          </div>
          {errors?.task?.message && (
            <label className="w-full text-center mt-2 text-lg text-red-500 font-bold">
              {errors?.task?.message}
            </label>
          )}
        </div>

        {tasks.length > 0 && (
          <ul className="w-[650px] border-4 border-black h-auto px-8 py-4 rounded-2xl text-xl space-y-2">
            {tasks.map((task, index) => (
              <li
                key={index}
                className="w-full h-[35px] flex items-center rounded-2xl hover:cursor-pointer hover:bg-custom-orange-200 px-2"
                onClick={() => handleDeleteTask(index)}
              >
                <p>{`-- ${task}`}</p>
                <DeleteIcon size={"ml-auto size-6"} />
              </li>
            ))}
          </ul>
        )}
      </AdminForumSection>
    </div>
  );
};

export default EventForm;