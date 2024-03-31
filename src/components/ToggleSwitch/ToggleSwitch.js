import { useContext } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );
  return (
    <>
      <input
        className="toggleSwitch-checkbox"
        id={`toggleSwitch-new`}
        type="checkbox"
        onChange={handleToggleSwitchChange}
      />
      <label className="toggleSwitch-label" htmlFor={`toggleSwitch-new`}>
        {" "}
        <p
          className="toggleSwitch-label-F"
          style={{ color: currentTemperatureUnit === "F" ? "#fff" : "#7e7e7e" }}
        >
          F
        </p>
        <p
          className="toggleSwitch-label-C"
          style={{ color: currentTemperatureUnit === "C" ? "#fff" : "#7e7e7e" }}
        >
          C
        </p>
        <span className={`toggleSwitch-button`} />
      </label>
    </>
  );
};
export default ToggleSwitch;
