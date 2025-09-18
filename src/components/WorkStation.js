import { useState, useEffect } from "react"
import { CheckCircle, Trash2, AlertCircle, Clock, User, Users, Calendar, ChevronRight, Download, Plus, X } from "lucide-react"
import { generateTasksPDF } from "./services/pdfService"
import { useNotification } from "./contextprovider/NotificationContext"

const WorkStation = () => {
  const { addNotification } = useNotification();
  const [data, setData] = useState({
    today_remainder: [
      {
        to: "ALL",
        assigner: [
          {
            by: "you",
            access: true,
            value: ["lab external will be conducted in E-ClassRoom"],
          },
          {
            by: "Eswari",
            access: false,
            value: ["Bring Laptop", "Get Docuementation Printout", "Mentain Proper Dress code"],
          },
        ],
      },
      {
        to: "Gopi",
        assigner: [
          {
            by: "Eswari",
            access: false,
            value: ["show me the application", "send me the zip file"],
          },
        ],
      },
    ],
    today_task: [
      {
        to: "ALL",
        assigner: [
          {
            by: "you",
            access: true,
            context: [
              {
                value: "send me registration forms",
                status: "PENDING",
              },
              {
                value: "NEOPAT EXAM ",
                status: "CONFORMATION",
              },
            ],
          },
          {
            by: "Shaik Riyaz",
            access: false,
            context: [
              {
                value: "bring your notebooks",
                status: "PENDING",
              },
              {
                value: "send me photos ",
                status: "CONFORMATION",
              },
            ],
          },
        ],
      },
      {
        to: "Abhinav",
        assigner: [
          {
            by: "Eswari",
            access: false,
            context: [
              {
                value: "send me the code",
                status: "PENDING",
              },
            ],
          },
        ],
      },
    ],
  })
  
  const [showNewTaskForm, setShowNewTaskForm] = useState(false)
  const [newTask, setNewTask] = useState({
    to: "ALL",
    value: "",
  })

  // Confirm Task
  const confirmTask = async (taskIndex, assignerIndex, contextIndex) => {
    try {
      // In a real app, uncomment this API call
      // const response = await fetch(
      //   `https://your-backend-api.com/confirm-task/${taskIndex}/${assignerIndex}/${contextIndex}`,
      //   { method: 'POST' }
      // );

      // if (response.ok) {
      const updatedData = { ...data }
      const taskValue = updatedData.today_task[taskIndex].assigner[assignerIndex].context[contextIndex].value;
      updatedData.today_task[taskIndex].assigner[assignerIndex].context[contextIndex].status = "COMPLETED"
      setData(updatedData)
      addNotification(`Task "${taskValue}" marked as completed`, "success");
      // }
    } catch (error) {
      console.error("Error confirming task:", error)
      alert("Failed to confirm task.")
    }
  }

  // Delete Task
  const deleteTask = (taskIndex, assignerIndex, contextIndex) => {
    const updatedData = { ...data }
    const taskValue = updatedData.today_task[taskIndex].assigner[assignerIndex].context[contextIndex].value;
    updatedData.today_task[taskIndex].assigner[assignerIndex].context.splice(contextIndex, 1)
    setData(updatedData)
    addNotification(`Task "${taskValue}" has been deleted`, "info");
  }

  // Delete remainder function
  const deleteRemainder = async (remainderIndex, assignerIndex) => {
    const remainder = data.today_remainder[remainderIndex]
    const assigner = remainder.assigner[assignerIndex]

    if (assigner.access) {
      try {
        // In a real app, uncomment this API call
        // const response = await fetch(
        //   `https://your-backend-api.com/remainders/${remainderIndex}/${assignerIndex}`,
        //   { method: 'DELETE' }
        // );

        // if (response.ok) {
        const updatedData = { ...data }
        const reminderValues = assigner.value.join(", ");
        updatedData.today_remainder.splice(remainderIndex, 1)
        setData(updatedData)
        addNotification(`Reminder "${reminderValues}" has been deleted`, "info");
        // }
      } catch (error) {
        console.error("Error deleting remainder:", error)
        alert("Failed to delete remainder.")
      }
    }
  }

  // Poll Tasks
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        // In a real app, uncomment this API call
        // const response = await fetch("https://your-backend-api.com/tasks");
        // if (response.ok) {
        //   const newData = await response.json();
        //   setData(newData);
        // }
      } catch (error) {
        console.error("Error polling tasks:", error)
      }
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  const getStatusBadge = (status) => {
    if (status === "PENDING") {
      return (
        <span className="inline-flex items-center gap-1 text-blue-600 text-xs font-medium px-2.5 py-1 bg-blue-50 rounded-full border border-blue-100">
          <Clock size={12} className="text-blue-500" />
          Pending
        </span>
      )
    }
    if (status === "CONFORMATION") {
      return (
        <span className="inline-flex items-center gap-1 text-amber-600 text-xs font-medium px-2.5 py-1 bg-amber-50 rounded-full border border-amber-100">
          <AlertCircle size={12} className="text-amber-500" />
          Needs Confirmation
        </span>
      )
    }
    if (status === "COMPLETED") {
      return (
        <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-medium px-2.5 py-1 bg-emerald-50 rounded-full border border-emerald-100">
          <CheckCircle size={12} className="text-emerald-500" />
          Completed
        </span>
      )
    }
    return null
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Work Station</h1>
          <p className="text-gray-500">Manage your tasks and reminders in one place</p>
        </div>
        <button
          onClick={() => {
            generateTasksPDF(data, "Your Name");
            addNotification("PDF has been downloaded successfully", "success");
          }}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          <Download size={16} className="mr-2" />
          Download PDF
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Remainders Section */}
        <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-sm border border-blue-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Today's Reminders</h2>
          </div>

          <div className="space-y-4">
            {data.today_remainder.map((remainder, remainderIndex) => (
              <div
                key={remainderIndex}
                className="p-5 bg-white rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-blue-500 text-white p-1.5 rounded-lg">
                    {remainder.to === "ALL" ? <Users size={16} /> : <User size={16} />}
                  </div>
                  <h3 className="font-medium text-gray-800">
                    To: <span className="text-blue-600">{remainder.to}</span>
                  </h3>
                </div>

                {remainder.assigner.map((assigner, assignerIndex) => (
                  <div key={assignerIndex} className="mt-4 pl-4 border-l-2 border-blue-100">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      From: <span className="text-blue-600">{assigner.by}</span>
                    </p>
                    <ul className="space-y-2.5 mt-3">
                      {assigner.value &&
                        assigner.value.map((val, vIdx) => (
                          <li
                            key={vIdx}
                            className="text-sm text-gray-600 flex items-start gap-2.5 bg-gray-50 p-2.5 rounded-lg"
                          >
                            <ChevronRight className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                            <span>{val}</span>
                          </li>
                        ))}
                    </ul>

                    {assigner.access && (
                      <button
                        onClick={() => deleteRemainder(remainderIndex, assignerIndex)}
                        className="mt-4 inline-flex items-center px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Trash2 size={14} className="mr-1.5" />
                        Delete Reminder
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Tasks Section */}
        <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl shadow-sm border border-indigo-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <CheckCircle className="h-5 w-5 text-indigo-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Today's Tasks</h2>
            <button
              onClick={() => setShowNewTaskForm(true)}
              className="ml-auto inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
            >
              <Plus size={16} className="mr-1.5" />
              Add Task
            </button>
          </div>
          
          {showNewTaskForm && (
            <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-indigo-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800">Add New Task</h3>
                <button 
                  onClick={() => setShowNewTaskForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assign To</label>
                  <select
                    value={newTask.to}
                    onChange={(e) => setNewTask({...newTask, to: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="ALL">Everyone</option>
                    <option value="You">Specific Person</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Task Description</label>
                  <textarea
                    value={newTask.value}
                    onChange={(e) => setNewTask({...newTask, value: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows="3"
                    placeholder="Enter task details..."
                  ></textarea>
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      // Add the new task to the data
                      const newTaskObj = {
                        to: newTask.to,
                        assigner: [
                          {
                            by: "you",
                            access: true,
                            context: [
                              {
                                value: newTask.value,
                                status: "PENDING"
                              }
                            ]
                          }
                        ]
                      };
                      
                      setData(prevData => ({
                        ...prevData,
                        today_task: [...prevData.today_task, newTaskObj]
                      }));
                      
                      // Reset form and hide it
                      setNewTask({ to: "ALL", value: "" });
                      setShowNewTaskForm(false);
                      addNotification("New task added successfully", "success");
                    }}
                    disabled={!newTask.value.trim()}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 rounded-lg transition-colors"
                  >
                    Add Task
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {data.today_task.map((task, taskIndex) => (
              <div
                key={taskIndex}
                className="p-5 bg-white rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-indigo-500 text-white p-1.5 rounded-lg">
                    {task.to === "ALL" ? <Users size={16} /> : <User size={16} />}
                  </div>
                  <h3 className="font-medium text-gray-800">
                    To: <span className="text-indigo-600">{task.to}</span>
                  </h3>
                </div>

                {task.assigner.map((assigner, assignerIndex) => (
                  <div key={assignerIndex} className="mt-4 pl-4 border-l-2 border-indigo-100">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      From: <span className="text-indigo-600">{assigner.by}</span>
                    </p>
                    <ul className="space-y-3 mt-3">
                      {assigner.context.map((contextItem, contextIndex) => (
                        <li
                          key={contextIndex}
                          className="text-sm text-gray-600 p-3 rounded-lg bg-gray-50 border border-gray-100"
                        >
                          <div className="flex flex-col gap-3">
                            <div className="font-medium">{contextItem.value}</div>
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              {getStatusBadge(contextItem.status)}

                              <div className="flex gap-2">
                                {assigner.access && contextItem.status === "CONFORMATION" && (
                                  <button
                                    onClick={() => confirmTask(taskIndex, assignerIndex, contextIndex)}
                                    className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                                  >
                                    <CheckCircle size={14} className="mr-1.5" />
                                    Confirm
                                  </button>
                                )}

                                {assigner.access && (
                                  <button
                                    onClick={() => deleteTask(taskIndex, assignerIndex, contextIndex)}
                                    className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                  >
                                    <Trash2 size={14} className="mr-1.5" />
                                    Delete
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkStation

