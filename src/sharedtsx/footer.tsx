import Message, { type MessageProps } from "./message";

function Footer() {
  let messages: MessageProps[] = [
    // { message: "This is an info message", type: "info" },
    // { message: "This is an error message", type: "error" },
    // { message: "This is a success message", type: "success" },
    // { message: "This is an warning message", type: "warning" },
    // { message: "This is a dark message", type: "dark" },
  ];

  // You can also use the messages array to render multiple Message components if needed
  return (
    <>
      {messages.map((msg, index) => (
        <div className="mt-6">
          <Message key={index} message={msg.message} type={msg.type} />
        </div>
      ))}
    </>
  );
}

export default Footer;
