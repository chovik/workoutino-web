export interface IEmomTrainingDayUnit {
  orderNumber: number;
  exerciseIds: number[];
  type: "emom";
  weight: number;
  repetitionsInOneCycle: number;
  cyclesCount: number;
  note: string;
}

export const EmomTrainingDayUnit = ({
  cyclesCount,
  exerciseIds,
  repetitionsInOneCycle,
  weight,
  note,
}: IEmomTrainingDayUnit) => {
  return (
    <>
      <div>{cyclesCount} rounds of</div>
      <div>
        {exerciseIds.map((exercise) => (
          <b>{exercise}</b>
        ))}
      </div>
      <div>
        {repetitionsInOneCycle}x{weight}kg
        <i>{note}</i>
      </div>
    </>
  );
};
