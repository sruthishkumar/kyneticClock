import * as React from "react";

import Clock from "../clock/clock";
import Timer from "../clock/timer";
import TimerDemo from "../clock/timerdemo";
import KineticClockWall from "../clock/haluc";
import RecTimer from "../clock/rectimer";
import Options from "../clock/options";
import { useState } from "react";

import {
  ToggleButton as MuiToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface ToggleButtonOwnProps {
  // ... other existing props
  selectedColor?: string; // or a more specific color type
}

function Container() {
  const [clock, setClock] = useState<string | null>("clock");
  const [sharedValue, setSharedValue] = useState(90);

  const handleValueChange = (newValue: number) => {
    setSharedValue(newValue);
  };

  const CustomToggleButton = styled(MuiToggleButton)({
    "&.MuiToggleButton-primary, &.MuiToggleButton-primary:hover": {
      color: "#d6bc6e",
      backgroundColor: "#000",
    },
    "&.Mui-selected, &.Mui-selected:hover": {
      color: "#d6bc6e",
      borderBottom: "1px solid #d6bc6e",
    },
  });

  const handleClock = (
    event: React.MouseEvent<HTMLElement>,
    newclock: string | null
  ) => {
    setClock(newclock);
    console.log("clock changed to:", newclock);
  };

  return (
    <div className="clock-container">
      <Clock value={sharedValue} />
      {/* {clock === "clock" && }
      {clock === "timer" && (
        <>
          <TimerDemo />
          <Timer /> 
          <KineticClockWall />
        </>
      )}
      {clock === "rectimer" && <RecTimer />}
      <ToggleButtonGroup
        color="primary"
        value={clock}
        exclusive
        onChange={handleClock}
        aria-label="Platform"
      >
        <CustomToggleButton value="clock">
          <span className="material-icons material-symbols-outlined mr-1">
            schedule
          </span>
          Clock
        </CustomToggleButton>
        <CustomToggleButton value="timer">
          <span className="material-symbols-outlined mr-1">timer</span>
          Timer
        </CustomToggleButton>
        <CustomToggleButton value="rectimer">
          <span className="material-icons material-symbols-outlined mr-1">
            history
          </span>
          Recursive Timer
        </CustomToggleButton>
      </ToggleButtonGroup> */}

      <Options onValueChange={handleValueChange} />
    </div>
  );
}

export default Container;
