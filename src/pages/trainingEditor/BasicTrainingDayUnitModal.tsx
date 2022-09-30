import { Dispatch, SetStateAction, useState } from "react";
import { Form, InputOnChangeData, Modal } from "semantic-ui-react";
import { IBasicTrainingDayUnit } from "./BasicTrainingDayUnit";
import { ExercisesSelect } from "./ExercisesSelect";
import { TrainingDayUnit } from "./TrainingDayEditor";

// export interface IBasicTrainingDayUnit {
//   orderNumber: number;
//   exerciseIds: number[];
//   type: "basic";
//   weight: number;
//   repetitions: number;
//   note: string;
// }

export interface IBasicTrainingDayUnitModalFormProps {
  editDayUnit: IBasicTrainingDayUnit;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => void;
  setSelectedExerciseIds: (exerciseIds: number[]) => void;
}

export const BasicTrainingDayUnitModalForm = ({
  editDayUnit,
  handleInputChange,
  setSelectedExerciseIds,
}: IBasicTrainingDayUnitModalFormProps) => {
  return (
    <>
      <Form.Group widths="equal">
        <ExercisesSelect
          selectedExerciseIds={editDayUnit.exerciseIds}
          setSelectedExerciseIds={setSelectedExerciseIds}
        />
        <Form.Input
          name="repetitions"
          label="Repetitions"
          value={editDayUnit.repetitions}
          onChange={handleInputChange}
        />

        <Form.Input
          name="weight"
          label="Weight"
          value={editDayUnit.weight}
          onChange={handleInputChange}
        />

        <Form.Input
          name="note"
          label="Note"
          value={editDayUnit.note}
          onChange={handleInputChange}
        />
      </Form.Group>
    </>
  );
};
