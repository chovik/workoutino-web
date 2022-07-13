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
import { WithContext as ReactTags } from "react-tag-input";
import React from "react";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { type } from "@testing-library/user-event/dist/type";

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
  setNumber: number;
  setWeightType: (type: WeightType) => void;
  setRepetitionsType: (type: RepetitionsType) => void;
}

export const WorkoutDayExerciseSet = ({
  setNumber,
  setRepetitionsType,
  setWeightType,
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

  return (
    <Col sm={4} md={3} lg={3} xl={2} xxl={1}>
      <Card>
        <Card.Header>
          {/* <Badge bg="secondary">{setNumber}</Badge> */}
          <Form.Label>Reps</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              aria-label="Text input with dropdown button"
              placeholder="min"
              size="sm"
            />
            <span style={{ margin: 5 }}> - </span>
            <Form.Control
              aria-label="Text input with dropdown button"
              placeholder="max"
              size="sm"
            />

            <DropdownButton
              size="sm"
              variant="outline-secondary"
              title="Reps"
              id="input-group-dropdown-1"
            >
              {repetitionSelectItems.map((selectItem) => (
                <Dropdown.Item
                  href="#"
                  onChange={() => setRepetitionsType(selectItem.value)}
                >
                  {selectItem.label}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </InputGroup>
        </Card.Header>
        <Card.Body>
          <InputGroup className="mb-3">
            <Form.Control
              aria-label="Text input with dropdown button"
              placeholder="min"
              size="sm"
            />
            <span style={{ margin: 5 }}> - </span>
            <Form.Control
              aria-label="Text input with dropdown button"
              placeholder="max"
              size="sm"
            />
            <DropdownButton
              size="sm"
              variant="outline-secondary"
              title="Reps"
              id="input-group-dropdown-1"
            >
              {weightSelectItems.map((selectItem) => (
                <Dropdown.Item
                  href="#"
                  onChange={() => setWeightType(selectItem.value)}
                >
                  {selectItem.label}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </InputGroup>
        </Card.Body>
      </Card>
    </Col>
  );
};
