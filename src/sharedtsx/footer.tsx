import Message, { type MessageProps } from "./message";

function Footer() {
  let messages: MessageProps[] = [
    // { message: "This is an info message", type: "info" },
    // { message: "This is an error message", type: "error" },
    // { message: "This is a success message", type: "success" },
    // { message: "This is an warning message", type: "warning" },
    // { message: "This is a dark message", type: "dark" },
  ];

  function DoFullscreen(event: React.MouseEvent<HTMLButtonElement>): void {
    document.documentElement.requestFullscreen();

    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
  // You can also use the messages array to render multiple Message components if needed
  return (
    <>
      {messages.map((msg, index) => (
        <div className="mt-6">
          <Message key={index} message={msg.message} type={msg.type} />
        </div>
      ))}
      <footer className="text-center text-gray-500 text-xs my-4">
        &copy; {new Date().getFullYear()} Kynetic Clock. All rights reserved.
        <button onClick={DoFullscreen}>
          <span className="material-icons">fullscreen</span>
        </button>
      </footer>
    </>
  );
}

export default Footer;
