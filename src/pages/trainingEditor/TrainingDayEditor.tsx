import { useState } from "react";
import { Segment, Header, Icon, Button } from "semantic-ui-react";
import { ITrainingDayExerciseSet, ITraningDayExercise } from "./models";
import { TrainingDayAddExerciseModal } from "./TrainingDayAddExerciseModal";
import { TrainingDayAddExerciseSetModal } from "./TrainingDayAddExerciseSetModal";

export interface IAddExerciseSetModalData {
  exerciseUid: string;
  set: ITrainingDayExerciseSet;
}

export const TrainingDayEditor = () => {
  const [isAddExerciseModalOpen, setIsAddExerciseModalOpen] = useState(true);
  const [isAddExerciseSetModalOpen, setIsAddExerciseSetModalOpen] =
    useState(true);
  const [trainingDayExercises, setTrainingDayExercises] = useState<
    ITraningDayExercise[]
  >([]);
  const [addExerciseSetModalData, setAddExerciseSetModalData] =
    useState<IAddExerciseSetModalData | null>(null);

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

          <Button primary onClick={() => setIsAddExerciseSetModalOpen(true)}>
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
