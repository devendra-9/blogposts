import React from 'react';

export default function TabsClient({ options, activeTab, setActiveTab }) {
  return (
    <aside className="w-1/6 border-r p-4 bg-gray-100">
      <ul className="space-y-2">
        {options.map((item) => (
          <li key={item.identifier}>
            <button
              onClick={() => setActiveTab(item.identifier)}
              className={`w-full text-left p-2 rounded ${
                activeTab === item.identifier
                  ? 'bg-blue-500 text-white'
                  : 'bg-white hover:bg-gray-200'
              }`}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
