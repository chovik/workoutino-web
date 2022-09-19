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

// const useTrainingDayEditor = () => {
//   const [isAddExerciseModalOpen, setIsAddExerciseModalOpen] = useState(true);
//   const [isAddExerciseSetModalOpen, setIsAddExerciseSetModalOpen] =
//     useState(true);
//   const [trainingDayExercises, setTrainingDayExercises] = useState<
//     ITraningDayExercise[]
//   >([]);
//   const [addExerciseSetModalData, setAddExerciseSetModalData] =
//     useState<IAddExerciseSetModalData | null>(null);

//   return {
//     isAddExerciseModalOpen,
//     setIsAddExerciseModalOpen,
//     isAddExerciseSetModalOpen,
//     setIsAddExerciseSetModalOpen,
//     trainingDayExercises,
//     setTrainingDayExercises,
//     addExerciseSetModalData,
//     setAddExerciseSetModalData,
//   };
// };

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
    const newExercises = trainingDayExercises.map((e) => {
      if (e.uid !== data.exerciseUid) return e;
      const newSets = data.set.uid
        ? e.sets.map((s) =>
            s.uid === data.set.uid ? { ...data.set, uid: Guid.newGuid() } : s
          )
        : [...e.sets, { ...data.set }];
      return { ...e, sets: newSets };
    });

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
            Add Exercise
          </Button>
        </Segment>
      )}

      {trainingDayExercises.length && (
        <Button primary onClick={() => setIsAddExerciseModalOpen(true)}>
          Add Exercise
        </Button>
      )}

      {trainingDayExercises.map((trainingExercise) => (
        <div>
          <div>{trainingExercise.orderNumber}</div>
          {trainingExercise.exercises.map((e) => (
            <div>{e}</div>
          ))}

          {trainingExercise.sets.map((s) => (
            <div
              onClick={() => {
                setIsAddExerciseSetModalOpen(true);
                setAddExerciseSetModalData({
                  exerciseUid: trainingExercise.uid,
                  set: {
                    ...s,
                  },
                });
              }}
            >
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
                  weightType: TrainingDayExerciseSetWeightType.Fixed,
                },
              });
            }}
          >
            Add Set
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
