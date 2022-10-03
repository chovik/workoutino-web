import { useState } from "react";
import { Button } from "semantic-ui-react";
import { AddTrainingProgramModal } from "./AddTrainingProgramModal";
import { ITrainingProgram } from "./TrainingEditor";

export interface ITrainerHomePageProps {
  trainingPrograms: ITrainingProgram[];
}

export const TrainerHomePage = ({
  trainingPrograms,
}: ITrainerHomePageProps) => {
  const [isAddNewTrainingModalOpen, setIsAddNewTrainingModalOpen] =
    useState(true);
  return (
    <div>
      <Button
        content={"Create new training"}
        onClick={() => setIsAddNewTrainingModalOpen(true)}
      />
      <div>
        {trainingPrograms.map((p) => (
          <div>{p.id ?? "unknown"}</div>
        ))}
      </div>
      <AddTrainingProgramModal
        isOpen={isAddNewTrainingModalOpen}
        setIsOpen={setIsAddNewTrainingModalOpen}
      />
    </div>
  );
};
