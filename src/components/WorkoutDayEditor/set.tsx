import React from "react";
import { IWorkoutExerciseSet } from "./exercise";
import {
  Badge,
  Button,
  Input,
  InputNumber,
  List,
  Select,
  Space,
  Tag,
  Typography,
} from "@douyinfe/semi-ui";
import { IconCamera } from "@douyinfe/semi-icons";

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
  const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  console.log(exerciseSet.repetitions.type);
  return (
    <>
      <div>
        <Space spacing={"tight"}>
          <div>
            <Tag color="blue" size="large">
              <b>Repetitions</b>
            </Tag>
          </div>
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
        </Space>
        <div style={{ marginTop: "5px", marginBottom: "5px" }}>
          {exerciseSet.repetitions.type === RepetitionsType.Fixed && (
            <InputNumber
              style={{ width: "50px" }}
              innerButtons
              size="small"
              value={exerciseSet.repetitions.value}
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
                value={exerciseSet.repetitions.valueFrom}
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
                value={exerciseSet.repetitions.valueTo}
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
              value={exerciseSet.repetitions.value}
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
        <Space spacing={"tight"}>
          <Tag color="blue" size="large">
            <b>Weight</b>
          </Tag>
          <Select
            placeholder="Weight type"
            optionList={weightSelectItems}
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
        </Space>
        <div style={{ marginTop: "5px" }}>
          {exerciseSet.weight.type === WeightType.Fixed && (
            <InputNumber
              style={{ width: "50px" }}
              innerButtons
              size="small"
              value={exerciseSet.weight.value}
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
                value={exerciseSet.weight.valueFrom}
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
                value={exerciseSet.weight.valueTo}
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
              value={exerciseSet.weight.value}
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
