import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "./header/page";
import Sidebar from "./sidebar/page";
import Body from "./body/page";
const Dashboard = () => {
  const [option, setoptios] = useState("");
  const router = useRouter();
  const handleTabs = (value) => {
    if (value === "my_posts") {
      console.log("hello:::");
    }
  };
  return (
    <div className="w-full h-full flex flex-col">
      <div>
        <Header />
      </div>
      <hr />
      <div className="w-full h-180 flex">
        <div className="w-50 border-r">
          <Sidebar 
          handleTabs = {handleTabs}
          />
        </div>
        <div>
          <Body />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
