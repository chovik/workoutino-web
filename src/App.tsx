import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { WorkoutEditorPage } from "./pages/workoutEditor";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <WorkoutEditorPage />
    </RecoilRoot>
  );
}

export default App;
