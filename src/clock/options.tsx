import { useState, useEffect } from "react";
import { Slider } from "@mui/material";
import { Button } from "@/components/ui/button";
import { Expand, SwatchBook } from "lucide-react";
import { SlidingNumber } from "@/components/ui/sliding-number";

export default function Options({ onValueChange }) {
  const [isVisible, setIsVisible] = useState(false);
  const [clockZoom, setZoom] = useState(90);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1); // Use functional update for state
    }, 1000); // Update every 1 second

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures effect runs only once on mount

  function valuetext(value: number, index: number) {
    return `${value}°C`;
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible); // Toggle the state
  };

  function DoFullscreen(event: React.MouseEvent<HTMLButtonElement>): void {
    document.documentElement.requestFullscreen();

    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  const setClockZoomChange = (event: React.DragEvent, newValue: number) => {
    setZoom(newValue);
    console.log(clockZoom);
    event.preventDefault();
    onValueChange(clockZoom);
  };

  return (
    <>
      <div
        className={`clock-header cursor-pointer transition-transform duration-1000 ease-linear mx-auto p-4 fixed bottom-1 left-1/2 -translate-x-2/4 ${
          isVisible ? "w-6/12" : "w-6 h-6"
        }`}
        onClick={toggleVisibility}
      >
        {isVisible && (
          <div className="flex flex-row flex-wrap justify-evenly">
            <div>
              <div className="w-full md:w-[100px]">
                <Slider
                  value={clockZoom}
                  onChange={setClockZoomChange}
                  min={30}
                  max={150}
                  step={10}
                  sx={{
                    color: "white", // Changes track and thumb color
                    "& .MuiSlider-thumb": {
                      backgroundColor: "white", // Changes thumb color specifically
                    },
                  }}
                />
              </div>
            </div>

            <Button variant="outline" onClick={DoFullscreen} title="Fullscreen">
              <Expand />
            </Button>

            <Button variant="outline">
              <SwatchBook />
            </Button>

            <div>
              <SlidingNumber
                from={count - 1}
                to={count}
                duration={0.4}
                className="text-4xl font-bold text-white"
                digitHeight={40}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
// Removed conflicting local declaration of useState
