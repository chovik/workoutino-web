import { useState } from "react";
import { Segment, Header, Icon, Button } from "semantic-ui-react";
import {
  BasicTrainingDayUnit,
  IBasicTrainingDayUnit,
} from "./BasicTrainingDayUnit";
import {
  EmomTrainingDayUnit,
  IEmomTrainingDayUnit,
} from "./EmomTrainingDayUnit";
import { Guid, ITrainingDayExerciseSet } from "./models";
import {
  ISuperSetTrainingDayUnit,
  SuperSetTrainingDayUnit,
} from "./SuperSetTrainingDayUnit";
import { TrainingDayUnitModal } from "./TrainingDayUnitModal";
import {
  IUniqueSetsTrainingDayUnit,
  UniqueSetsTrainingDayUnit,
} from "./UniqueSetsTrainingDayUnit";

export interface IAddExerciseSetModalData {
  exerciseUid: string;
  set: ITrainingDayExerciseSet;
}

export type TrainingDayUnit =
  | IBasicTrainingDayUnit
  | IUniqueSetsTrainingDayUnit
  | IEmomTrainingDayUnit
  | ISuperSetTrainingDayUnit;

const getNewTrainingDayUnit = (orderNumber: number) =>
  ({
    id: 0,
    uid: null,
    type: "basic",
    orderNumber: orderNumber,
    exerciseIds: [],
    note: "",
    repetitions: 0,
    weight: 0,
    setsCount: 1,
  } as TrainingDayUnit);

export const TrainingDayEditor = () => {
  const [isAddTrainingDayUnitOpen, setIsAddTrainingDayUnitOpen] =
    useState(true);
  const [trainingDayUnits, setTrainingDayUnits] = useState<TrainingDayUnit[]>(
    []
  );
  const [currentTrainingDayUnit, setCurrentTrainingDayUnit] =
    useState<TrainingDayUnit>(
      getNewTrainingDayUnit(trainingDayUnits.length + 1)
    );

  const addTrainingDayUnit = (dayUnit: TrainingDayUnit) => {
    setTrainingDayUnits((prevState) => [
      ...prevState,
      { ...dayUnit, uid: Guid.newGuid() },
    ]);
  };
  const editTrainingDayUnit = (dayUnit: TrainingDayUnit) =>
    setTrainingDayUnits((prevState) =>
      prevState.map((unit) =>
        unit.uid === dayUnit.uid ? { ...unit, ...dayUnit } : unit
      )
    );

  return (
    <div>
      {!trainingDayUnits.length && (
        <Segment placeholder>
          <Header icon>
            <Icon name="thumbs down outline" />
            No documents are listed for this customer.
          </Header>
          <Button
            primary
            onClick={() => {
              setCurrentTrainingDayUnit(
                getNewTrainingDayUnit(trainingDayUnits.length + 1)
              );
              setIsAddTrainingDayUnitOpen(true);
            }}
          >
            Add Exercise
          </Button>
        </Segment>
      )}

      {trainingDayUnits.length && (
        <Button
          primary
          onClick={() => {
            setCurrentTrainingDayUnit({
              id: 0,
              uid: null,
              type: "basic",
              orderNumber: trainingDayUnits.length + 1,
              exerciseIds: [],
              note: "",
              repetitions: 0,
              weight: 0,
              setsCount: 1,
            });
            setIsAddTrainingDayUnitOpen(true);
          }}
        >
          Add Exercise
        </Button>
      )}

      {trainingDayUnits.map((trainingDayUnit, trainingDayUnitIndex) => {
        return (
          <div
            key={trainingDayUnitIndex}
            onDoubleClick={(e) => {
              setCurrentTrainingDayUnit(trainingDayUnit);
              setIsAddTrainingDayUnitOpen(true);
            }}
          >
            {trainingDayUnit.orderNumber}
            {getTRainingDayComponent(trainingDayUnit)}
          </div>
        );
      })}

      <TrainingDayUnitModal
        isOpen={isAddTrainingDayUnitOpen}
        setIsOpen={setIsAddTrainingDayUnitOpen}
        submitAction={
          currentTrainingDayUnit.uid ? editTrainingDayUnit : addTrainingDayUnit
        }
        setEditDayUnit={setCurrentTrainingDayUnit}
        editDayUnit={currentTrainingDayUnit as IBasicTrainingDayUnit}
      />
    </div>
  );
};

const getTRainingDayComponent = (trainingDayUnit: TrainingDayUnit) => {
  switch (trainingDayUnit.type) {
    case "basic":
      return <BasicTrainingDayUnit {...trainingDayUnit} />;
    case "emom":
      return <EmomTrainingDayUnit {...trainingDayUnit} />;
    case "superSet":
      return <SuperSetTrainingDayUnit {...trainingDayUnit} />;
    case "uniqueSets":
      return <UniqueSetsTrainingDayUnit {...trainingDayUnit} />;
  }
};
