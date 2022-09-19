export interface ITrainingDayExerciseSet {
  uid?: string;
  id?: number;
  orderNumber: number;
  weight?: number;
  weightFrom?: number;
  weightTo?: number;
  repetitions?: number;
  repetittionsFrom?: number;
  repetitonsTo?: number;
  weightType: TrainingDayExerciseSetWeightType;
}

export interface ITrainingDay {
  exercises: ITraningDayExercise[];
}

export enum TrainingDayExerciseSetWeightType {
  Fixed,
  Range,
  RepsInReserve,
  RateOfPerceivedExertion,
}

export enum TrainingDayExerciseSetRepetitionsType {
  Fixed,
  Range,
  RepsInReserve,
  RateofPerceivedExertion,
}

export interface ITraningDayExercise {
  uid: string;
  id?: number;
  exercises: string[]; // TODO:
  orderNumber: number;
  sets: ITrainingDayExerciseSet[];
}

export class Guid {
  static newGuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}
