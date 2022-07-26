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
  value: string;
  label: string;
}

export const WorkoutDayExercise = ({
  orderNumber,
  exercise,
  updateExercise,
  deleteExercise,
}: IWorkoutDayExerciseProps) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [sets, setSets] = useState<IWorkoutExerciseSet[]>([]);
  const [selectedOption, setSelectedOption] = useState<ISelectOption[]>([
    options[1],
  ]);
  const updateExerciseSet = (
    uid: string,
    updatedSet: Partial<IWorkoutExerciseSet>
  ) => {
    const newSets = sets.map((set) => {
      if (set.uid === uid) {
        console.log(uid);
        console.log(updatedSet);
        return {
          ...set,
          ...updatedSet,
        };
      }

      return set;
    });
    console.log("newSets", newSets);

    setSets([...newSets]);
  };

  const addNewExerciseSet = () => {
    const lastExerciseSet = sets.length && sets[sets.length - 1];
    console.log(lastExerciseSet);
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

    setSets([...sets, newExerciseSet]);
  };

  const tagList = [
    { color: "white", children: "Abc", closable: true },
    { color: "white", children: "Hotsoon" },
    { color: "white", children: "Toutiao" },
    { color: "white", children: "Vigo" },
    { color: "white", children: "Pipixia" },
  ] as TagProps[];

  const [tags, setTags] = useState<TagProps[]>(tagList);

  const handleSelectChange = (
    newValue: OnChangeValue<ISelectOption, true>,
    actionMeta: ActionMeta<ISelectOption>
  ) => {
    console.log(newValue);
    setSelectedOption([...selectedOption, ...newValue]);
  };
  console.log(sets);

  return (
    <Card
      style={{ marginBottom: 20 }}
      title={
        <Space wrap>
          <b>{orderNumber}</b>
          <Select
            options={options}
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
        {sets.map((set, setNumber) => (
          <Badge count={setNumber} position="leftTop">
            <Button
              icon={<IconClose />}
              aria-label="Screenshot"
              style={{ position: "absolute", top: "0", right: "0" }}
              onClick={() => {
                console.log(set);
                console.log([...sets.filter((s) => s.uid !== set.uid)]);
                setSets([...sets.filter((s) => s.uid !== set.uid)]);
              }}
            />
            <Card>
              <WorkoutDayExerciseSet
                exerciseSet={set}
                setNumber={setNumber}
                key={`set-${setNumber}`}
                updateExerciseSet={updateExerciseSet}
              />
            </Card>
          </Badge>
        ))}
        <Button onClick={addNewExerciseSet}>Add set</Button>
        {/* <Col sm={4} md={3} lg={3} xl={2} xxl={1}>
          <Button variant="success" onClick={addNewExerciseSet}>
            Add set
          </Button>
        </Col> */}
      </CardGroup>
    </Card>
  );
};
