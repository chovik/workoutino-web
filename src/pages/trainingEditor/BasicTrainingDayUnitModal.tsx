import { Form, InputOnChangeData } from "semantic-ui-react";
import { IBasicTrainingDayUnit } from "./BasicTrainingDayUnit";
import { ExercisesSelect } from "./ExercisesSelect";

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
        <Form.Input
          name="setsCount"
          label="Sets"
          value={editDayUnit.setsCount}
          onChange={handleInputChange}
        />
      </Form.Group>
    </>
  );
};
