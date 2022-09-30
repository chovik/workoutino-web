export interface IBasicTrainingDayUnit {
  id: number;
  uid: string | null;
  orderNumber: number;
  type: "basic";
  exerciseIds: number[];
  weight: number;
  repetitions: number;
  note: string;
  setsCount: number;
}

export const BasicTrainingDayUnit = ({
  exerciseIds,
  note,
  repetitions,
  setsCount,
  type,
  weight,
}: IBasicTrainingDayUnit) => {
  return (
    <>
      <div>
        {exerciseIds.map((exercise) => (
          <b>{exercise}</b>
        ))}
      </div>
      <div>
        {repetitions}x{weight}kg in {setsCount} sets
        <i>{note}</i>
      </div>
    </>
  );
};
