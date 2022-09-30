import { Dispatch, SetStateAction, useState } from "react";
import { Dropdown, DropdownProps } from "semantic-ui-react";

const optionsS: IOptionValue[] = [
  { key: 1, text: "English", value: 1 },
  { key: 2, text: "French", value: 2 },
  { key: 3, text: "Spanish", value: 3 },
  { key: 4, text: "German", value: 4 },
  { key: 5, text: "Chinese", value: 5 },
];
export interface IOptionValue {
  key: number;
  text: string;
  value: number;
}

export interface IExercisesSelectProps {
  selectedExerciseIds: number[];
  setSelectedExerciseIds: (exerciseIds: number[]) => void;
}

export const ExercisesSelect = ({
  selectedExerciseIds,
  setSelectedExerciseIds,
}: IExercisesSelectProps) => {
  const [options, setOptions] = useState(optionsS);

  const handleAddition = (
    e: React.SyntheticEvent<HTMLElement>,
    { value }: DropdownProps
  ) => {
    if (!value) return;

    setOptions((prevState) => [
      ...prevState,
      {
        key: prevState.length + 2,
        value: prevState.length + 2,
        text: value?.toString(),
      },
    ]);
  };

  const handleChange = (
    e: React.SyntheticEvent<HTMLElement>,
    { value }: DropdownProps
  ) => {
    console.log(value, typeof value === "number");
    value && setSelectedExerciseIds([...(value as number[])]);
  };

  return (
    <Dropdown
      options={options}
      placeholder="Choose Languages"
      search
      selection
      fluid
      multiple
      value={selectedExerciseIds}
      onAddItem={handleAddition}
      onChange={handleChange}
    />
  );
};
