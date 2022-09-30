export interface ISuperSetTrainingDayUnit {
  id: number;
  uid: string | null;
  orderNumber: number;
  type: "superSet";
  setUnits: ISuperSetUnit[];
  setsCount: number;
  note: string;
}

interface ISuperSetUnit {
  exerciseId: number;
  weight: number;
  repetitions: number;
  restAfterSet: number;
}

export const SuperSetTrainingDayUnit = ({
  setUnits,
  setsCount,
  note,
}: ISuperSetTrainingDayUnit) => {
  return (
    <>
      <div>{setsCount} rounds of</div>
      <div>
        {setUnits.map((subSet) => (
          <b>
            {subSet.exerciseId}, {subSet.repetitions}x{subSet.weight}kg, rest:{" "}
            {subSet.restAfterSet} seconds
          </b>
        ))}
      </div>
    </>
  );
};
