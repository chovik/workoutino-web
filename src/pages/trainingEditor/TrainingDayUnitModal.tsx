import { Dispatch, SetStateAction } from "react";
import { Form, InputOnChangeData, Modal } from "semantic-ui-react";
import { BasicTrainingDayUnitModalForm } from "./BasicTrainingDayUnitModal";
import { TrainingDayUnit } from "./TrainingDayEditor";

export interface ITrainingDayUnitModalProps {
  editDayUnit: TrainingDayUnit;
  setEditDayUnit: Dispatch<SetStateAction<TrainingDayUnit>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  submitAction: (data: TrainingDayUnit) => Promise<void> | void;
}

export const TrainingDayUnitModal = ({
  editDayUnit,
  setEditDayUnit,
  isOpen,
  setIsOpen,
  submitAction,
}: ITrainingDayUnitModalProps) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => {
    setEditDayUnit((prevState) => ({
      ...prevState,
      [e.target.name]: data.value,
    }));
    console.log(e.target.name, data.value);
  };

  const setSelectedExerciseIds = (exerciseIds: number[]) => {
    console.log(exerciseIds);
    setEditDayUnit((prevState) => ({
      ...prevState,
      exerciseIds: exerciseIds,
    }));
  };

  return (
    <Modal
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      open={isOpen}
    >
      <Form>
        {getFormComponent(
          editDayUnit,
          handleInputChange,
          setSelectedExerciseIds
        )}
        <Form.Button
          onClick={(cc) => {
            setIsOpen(false);
            submitAction(editDayUnit);
          }}
        >
          Submit
        </Form.Button>
        <Form.Button onClick={(cc) => setIsOpen(false)}>Cancel</Form.Button>
      </Form>
    </Modal>
  );
};

const getFormComponent = (
  trainingDayUnit: TrainingDayUnit,
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => void,
  setSelectedExerciseIds: (exerciseIds: number[]) => void
) => {
  switch (trainingDayUnit.type) {
    case "basic":
      return (
        <BasicTrainingDayUnitModalForm
          editDayUnit={trainingDayUnit}
          handleInputChange={handleInputChange}
          setSelectedExerciseIds={setSelectedExerciseIds}
        />
      );
  }
};
