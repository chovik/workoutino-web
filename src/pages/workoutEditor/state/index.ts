import { useCallback } from "react";
import { atom, useRecoilState, useSetRecoilState } from "recoil";
import { IWorkoutExercise } from "../../../components/WorkoutDayEditor";
import {
  Guid,
  IWorkoutExerciseSet,
  WeightType,
} from "../../../components/WorkoutDayEditor/exercise";
import { RepetitionsType } from "../../../components/WorkoutDayEditor/set";

const workoutExercisesAtom = atom<IWorkoutExercise[]>({
  key: "TodoList",
  default: [],
});

export const useExercisesState = () => {
  const [exercises, setExercises] = useRecoilState(workoutExercisesAtom);

  const updateExercise = useCallback(
    (uid: string, updateValue: Partial<IWorkoutExercise>) => {
      setExercises((oldExercises) => {
        const newExercises = oldExercises.map((e) => {
          if (e.uid === uid) {
            return {
              ...e,
              ...updateValue,
            };
          }

          return e;
        });

        return [...newExercises];
      });
    },
    [setExercises]
  );

  return {
    exercises: exercises,
    updateExercise: updateExercise,
    addExercise: useCallback(() => {
      setExercises((oldExercises) => [
        ...oldExercises,
        { uid: Guid.newGuid(), name: "", exercises: [], sets: [] },
      ]);
    }, [setExercises]),

    removeExercise: useCallback(
      (uid: string) => {
        setExercises((oldExercises) =>
          oldExercises.filter((e) => e.uid !== uid)
        );
      },
      [setExercises]
    ),

    updateExerciseSet: (
      exerciseUid: string,
      setUid: string,
      updateValue: Partial<IWorkoutExerciseSet>
    ) => {
      const exercise = exercises.find((e) => e.uid === exerciseUid);

      if (!exercise) {
        throw Error(`Exercise with uid = ${exerciseUid} does not exist.`);
      }

      const newSets = exercise.sets.map((set) => {
        if (set.uid === setUid) {
          return {
            ...set,
            ...updateValue,
          };
        }

        return set;
      });

      updateExercise(exerciseUid, { sets: newSets });
    },

    addExerciseSet: (exerciseUid: string) => {
      const exercise = exercises.find((e) => e.uid === exerciseUid);

      if (!exercise) {
        throw Error(`Exercise with uid = ${exerciseUid} does not exist.`);
      }

      const lastExerciseSet =
        exercise.sets.length && exercise.sets[exercise.sets.length - 1];
      const newExerciseSet: IWorkoutExerciseSet = lastExerciseSet
        ? {
            ...lastExerciseSet,
            uid: Guid.newGuid(),
          }
        : {
            id: 0,
            uid: Guid.newGuid(),
            repetitions: {
              type: RepetitionsType.Fixed,
              value: 7,
            },
            weight: {
              type: WeightType.Fixed,
              value: 70,
            },
          };

      const newSets = [...exercise.sets, newExerciseSet];

      updateExercise(exerciseUid, { sets: newSets });
    },

    removeExerciseSet: (exerciseUid: string, setUid: string) => {
      const exercise = exercises.find((e) => e.uid === exerciseUid);

      if (!exercise) {
        throw Error(`Exercise with uid = ${exerciseUid} does not exist.`);
      }

      const newSets = exercise.sets.filter((set) => set.uid !== setUid);
      updateExercise(exerciseUid, { sets: newSets });
    },
  };
};
