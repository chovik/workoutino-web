import { Dispatch, SetStateAction, useState } from "react";
import AsyncSelect from "react-select/async";
import { Button, Form, Input, Label, Modal, Radio } from "semantic-ui-react";
import {
  ITrainingDayExerciseSet,
  TrainingDayExerciseSetWeightType,
} from "./models";
import { IAddExerciseSetModalData } from "./TrainingDayEditor";

interface ITrainingDayExerciseSetForm
  extends Partial<ITrainingDayExerciseSet> {}

interface ITrainingDayAddExerciseSetModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  data: IAddExerciseSetModalData;
  setData: (data: Partial<ITrainingDayExerciseSet>) => void;
  addSet: (data: IAddExerciseSetModalData) => void;
}

const weightTypeSelectValues = [
  { value: TrainingDayExerciseSetWeightType.Fixed, label: "Fixed" },
  { value: TrainingDayExerciseSetWeightType.Range, label: "Range" },
  {
    value: TrainingDayExerciseSetWeightType.RateofPerceivedExertion,
    label: "RateofPerceivedExertion",
  },
  {
    value: TrainingDayExerciseSetWeightType.RepsInReserve,
    label: "RepsInReserve",
  },
];

export const TrainingDayAddExerciseSetModal = ({
  isOpen,
  setIsOpen,
  data,
  setData,
  addSet,
}: ITrainingDayAddExerciseSetModalProps) => {
  const [weightType, setWeightType] =
    useState<TrainingDayExerciseSetWeightType>(
      TrainingDayExerciseSetWeightType.Fixed
    );
  return (
    <Modal
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      open={isOpen}
    >
      <Modal.Header>Select a Photo</Modal.Header>
      <Modal.Content>
        <div>
          <Form>
            <Form.Field>
              Selected value: <b>{weightType}</b>
            </Form.Field>

            {weightTypeSelectValues.map((weightTypeSelectValue) => (
              <Form.Field>
                <Radio
                  label={weightTypeSelectValue.label}
                  name="radioGroup"
                  value={weightTypeSelectValue.value}
                  checked={weightType === weightTypeSelectValue.value}
                  onChange={(e, { value }) =>
                    setData({ weightType: weightTypeSelectValue.value })
                  }
                />
              </Form.Field>
            ))}
          </Form>
          <Input
            placeholder="Search..."
            value={data.set.weight}
            onChange={(e) => setData({ weight: Number(e.target.value) })}
          />
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setIsOpen(false)}>
          Zrusit
        </Button>
        <Button
          content="Pridat"
          labelPosition="right"
          icon="checkmark"
          onClick={() => {
            addSet(data);
            setIsOpen(false);
          }}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};
