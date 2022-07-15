import { Dispatch, SetStateAction, useState } from "react";
import {
  Badge,
  Button,
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
import { RepetitionsType, WorkoutDayExerciseSet } from "./set";

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

export const WorkoutDayExercise = ({
  orderNumber,
}: IWorkoutDayExerciseProps) => {
  const [sets, setSets] = useState<IWorkoutExerciseSet[]>([]);

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

  return (
    <Card>
      <Card.Header>
        <Stack direction="horizontal" gap={3}>
          <Form.Label>
            <b>{orderNumber}</b>
          </Form.Label>
          {/* <ReactTags
            key={orderNumber}
            tags={tags}
            suggestions={suggestions}
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleDrag={handleDrag}
            handleTagClick={handleTagClick}
            inputFieldPosition="inline"
            autocomplete={true}
            allowUnique={false}
          /> */}
        </Stack>
      </Card.Header>
      <Card.Body>
        <Container fluid={true}>
          <Row>
            {sets.map((set, setNumber) => (
              <Col sm={4} md={3} lg={3} xl={2} xxl={1}>
                <WorkoutDayExerciseSet
                  exerciseSet={set}
                  setNumber={setNumber}
                  key={`set-${setNumber}`}
                  updateExerciseSet={updateExerciseSet}
                />
              </Col>
            ))}
            <Col sm={4} md={3} lg={3} xl={2} xxl={1}>
              <Button variant="success" onClick={addNewExerciseSet}>
                Add set
              </Button>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};
