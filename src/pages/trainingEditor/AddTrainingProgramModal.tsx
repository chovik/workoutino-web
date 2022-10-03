import { Dispatch, SetStateAction, useState } from "react";
import { Modal, Button, Form, InputOnChangeData } from "semantic-ui-react";
import { WeekDays } from "./models";

export interface IAddTrainingProgramModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export interface IAddTrainingProgramModalFormData {
  days: WeekDays[];
  note: string | null;
}

export const AddTrainingProgramModal = ({
  isOpen,
  setIsOpen,
}: IAddTrainingProgramModalProps) => {
  const [{ days, note }, setFormData] =
    useState<IAddTrainingProgramModalFormData>({
      days: [],
      note: null,
    });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: data.value,
    }));
  };

  return (
    <Modal
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      open={isOpen}
    >
      <Modal.Header>Select a Photo</Modal.Header>
      <Modal.Content image>
        <Form>
          <Form.Group widths="equal">
            {Object.values(WeekDays).map((day) => (
              <Form.Checkbox
                checked={days.includes(day as WeekDays)}
                onChange={(e, data) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    days: data.checked
                      ? [...prevState.days, day as WeekDays]
                      : prevState.days.filter((e) => e !== day),
                  }))
                }
              />
            ))}

            <Form.Input
              name="note"
              label="Note"
              value={note}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setIsOpen(false)}>
          Nope
        </Button>
        <Button
          content="Yep, that's me"
          labelPosition="right"
          icon="checkmark"
          onClick={() => setIsOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};
