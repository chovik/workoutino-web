export interface IUniqueSetsTrainingDayUnit {
  orderNumber: number;
  type: "uniqueSets";
  exerciseIds: number[];
  sets: IUniqueSet[];
  note: String;
}

export interface IUniqueSet {
  weight: number;
  repetitions: number;
  note: string;
}

export const UniqueSetsTrainingDayUnit = ({
  exerciseIds,
  sets,
  note,
}: IUniqueSetsTrainingDayUnit) => {
  return (
    <>
      <div>
        {exerciseIds.map((exercise) => (
          <b>{exercise}</b>
        ))}
      </div>
      <div>
        {sets.map((set) => (
          <div>
            <div>
              {set.repetitions}x{set.weight}kg
            </div>
            <div>{set.note}</div>
          </div>
        ))}
      </div>
    </>
  );
};
