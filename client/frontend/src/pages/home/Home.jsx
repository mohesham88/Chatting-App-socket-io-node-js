import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";

import MessageContainer from "../../components/messages/MessageContainer";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const userData = query.get("user");

    if (userData) {
      const user = JSON.parse(decodeURIComponent(userData));
      // Store user data in local storage or state
      localStorage.setItem("user", JSON.stringify(user));
      // may redirect here
    }
  }, []);

  return (
    <div className="flex sm:h-[450px] md:min-w-[1100px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Sidebar />

      <MessageContainer />
    </div>
  );
};
export default Home;
