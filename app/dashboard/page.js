'use client'
import React, { useState } from "react";
import Header from "./header/page";
import All_Posts from "./body/allPosts/page";
import My_Posts from "./body/myPost/page";
import CreateNewPost from "./body/createNew/page";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("All_Posts");

  const rendergroup = {
    All_Posts: All_Posts,
    My_Posts: My_Posts,
    CreateNewPost: CreateNewPost
  };

  const options = [
    { name: "All Posts", identifier: "All_Posts" },
    { name: "My Posts", identifier: "My_Posts" },
    { name: "New Post", identifier: "CreateNewPost" },
  ];

  const ActiveComponent = rendergroup[activeTab];

  return (
    // <div className="w-full h-screen flex flex-col">
    //   <Header />
    //   <hr />
    //   <div className="flex flex-1">
    //     {/* Sidebar */}
    //     <aside className="w-1/6 border-r p-4 bg-gray-100">
    //       <ul className="space-y-2">
    //         {options.map((item) => (
    //           <li key={item.identifier}>
    //             <button
    //               onClick={() => setActiveTab(item.identifier)}
    //               className={`w-full text-left p-2 rounded ${
    //                 activeTab === item.identifier
    //                   ? 'bg-blue-500 text-white'
    //                   : 'bg-white hover:bg-gray-200'
    //               }`}
    //             >
    //               {item.name}
    //             </button>
    //           </li>
    //         ))}
    //       </ul>
    //     </aside>

    //     {/* Body Content */}
    //       <main className="w-3/4 p-6">
    //         {ActiveComponent ? <ActiveComponent /> : null}
    //       </main>
    //   </div>
    // </div>

    <div className="w-full h-screen flex flex-col">
  <Header />
  <hr />

  <div className="flex flex-1 overflow-hidden">
    {/* Sidebar */}
    <aside className="w-1/6 border-r p-4 bg-gray-100">
      <ul className="space-y-2">
        {options.map((item) => (
          <li key={item.identifier}>
            <button
              onClick={() => setActiveTab(item.identifier)}
              className={`w-full text-left p-2 rounded ${
                activeTab === item.identifier
                  ? "bg-blue-500 text-white"
                  : "bg-white hover:bg-gray-200"
              }`}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>

    {/* Main scrollable body */}
    <main className="w-5/6 p-6 overflow-y-auto">
      {ActiveComponent ? <ActiveComponent /> : null}
    </main>
  </div>
</div>

  );
};

export default Dashboard;

