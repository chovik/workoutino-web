import { Dispatch, SetStateAction, useState } from "react";
import { FormGroup, Form } from "react-bootstrap";

export enum WEEK_DAYS {
  Sunday = "Sunday",
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
}

export interface IWeekkDayCheckBoxListProps {
  checkedDays: WEEK_DAYS[];
  setCheckedDays: Dispatch<SetStateAction<WEEK_DAYS[]>>;
}

export const WeekDayCheckBoxList = ({
  checkedDays,
  setCheckedDays,
}: IWeekkDayCheckBoxListProps) => {
  const checkDay = (day: WEEK_DAYS, checked: boolean) => {
    setCheckedDays((prev) => {
      const filteredDays = prev.filter((prevDay) => prevDay !== day);
      return checked ? [...prev, day] : filteredDays;
    });
  };

  console.log(checkedDays);
  console.log(Object.values(WEEK_DAYS));

  return (
    <FormGroup>
      {Object.values(WEEK_DAYS).map((day) => (
        <Form.Check
          inline={true}
          type={"checkbox"}
          id={`weekday-${day}`}
          label={`${day}`}
          onChange={(e) => checkDay(day as WEEK_DAYS, e.target.checked)}
        />
      ))}
    </FormGroup>
  );
};
