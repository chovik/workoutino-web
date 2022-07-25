import { TabPane, Tabs } from "@douyinfe/semi-ui";
import { useState } from "react";
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
      <Tabs type="button">
        <TabPane tab="Document" itemKey="1">
          <WorkoutDayEditor />
        </TabPane>
        <TabPane tab="Quick Start" itemKey="2">
          Quick Start
        </TabPane>
        <TabPane tab="Help" itemKey="3">
          Help
        </TabPane>
      </Tabs>
    </div>
  );
};
