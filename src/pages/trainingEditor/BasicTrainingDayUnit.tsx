export interface IBasicTrainingDayUnit {
  orderNumber: number;
  type: "basic";
  exerciseIds: number[];
  weight: number;
  repetitons: number;
  note: string;
  setsCount: number;
}

export const BasicTrainingDayUnit = ({
  exerciseIds,
  note,
  repetitons,
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
        {repetitons}x{weight}kg in {setsCount} sets
        <i>{note}</i>
      </div>
    </>
  );
};
