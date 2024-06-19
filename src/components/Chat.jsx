import React from "react";
import { IoLogoWhatsapp } from "react-icons/io";

const Chat = () => {
  const phoneNumber = "9685678544"; // Your specific phone number
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <div>
      <div>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <button className="w-48 absolute top-[80%] right-[10%] bg-green-100 rounded-full">
            <IoLogoWhatsapp
              style={{
                width: "100px",
                color: "green",
                height: "100px",
              }}
            />
          </button>
        </a>
      </div>
    </div>
  );
};

export default Chat;
