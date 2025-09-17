import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [expanded, setExpanded] = useState({}); // Tracks expanded state for all options

  const mySections = {
    "computerScience": {
      "Year2": {
        "Semester1": ["SectionA", "SectionB"],
        "Semester2": ["SectionA"]
      },
      "Year3": {
        "Semester1": ["SectionA"]
      }
    },
    "electronics": {
      "Year1": {
        "Semester1": ["SectionA", "SectionB"],
        "Semester2": ["SectionA"]
      },
      "Year2": {
        "Semester1": ["SectionC"]
      }
    }
  };

  // General function to handle toggling for any label, branch, year, or semester
  const toggleExpand = (key) => {
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key], // Toggle the specific key (label, branch, year, etc.)
    }));
  };

  const labels = ["WorkStation", "Marks", "Repository"];

  return (
    <div className="w-64 h-full fixed bg-gray-100 shadow-md p-4">
      <h3 className="text-lg font-bold mb-4">Navbar</h3>
      <div className="space-y-4">
        {labels.map((label) => (
          <div key={label}>
            {/* Main Label */}
            <button
              onClick={() => toggleExpand(label)}
              className="w-full text-left font-semibold text-gray-700 hover:text-gray-900"
            >
              {label}
            </button>
            {expanded[label] && (
              <div className="pl-4 mt-2 space-y-2">
                {Object.keys(mySections).map((branch) => (
                  <div key={branch}>
                    {/* Branch */}
                    <button
                      onClick={() => toggleExpand(`${label}_${branch}`)}
                      className="w-full text-left text-gray-600 hover:text-gray-800"
                    >
                      {branch}
                    </button>
                    {expanded[`${label}_${branch}`] && (
                      <div className="pl-4 mt-1 space-y-1">
                        {Object.keys(mySections[branch]).map((year) => (
                          <div key={year}>
                            {/* Year */}
                            <button
                              onClick={() => toggleExpand(`${label}_${branch}_${year}`)}
                              className="w-full text-left text-gray-500 hover:text-gray-700"
                            >
                              {year}
                            </button>
                            {expanded[`${label}_${branch}_${year}`] && (
                              <div className="pl-4 mt-1 space-y-1">
                                {Object.keys(mySections[branch][year]).map((semester) => (
                                  <div key={semester}>
                                    {/* Semester */}
                                    <button
                                      onClick={() => toggleExpand(`${label}_${branch}_${year}_${semester}`)}
                                      className="w-full text-left text-gray-400 hover:text-gray-600"
                                    >
                                      {semester}
                                    </button>
                                    {expanded[`${label}_${branch}_${year}_${semester}`] && (
                                      <div className="pl-4 mt-1 space-y-1">
                                        {mySections[branch][year][semester].map((section) => (
                                          <div key={section}>
                                            <Link
                                              to={`/${label}/${branch}_${year}_${semester}_${section}`}
                                              className="block text-sm text-blue-600 hover:underline"
                                            >
                                              {section}
                                            </Link>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
