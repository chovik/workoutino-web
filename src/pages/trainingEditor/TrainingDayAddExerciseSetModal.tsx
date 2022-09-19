import { Dispatch, SetStateAction } from "react";
import { Button, Form, Input, Modal, Radio } from "semantic-ui-react";
import {
  ITrainingDayExerciseSet,
  TrainingDayExerciseSetWeightType,
} from "./models";
import { IAddExerciseSetModalData } from "./TrainingDayEditor";

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
    value: TrainingDayExerciseSetWeightType.RateOfPerceivedExertion,
    label: "RateOfPerceivedExertion",
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
              Selected value: <b>{data.set.weightType}</b>
            </Form.Field>

            {weightTypeSelectValues.map((weightTypeSelectValue) => (
              <Form.Field>
                <Radio
                  label={weightTypeSelectValue.label}
                  name="radioGroup"
                  value={weightTypeSelectValue.value}
                  checked={data.set.weightType === weightTypeSelectValue.value}
                  onChange={(e, { value }) =>
                    setData({ weightType: weightTypeSelectValue.value })
                  }
                />
              </Form.Field>
            ))}
          </Form>
          {[
            TrainingDayExerciseSetWeightType.Fixed,
            TrainingDayExerciseSetWeightType.RateOfPerceivedExertion,
            TrainingDayExerciseSetWeightType.RepsInReserve,
          ].includes(data.set.weightType) && (
            <Input
              value={data.set.weight}
              onChange={(e) => setData({ weight: Number(e.target.value) })}
            />
          )}

          {data.set.weightType === TrainingDayExerciseSetWeightType.Range && (
            <>
              <Input
                value={data.set.weightFrom}
                onChange={(e) =>
                  setData({ weightFrom: Number(e.target.value) })
                }
              />
              -
              <Input
                value={data.set.weightTo}
                onChange={(e) => setData({ weightTo: Number(e.target.value) })}
              />
            </>
          )}
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
