import { Dispatch, SetStateAction, useState } from "react";
import AsyncSelect from "react-select/async";
import { Button, Label, Modal } from "semantic-ui-react";
import { Guid, ITraningDayExercise } from "./models";

interface ITrainingDayExerciseSelect {
  value: number;
  label: string;
}

interface ITrainingDayAddExerciseModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setTrainingDayExercises: Dispatch<SetStateAction<ITraningDayExercise[]>>;
}

const exercises = [
  { value: 1, label: "Snatch" },
  { value: 2, label: "Power Snatch" },
  { value: 3, label: "Muscle Snatch" },
  { value: 4, label: "Tall Snatch" },
  { value: 5, label: "Tall Muscle Snatch" },
  { value: 6, label: "Dip Snatch" },
  { value: 7, label: "Snatch Balance" },
  { value: 8, label: "Drop Snatch" },
];

const filterColors = (inputValue: string) => {
  return exercises.filter((i) =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const promiseOptions = (inputValue: string) =>
  new Promise<ITrainingDayExerciseSelect[]>((resolve) => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });

export const TrainingDayAddExerciseModal = ({
  isOpen,
  setIsOpen,
  setTrainingDayExercises,
}: ITrainingDayAddExerciseModalProps) => {
  const [selectedExercises, setSelectedExercises] = useState<
    ITrainingDayExerciseSelect[]
  >([]);

  return (
    <Modal
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      open={isOpen}
    >
      <Modal.Header>Select a Photo</Modal.Header>
      <Modal.Content>
        <AsyncSelect
          cacheOptions
          defaultOptions
          value={{ value: -1, label: "" }}
          loadOptions={promiseOptions}
          onChange={(value) => {
            setSelectedExercises((prev) => {
              if (value) prev.push(value);
              return [...prev];
            });
          }}
        />

        <div>
          {selectedExercises.map((selectedExercise, selectedExerciseIndex) => (
            <div key={selectedExerciseIndex}>
              <Label>{selectedExercise.label}</Label>
              <Button
                onClick={() => {
                  setSelectedExercises((prev) => {
                    return [
                      ...prev.filter((_, i) => i !== selectedExerciseIndex),
                    ];
                  });
                }}
              >
                X
              </Button>
            </div>
          ))}
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
            setTrainingDayExercises((prev) => [
              ...prev,
              {
                uid: Guid.newGuid(),
                exercises: selectedExercises.map((e) => e.label),
                orderNumber: prev.length + 1,
                sets: [],
              },
            ]);
            setIsOpen(false);
          }}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};
