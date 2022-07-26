import { Checkbox, CheckboxGroup } from "@douyinfe/semi-ui";
import { Dispatch, SetStateAction, useState } from "react";

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
    <div>
      {Object.values(WEEK_DAYS).map((day) => (
        <Checkbox
          key={`weekday-${day}`}
          id={`weekday-${day}`}
          onChange={(e) =>
            checkDay(day as WEEK_DAYS, e.target.checked ?? false)
          }
        >
          ${day}
        </Checkbox>
      ))}
    </div>
  );
};
