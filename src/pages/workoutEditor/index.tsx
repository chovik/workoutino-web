import { useState } from "react";
import { Form, FormGroup, Nav, NavItem, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  WeekDayCheckBoxList,
  WEEK_DAYS,
} from "../../components/WeekDayCheckboxList";
import { WorkoutDayEditor } from "../../components/WorkoutDayEditor";

export const WorkoutEditorPage = () => {
  const [checkedDays, setCheckedDays] = useState<WEEK_DAYS[]>([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <WeekDayCheckBoxList
        checkedDays={checkedDays}
        setCheckedDays={setCheckedDays}
      />
      <Nav variant="pills">
        {checkedDays.map((day) => (
          <Nav.Item>
            <Nav.Link eventKey={day}>{day}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      <WorkoutDayEditor />
    </div>
  );
};
