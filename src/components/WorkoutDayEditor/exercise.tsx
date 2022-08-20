import { useState } from "react";
import React from "react";
import { RepetitionsType, WorkoutDayExerciseSet } from "./set";
import {
  AutoComplete,
  Badge,
  Button,
  Card,
  CardGroup,
  Space,
  Tag,
  TagGroup,
  TagInput,
} from "@douyinfe/semi-ui";
import { TagGroupProps, TagProps } from "@douyinfe/semi-ui/lib/es/tag";
import { IconClose, IconSearch } from "@douyinfe/semi-icons";
import Select, { ActionMeta, OnChangeValue } from "react-select";
import { IWorkoutExercise } from ".";
import { useExercisesState } from "../../pages/workoutEditor/state";

export class Guid {
  static newGuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}
export enum WeightType {
  Fixed = "FIXED",
  Range = "RANGE",
  RIR = "RIR",
}

export interface IWorkoutDayExerciseProps {
  orderNumber: string;
  exercise: IWorkoutExercise;
  updateExercise: (uid: string, updatedSet: Partial<IWorkoutExercise>) => void;
  deleteExercise: (uid: string) => void;
}

export interface IWorkoutExerciseSetRangeWeight {
  type: WeightType.Range;
  valueFrom: number;
  valueTo: number;
}

export interface IWorkoutExerciseSetFixedWeight {
  type: WeightType.Fixed;
  value: number;
}

export interface IWorkoutExerciseSetRIRWeight {
  type: WeightType.RIR;
  value: number;
}

export interface IWorkoutExerciseSetWeight {
  type: WeightType;
  value?: number;
  valueFrom?: number;
  valueTo?: number;
}

export interface IWorkoutExerciseSetRepetitions {
  type: RepetitionsType;
  value?: number;
  valueFrom?: number;
  valueTo?: number;
}

export interface IWorkoutExerciseSet {
  id: number;
  uid: string;
  weight: IWorkoutExerciseSetWeight;
  repetitions: IWorkoutExerciseSetRepetitions;
}

export interface ISelectOption {
  value: number;
  label: string;
}

const exerciseOptions = [
  { value: 1, label: "Squat Snatch" },
  { value: 2, label: "Muscle Snatch" },
  { value: 3, label: "Power Snatch" },
  { value: 4, label: "Slow Snatch" },
  { value: 5, label: "Halting Snatch" },
  { value: 6, label: "Hang Squat Snatch" },
  { value: 7, label: "Hang Power Snatch" },
];

export const WorkoutDayExercise = React.memo(
  ({ orderNumber, exercise, deleteExercise }: IWorkoutDayExerciseProps) => {
    const { updateExerciseSet, addExerciseSet, removeExerciseSet } =
      useExercisesState();
    const [selectedOption, setSelectedOption] = useState<ISelectOption[]>([
      exerciseOptions[1],
    ]);

    const handleSelectChange = (
      newValue: OnChangeValue<ISelectOption, true>,
      actionMeta: ActionMeta<ISelectOption>
    ) => {
      console.log(newValue);
      setSelectedOption([...selectedOption, ...newValue]);
    };

    return (
      <Card
        style={{ marginBottom: 20 }}
        title={
          <Space wrap>
            <b>{orderNumber}</b>
            <Select
              options={exerciseOptions}
              isMulti
              onChange={handleSelectChange}
              menuPosition="fixed"
            />
          </Space>
        }
        headerStyle={{ backgroundColor: "rgba(var(--semi-grey-2), 1)" }}
        headerExtraContent={
          <Button
            icon={<IconClose />}
            aria-label="Screenshot"
            onClick={() => {
              deleteExercise(exercise.uid);
            }}
          />
        }
      >
        <CardGroup>
          {exercise.sets.map((set, setNumber) => (
            <Badge count={setNumber} position="leftTop">
              <Button
                icon={<IconClose />}
                aria-label="Screenshot"
                style={{ position: "absolute", top: "0", right: "0" }}
                onClick={() => removeExerciseSet(exercise.uid, set.uid)}
              />
              <Card>
                <WorkoutDayExerciseSet
                  exerciseSet={set}
                  setNumber={setNumber}
                  key={`set-${setNumber}`}
                  updateExerciseSet={(setUid, updatedSet) =>
                    updateExerciseSet(exercise.uid, setUid, updatedSet)
                  }
                />
              </Card>
            </Badge>
          ))}
          <Button onClick={() => addExerciseSet(exercise.uid)}>Add set</Button>
        </CardGroup>
      </Card>
    );
  }
);
