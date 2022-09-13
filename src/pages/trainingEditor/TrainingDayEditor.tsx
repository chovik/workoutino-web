import { useState } from "react";
import { Segment, Header, Icon, Button } from "semantic-ui-react";
import {
  Guid,
  ITrainingDayExerciseSet,
  ITraningDayExercise,
  TrainingDayExerciseSetWeightType,
} from "./models";
import { TrainingDayAddExerciseModal } from "./TrainingDayAddExerciseModal";
import { TrainingDayAddExerciseSetModal } from "./TrainingDayAddExerciseSetModal";

export interface IAddExerciseSetModalData {
  exerciseUid: string;
  set: ITrainingDayExerciseSet;
}

const useTrainingDayEditor = () => {
  const [isAddExerciseModalOpen, setIsAddExerciseModalOpen] = useState(true);
  const [isAddExerciseSetModalOpen, setIsAddExerciseSetModalOpen] =
    useState(true);
  const [trainingDayExercises, setTrainingDayExercises] = useState<
    ITraningDayExercise[]
  >([]);
  const [addExerciseSetModalData, setAddExerciseSetModalData] =
    useState<IAddExerciseSetModalData | null>(null);

  return {
    isAddExerciseModalOpen,
    setIsAddExerciseModalOpen,
    isAddExerciseSetModalOpen,
    setIsAddExerciseSetModalOpen,
    trainingDayExercises,
    setTrainingDayExercises,
    addExerciseSetModalData,
    setAddExerciseSetModalData,
  };
};

export const TrainingDayEditor = () => {
  const [isAddExerciseModalOpen, setIsAddExerciseModalOpen] = useState(true);
  const [isAddExerciseSetModalOpen, setIsAddExerciseSetModalOpen] =
    useState(true);
  const [trainingDayExercises, setTrainingDayExercises] = useState<
    ITraningDayExercise[]
  >([]);
  const [addExerciseSetModalData, setAddExerciseSetModalData] =
    useState<IAddExerciseSetModalData | null>(null);
  const addSet = (data: IAddExerciseSetModalData) => {
    const newExercises = trainingDayExercises.map((e) =>
      e.uid === data.exerciseUid
        ? { ...e, sets: [...e.sets, { ...data.set }] }
        : e
    );

    setTrainingDayExercises(newExercises);
  };

  return (
    <div>
      {!trainingDayExercises.length && (
        <Segment placeholder>
          <Header icon>
            <Icon name="thumbs down outline" />
            No documents are listed for this customer.
          </Header>
          <Button primary onClick={() => setIsAddExerciseModalOpen(true)}>
            Add Document
          </Button>
        </Segment>
      )}

      {trainingDayExercises.length && (
        <Button primary onClick={() => setIsAddExerciseModalOpen(true)}>
          Add Document
        </Button>
      )}

      {trainingDayExercises.map((trainingExercise) => (
        <div>
          <div>{trainingExercise.orderNumber}</div>
          {trainingExercise.exercises.map((e) => (
            <div>{e}</div>
          ))}

          {trainingExercise.sets.map((s) => (
            <div>
              {s.orderNumber} {s.weightType}
            </div>
          ))}

          <Button
            primary
            onClick={() => {
              setIsAddExerciseSetModalOpen(true);
              setAddExerciseSetModalData({
                exerciseUid: trainingExercise.uid,
                set: {
                  orderNumber: trainingExercise.sets.length + 1,
                  uid: Guid.newGuid(),
                  weightType: TrainingDayExerciseSetWeightType.Fixed,
                },
              });
            }}
          >
            Add Document
          </Button>
        </div>
      ))}

      <TrainingDayAddExerciseModal
        isOpen={isAddExerciseModalOpen}
        setIsOpen={setIsAddExerciseModalOpen}
        setTrainingDayExercises={setTrainingDayExercises}
      />

      {addExerciseSetModalData && (
        <TrainingDayAddExerciseSetModal
          isOpen={isAddExerciseSetModalOpen}
          setIsOpen={setIsAddExerciseSetModalOpen}
          data={addExerciseSetModalData}
          addSet={addSet}
          setData={(setData) =>
            setAddExerciseSetModalData((prev) =>
              prev
                ? {
                    ...prev,
                    set: { ...prev?.set, ...setData },
                  }
                : null
            )
          }
        />
      )}
    </div>
  );
};
