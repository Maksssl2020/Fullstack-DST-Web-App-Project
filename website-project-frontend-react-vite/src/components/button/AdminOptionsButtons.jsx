import EditIcon from "../../icons/EditIcon.jsx";
import DeleteIcon from "../../icons/DeleteIcon.jsx";
import React from "react";
import { useNavigate } from "react-router-dom";
import DefaultModal from "../modal/DefaultModal.jsx";
import { motion, AnimatePresence } from "framer-motion";

const AdminOptionsButtons = ({
  editButtonLink,
  deleteFunction,
  modalSubtitle,
  buttonsClassname,
  buttonSize = undefined,
  iconSize = undefined,
}) => {
  const [openModal, setOpenModal] = React.useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`absolute top-0 right-0 mx-2 my-2 flex gap-2 ${buttonsClassname}`}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={(event) => {
            event.stopPropagation();
            navigate(editButtonLink);
          }}
          className={`border-2 border-black max-xl:size-12 bg-white rounded-xl flex items-center justify-center ${buttonSize ? buttonSize : "size-14"}`}
        >
          <EditIcon
            size={`max-xl:size-8 ${iconSize ? iconSize : "xl:size-10"}`}
          />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={(event) => {
            event.stopPropagation();
            setOpenModal(true);
          }}
          className={`border-2 border-black max-xl:size-12 bg-white rounded-xl flex items-center justify-center ${buttonSize ? buttonSize : "size-14"}`}
        >
          <DeleteIcon
            size={`max-xl:size-8 ${iconSize ? iconSize : "xl:size-10"}`}
          />
        </motion.button>
      </div>

      <AnimatePresence>
        {openModal && (
          <DefaultModal title="UWAGA!" subtitle={modalSubtitle}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteFunction();
                setOpenModal(false);
              }}
              className="w-[50%] uppercase font-bold text-xl text-white h-[50px] flex items-center justify-center border-4 border-black bg-custom-orange-200 py-1 rounded-xl"
            >
              tak
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenModal(false);
              }}
              className="w-[50%] uppercase font-bold text-xl text-white h-[50px] flex items-center justify-center border-4 border-black bg-custom-orange-200 py-1 rounded-xl"
            >
              nie
            </button>
          </DefaultModal>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminOptionsButtons;
