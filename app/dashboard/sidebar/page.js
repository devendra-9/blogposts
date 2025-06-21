import React from "react";

const Sidebar = ({handleTabs}) => {

  const lists = [
    { id: "1", label: "My Posts", value: "my_posts" },
    { id: "2", label: "All Posts", value: "all_posts" },
  ];

  return (
    <>
      {lists.map((items) => {
        return (
          <div key={items.id} className="w-full my-2">
            <button
              className="w-full h-10 cursor-pointer bg-red-200"
              onClick={() => handleTabs(items?.value)}
            >
              {items.label}
            </button>
          </div>
        );
      })}
    </>
  );
};

export default Sidebar;
