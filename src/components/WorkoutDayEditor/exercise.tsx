import { Dispatch, SetStateAction, useState } from "react";
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
import { WorkoutDayExerciseSet } from "./set";

export interface IWorkoutDayExerciseProps {
  orderNumber: string;
}

export const WorkoutDayExercise = ({
  orderNumber,
}: IWorkoutDayExerciseProps) => {
  const [sets, setSets] = useState<>();
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
    <Card>
      <Card.Header>
        <Stack direction="horizontal" gap={3}>
          <Form.Label>
            <b>{orderNumber}</b>
          </Form.Label>
          <ReactTags
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
          />
        </Stack>
      </Card.Header>
      <Card.Body>
        <Container fluid={true}>
          <Row>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((setNumber) => (
              <Col sm={4} md={3} lg={3} xl={2} xxl={1}>
                <WorkoutDayExerciseSet
                  setNumber={setNumber}
                  key={`set-${setNumber}`}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};
