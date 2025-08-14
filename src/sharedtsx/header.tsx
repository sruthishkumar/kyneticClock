import { useState } from "react";

function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const currentDate = new Date();

  // Function to toggle the visibility state
  const toggleVisibility = () => {
    setIsVisible(!isVisible); // Toggle the state
  };
  return (
    <>
      {!isVisible && (
        <div className="border-gray-200">
          <button onClick={toggleVisibility}>
            <span className="material-icons">trip_origin</span>
          </button>
        </div>
      )}
      {isVisible && (
        <nav className="border-gray-200">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
            <a
              href="https://flowbite.com"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <h1 className="mb-2 text-2xl font-extrabold leading-none tracking-tight text-white-900 md:text-3xl lg:text-3xl">
                <blockquote className="text-center text-3xl font-semibold text-gray-900 italic dark:text-white">
                  <span className="relative text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 mr-2">
                    Kynetic Clock
                  </span>
                  {/* <span className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-gray-200 border-3">
                </span> */}
                </blockquote>
              </h1>
            </a>
            <div className="flex items-center space-x-6 rtl:space-x-reverse">
              <button onClick={toggleVisibility}>
                <span className="material-icons">trip_origin</span>
              </button>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

export default Header;
