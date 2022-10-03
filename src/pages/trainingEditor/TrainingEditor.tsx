import { WeekDays } from "./models";
import { TrainingDayUnit } from "./TrainingDayEditor";

export interface ITrainingProgram {
  id?: number;
  note: string;
}

export interface ITrainingProgramUnit {
  id?: number;
  note: string;
  trainingDays: ITrainingDay[];
}

export interface ITrainingDay {
  id?: number;
  day: WeekDays;
  trainingDayUnits: TrainingDayUnit[];
  note: string;
}

export const TrainingEditor = () => {
  return (
    <div>
      {Object.keys(WeekDays).map((day) => (
        <div>day</div>
      ))}
    </div>
  );
};
