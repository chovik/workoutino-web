import React from "react";
import { IWorkoutExerciseSet } from "./exercise";
import {
  Badge,
  Input,
  InputNumber,
  List,
  Select,
  Tag,
  Typography,
} from "@douyinfe/semi-ui";

export enum WeightType {
  Fixed = "FIXED",
  Range = "RANGE",
  RIR = "RIR",
}

export enum RepetitionsType {
  Fixed = "FIXED",
  Range = "RANGE",
  RIR = "RIR",
}

export interface ISelectValue<TValue> {
  value: TValue;
  label: string;
}

const repetitionSelectItems: ISelectValue<RepetitionsType>[] = [
  { value: RepetitionsType.Fixed, label: "Fixed" },
  { value: RepetitionsType.RIR, label: "RIR" },
  { value: RepetitionsType.Range, label: "Range" },
];

const weightSelectItems: ISelectValue<WeightType>[] = [
  { value: WeightType.Fixed, label: "Fixed" },
  { value: WeightType.RIR, label: "RIR" },
  { value: WeightType.Range, label: "Range" },
];

export interface IWorkoutDayExerciseSetProps {
  exerciseSet: IWorkoutExerciseSet;
  setNumber: number;
  updateExerciseSet: (
    uid: string,
    updatedSet: Partial<IWorkoutExerciseSet>
  ) => void;
}

export const WorkoutDayExerciseSet = ({
  exerciseSet,
  setNumber,
  updateExerciseSet,
}: IWorkoutDayExerciseSetProps) => {
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

  const list = [
    { value: "abc", label: "Semi" },
    { value: "hotsoon", label: "Hotsoon" },
    { value: "pipixia", label: "Pipixia" },
    { value: "toutiao", label: "TooBuzz" },
  ];

  console.log(exerciseSet.repetitions.type);
  return (
    <>
      <div>
        <Tag color="blue" size="large">
          <b>Repetitions</b>
        </Tag>
        <Select
          placeholder="Weight type"
          optionList={repetitionSelectItems}
          size="small"
          style={{ marginLeft: "5px" }}
          onChange={(value) =>
            updateExerciseSet(exerciseSet.uid, {
              repetitions: {
                ...exerciseSet.repetitions,
                type: value as RepetitionsType,
              },
            })
          }
        />
        <div style={{ marginTop: "5px", marginBottom: "5px" }}>
          {exerciseSet.repetitions.type === RepetitionsType.Fixed && (
            <InputNumber
              style={{ width: "50px" }}
              innerButtons
              size="small"
              defaultValue={exerciseSet.repetitions.value}
              onChange={(value) =>
                updateExerciseSet(exerciseSet.uid, {
                  repetitions: {
                    ...exerciseSet.repetitions,
                    value: +value,
                  },
                })
              }
            />
          )}

          {exerciseSet.repetitions.type === RepetitionsType.Range && (
            <>
              <InputNumber
                style={{ width: "50px" }}
                innerButtons
                size="small"
                defaultValue={exerciseSet.repetitions.valueFrom}
                onChange={(value) =>
                  updateExerciseSet(exerciseSet.uid, {
                    repetitions: {
                      ...exerciseSet.repetitions,
                      valueFrom: +value,
                    },
                  })
                }
              />
              <span style={{ margin: 5 }}> - </span>
              <InputNumber
                innerButtons
                style={{ width: "50px" }}
                size="small"
                defaultValue={exerciseSet.repetitions.valueTo}
                onChange={(value) =>
                  updateExerciseSet(exerciseSet.uid, {
                    repetitions: {
                      ...exerciseSet.repetitions,
                      valueTo: +value,
                    },
                  })
                }
              />
            </>
          )}

          {exerciseSet.repetitions.type === RepetitionsType.RIR && (
            <InputNumber
              style={{ width: "50px" }}
              innerButtons
              size="small"
              defaultValue={exerciseSet.repetitions.value}
              onChange={(value) =>
                updateExerciseSet(exerciseSet.uid, {
                  repetitions: {
                    ...exerciseSet.repetitions,
                    value: +value,
                  },
                })
              }
            />
          )}
        </div>
      </div>
      <div>
        <Tag color="blue" size="large">
          <b>Weight</b>
        </Tag>
        <Select
          placeholder="Weight type"
          optionList={repetitionSelectItems}
          size="small"
          style={{ marginLeft: "5px" }}
          onChange={(value) =>
            updateExerciseSet(exerciseSet.uid, {
              weight: {
                ...exerciseSet.weight,
                type: value as WeightType,
              },
            })
          }
        />
        <div style={{ marginTop: "5px" }}>
          {exerciseSet.weight.type === WeightType.Fixed && (
            <InputNumber
              style={{ width: "50px" }}
              innerButtons
              size="small"
              defaultValue={exerciseSet.weight.value}
              onChange={(value) =>
                updateExerciseSet(exerciseSet.uid, {
                  weight: {
                    ...exerciseSet.weight,
                    value: +value,
                  },
                })
              }
            />
          )}

          {exerciseSet.weight.type === WeightType.Range && (
            <>
              <InputNumber
                style={{ width: "50px" }}
                innerButtons
                size="small"
                defaultValue={exerciseSet.weight.valueFrom}
                onChange={(value) =>
                  updateExerciseSet(exerciseSet.uid, {
                    weight: {
                      ...exerciseSet.weight,
                      valueFrom: +value,
                    },
                  })
                }
              />
              <span style={{ margin: 5 }}> - </span>
              <InputNumber
                style={{ width: "50px" }}
                innerButtons
                size="small"
                defaultValue={exerciseSet.weight.valueTo}
                onChange={(value) =>
                  updateExerciseSet(exerciseSet.uid, {
                    weight: {
                      ...exerciseSet.weight,
                      valueTo: +value,
                    },
                  })
                }
              />
            </>
          )}

          {exerciseSet.weight.type === WeightType.RIR && (
            <InputNumber
              style={{ width: "50px" }}
              innerButtons
              size="small"
              defaultValue={exerciseSet.weight.value}
              onChange={(value) =>
                updateExerciseSet(exerciseSet.uid, {
                  weight: {
                    ...exerciseSet.weight,
                    value: +value,
                  },
                })
              }
            />
          )}
        </div>
      </div>
    </>
  );
};
