import React, { useState } from "react";
import AnimatedPage from "../../animation/AnimatedPage.jsx";
import AdminFormSection from "../../components/form/AdminFormSection.jsx";
import FormItem from "../../components/form/FormItem.jsx";
import PlusIcon from "../../icons/PlusIcon.jsx";
import { useForm } from "react-hook-form";
import DeleteIcon from "../../icons/DeleteIcon.jsx";
import EditIcon from "../../icons/EditIcon.jsx";
import { motion } from "framer-motion";
import AcceptIcon from "../../icons/AcceptIcon.jsx";
import Spinner from "../../components/universal/Spinner.jsx";
import { useNavigate } from "react-router-dom";
import { MuiColorInput } from "mui-color-input";
import useStatistics from "../../hooks/queries/useStatistics.js";
import useAddStatisticMutation from "../../hooks/mutations/useAddStatisticMutation.js";
import useUpdateStatisticMutation from "../../hooks/mutations/useUpdateStatisticMutation.js";
import useDeleteStatisticMutation from "../../hooks/mutations/useDeleteStatisticMutation.js";

const StatisticsForm = () => {
  const { register, reset, handleSubmit, getValues, setValue, formState } =
    useForm();
  const { errors } = formState;
  const [isEditing, setIsEditing] = useState(false);
  const [updatingStatisticId, setUpdatingStatisticId] = useState(null);
  const [color, setColor] = useState("#ffffffff");
  const navigate = useNavigate();
  const { statistics, fetchingStatistic } = useStatistics();
  const { addStatistic, addingStatistic } = useAddStatisticMutation(() => {
    setColor("#ffffffff");
    reset();
  });
  const { updateStatistic, updatingStatistic } = useUpdateStatisticMutation(
    updatingStatisticId,
    () => {
      setColor("#ffffffff");
      setIsEditing(false);
      reset();
    },
  );
  const { deleteStatistic, deletingStatistic } = useDeleteStatisticMutation();
  console.log(errors);

  const calcStatisticsValuesSum = () => {
    const sum = statistics?.reduce((acc, statistic) => {
      return acc + statistic.value;
    }, 0);

    console.log(sum);
    return sum;
  };

  const changeStatisticValues = (
    statisticId,
    currentName,
    currentValue,
    currentFieldColor,
  ) => {
    setIsEditing(true);
    setUpdatingStatisticId(statisticId);
    setValue("name", currentName);
    setValue("value", currentValue);
    setColor(currentFieldColor);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit((data) => onSubmit(data));
    }
  };

  const onSubmit = (data) => {
    if (isEditing) {
      updateStatistic({
        name: data.name,
        value: data.value,
        fieldHexColor: color,
      });
    } else {
      addStatistic({
        name: data.name,
        value: data.value,
        fieldHexColor: color,
      });
    }
  };

  if (
    fetchingStatistic ||
    addingStatistic ||
    updatingStatistic ||
    deletingStatistic
  ) {
    return <Spinner />;
  }

  return (
    <AnimatedPage>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        onKeyDown={handleKeyDown}
        className="w-full h-auto my-8 flex flex-col items-center"
      >
        <AdminFormSection
          disabledButton={calcStatisticsValuesSum() !== 100}
          handleSubmit={() => navigate(-1)}
          submitTitle={"Zatwierdź"}
        >
          <div className="flex h-auto items-center justify-center gap-8 w-full">
            <div className="flex items-center justify-between gap-4 mt-auto">
              <FormItem
                labelData={"Nazwa danych:"}
                containerStyling={
                  "w-full h-auto flex flex-col font-bold text-xl mt-auto gap-2 items-center"
                }
                inputStyling={
                  "border-4 border-black px-2 h-[55px] rounded-2xl focus:border-custom-orange-200 text-lg flex text-black bg-custom-gray-200 "
                }
                register={{
                  ...register("name", {
                    required: "Pole nie może być puste!",
                  }),
                }}
                errors={errors?.name?.message}
              />
              <FormItem
                labelData={"Wartość danych ( % ):"}
                containerStyling={
                  "w-full h-auto flex flex-col mt-auto font-bold text-xl gap-2 items-center"
                }
                inputStyling={
                  "border-4 border-black px-2 h-[55px] rounded-2xl focus:border-custom-orange-200 text-lg flex text-black bg-custom-gray-200 "
                }
                register={{
                  ...register("value", {
                    required: "Pole nie może być puste!",
                    pattern: {
                      value: /^[0-9]+(\.[0-9]+)?$/,
                      message: "Wprowadzona wartość musi być poprawną liczbą!",
                    },
                    onChange: (event) => {
                      const correctedValue = event.target.value.replace(
                        ",",
                        ".",
                      );
                      setValue("value", correctedValue);
                    },
                  }),
                }}
                errors={errors?.value?.message}
              />
              <div className="flex flex-col items-center space-y-2 w-[350px]">
                <label className="w-full font-bold text-xl">Kolor pola:</label>
                <MuiColorInput
                  format="hex8"
                  value={color}
                  onChange={(color) => setColor(color)}
                />
              </div>
            </div>
            {isEditing ? (
              <button
                type={"submit"}
                className="size-[50px] mt-auto flex items-center justify-center border-black border-4 rounded-2xl bg-custom-orange-200"
              >
                <AcceptIcon className={"size-10"} />
              </button>
            ) : (
              <button
                type={"submit"}
                className="size-[50px] mt-auto flex items-center justify-center border-black border-4 rounded-2xl bg-custom-orange-200"
              >
                <PlusIcon className={"size-10"} />
              </button>
            )}
          </div>
          {statistics?.length > 0 && (
            <div className="flex w-full gap-4">
              <ul className="w-full h-auto bg-custom-gray-200 space-y-2 rounded-2xl p-4 border-4 border-black">
                {statistics.map((data, index) => (
                  <motion.li
                    whileHover={{
                      backgroundColor: "#FF5A5A",
                    }}
                    className="w-full group flex bg-white h-[50px] rounded-2xl"
                    key={index}
                  >
                    <motion.div
                      whileHover={{
                        color: "#FFFFFF",
                      }}
                      className="flex py-2 px-6 items-center text-black justify-between w-full h-full"
                    >
                      <p className="font-bold">{data.name}</p>
                      <div className="flex gap-4 items-center">
                        <p>{`${data.value} %`}</p>
                        <div
                          style={{ backgroundColor: data.fieldHexColor }}
                          className={`size-10 ml-4 mr-2 rounded-xl border-2 border-black group-hover:border-white`}
                        />
                        <button
                          type={"button"}
                          onClick={() =>
                            changeStatisticValues(
                              data.id,
                              data.name,
                              data.value,
                              data.fieldHexColor,
                            )
                          }
                          className="border-l-2 group-hover:border-white size-10 border-black pl-4 mr-2"
                        >
                          <EditIcon size={"size-8"} />
                        </button>
                        <button
                          onClick={() => deleteStatistic(data.id)}
                          className="border-l-2 group-hover:border-white border-black size-10 pl-4"
                        >
                          <DeleteIcon size={"size-8"} />
                        </button>
                      </div>
                    </motion.div>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
        </AdminFormSection>
      </form>
    </AnimatedPage>
  );
};

export default StatisticsForm;
