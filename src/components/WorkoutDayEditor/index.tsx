import { Dispatch, SetStateAction, useState } from "react";
import { WEEK_DAYS } from "../WeekDayCheckboxList";
import React from "react";
import { Guid, WorkoutDayExercise } from "./exercise";
import { Button } from "@douyinfe/semi-ui";
import { IconClose, IconPlus, IconSearch } from "@douyinfe/semi-icons";

export interface IWorkoutExercise {
  uid: string;
  name: string;
  exercises: IExercise[];
  sets: IWorkoutExerciseSet[];
}

export interface IWorkoutSingleExercise {
  exercise: IExercise;
}

export interface IWorkoutExerciseSet {
  units: IWorkoutExerciseSetUnit[];
}

export interface IWorkoutExerciseSetUnit {
  exercise: IExercise;
  weight?: number;
  minimumWeight?: number;
  maximumWeight?: number;
  numberOfReps: number;
  performedWeight: number;
}

export interface IExercise {
  name: string;
}

export interface IWeekkDayCheckBoxListProps {
  workouts: WEEK_DAYS[];
  setWorkouts: Dispatch<SetStateAction<WEEK_DAYS[]>>;
}

export const WorkoutDayEditor = () => {
  const [exercises, setExercises] = useState<IWorkoutExercise[]>([]);
  const suggestions = ["snatch", "clean"].map((country) => {
    return {
      id: country,
      text: country,
    };
  });

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const [tags, setTags] = React.useState([
    { id: "Thailand", text: "Thailand" },
    { id: "India", text: "India" },
    { id: "Vietnam", text: "Vietnam" },
    { id: "Turkey", text: "Turkey" },
  ]);

  const handleDelete = (i: any) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag: any) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag: any, currPos: any, newPos: any) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index: any) => {
    console.log("The tag at index " + index + " was clicked");
  };

  const updateExercise = (
    uid: string,
    updatedExercise: Partial<IWorkoutExercise>
  ) => {
    const newExercises = exercises.map((e) => {
      if (e.uid === uid) {
        console.log(uid);
        console.log(updatedExercise);
        return {
          ...e,
          ...updatedExercise,
        };
      }

      return e;
    });

    setExercises([...newExercises]);
  };

  return (
    <>
      {exercises.map((exercise, i) => (
        <WorkoutDayExercise
          orderNumber={exercise.name}
          key={exercise.name + i}
          deleteExercise={(uid) =>
            setExercises([...exercises.filter((e) => e.uid !== uid)])
          }
          updateExercise={updateExercise}
          exercise={exercise}
        />
      ))}
      <Button
        icon={<IconPlus />}
        aria-label="Screenshot"
        style={{ position: "absolute", top: "0", right: "0" }}
        onClick={() => {
          setExercises([
            ...exercises,
            { uid: Guid.newGuid(), name: "", exercises: [], sets: [] },
          ]);
        }}
      />
    </>
  );
};
