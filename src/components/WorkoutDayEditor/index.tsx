import { Dispatch, SetStateAction } from "react";
import {
  Badge,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  FloatingLabel,
  Form,
  FormGroup,
  InputGroup,
  Row,
  Stack,
  Table,
} from "react-bootstrap";
import { WEEK_DAYS } from "../WeekDayCheckboxList";
import { WithContext as ReactTags } from "react-tag-input";
import React from "react";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { type } from "@testing-library/user-event/dist/type";
import { WorkoutDayExercise } from "./exercise";

export interface IWorkoutExercise {
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

  return (
    <>
      {["A", "B", "C", "D"].map((exerciseNumber) => (
        <WorkoutDayExercise orderNumber={exerciseNumber} />
      ))}
    </>
  );
};
