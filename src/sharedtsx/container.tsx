import Clock from "../clock/clock";
import Options from "../clock/options";

function Container() {
  return (
    <div className="clock-container">
      <Clock />
      <Options />
    </div>
  );
}

export default Container;
