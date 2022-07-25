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
import { IconSearch } from "@douyinfe/semi-icons";
import Select from "react-select";

class Guid {
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

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export interface ISelectOption {
  value: string;
  label: string;
}

export const WorkoutDayExercise = ({
  orderNumber,
}: IWorkoutDayExerciseProps) => {
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

    setSets([...newSets]);
  };

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

  const [stringData, setStringData] = useState<string[]>([]);
  const [value, setValue] = useState<string | number>("");
  const handleStringSearch = (value: string) => {
    let result: string[];
    if (value) {
      result = ["gmail.com", "163.com", "qq.com"].map(
        (domain) => `${value}@${domain}`
      );
    } else {
      result = [];
    }
    setStringData(result);
  };

  const handleChange = (value: string | number) => {
    console.log("onChange", value);
    setTags([...tags, { color: "red", children: value }]);
    setValue(value);
  };

  return (
    <Card
      style={{ marginBottom: 20 }}
      title={
        <Space wrap>
          <b>{orderNumber}</b>
          <Select
            defaultValue={selectedOption}
            options={options}
            isMulti
            onChange={(c) => setSelectedOption([...selectedOption, ...c])}
          />
        </Space>
      }
      headerStyle={{ backgroundColor: "rgba(var(--semi-grey-2), 1)" }}
    >
      <CardGroup>
        {sets.map((set, setNumber) => (
          <Badge count={setNumber} position="leftTop">
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
