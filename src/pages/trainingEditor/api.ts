import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  ITrainingDay,
  ITrainingDayExerciseSet,
  ITraningDayExercise,
} from "./models";

const httpClient = axios.create({
  baseURL: "https://some-domain.com/api/",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

export const useTrainingDayExercises = (trainingDayId: number) =>
  useQuery(["trainingDay", trainingDayId], async () => {
    const { data } = await httpClient.get<ITrainingDay>(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return data;
  });

export const useTrainingDayExercisePostMutation = (trainingDayId: number) => {
  const queryClient = useQueryClient();

  return useMutation(
    (trainingExercise: ITraningDayExercise) =>
      axios.post<number>(
        `/trainingDay/${trainingDayId}/exercises`,
        trainingExercise
      ),
    {
      onSuccess: (response, trainingDayExercise) => {
        queryClient.setQueryData<ITrainingDay>(
          ["trainingDay", trainingDayId],
          (old) => ({
            ...old,
            exercises: [
              ...old!.exercises,
              { ...trainingDayExercise, id: response.data },
            ],
          })
        );
      },
    }
  );
};

export const useTrainingDayExerciseSetPostMutation = (
  trainingDayId: number,
  trainingExerciseId: number
) => {
  const queryClient = useQueryClient();

  return useMutation(
    (trainingExerciseSet: ITrainingDayExerciseSet) =>
      axios.post<number>(
        `/trainingDay/${trainingDayId}/exercises/${trainingExerciseId}`,
        trainingExerciseSet
      ),
    {
      onSuccess: (response, trainingDayExerciseSet) => {
        queryClient.setQueryData<ITrainingDay>(
          ["trainingDay", trainingDayId, "exercises"],
          (old) => ({
            ...old!,
            exercises: old!.exercises.map((e) =>
              e.id === trainingExerciseId
                ? {
                    ...e,
                    sets: [
                      ...e.sets,
                      { ...trainingDayExerciseSet, id: response.data },
                    ],
                  }
                : e
            ),
          })
        );
      },
    }
  );
};
