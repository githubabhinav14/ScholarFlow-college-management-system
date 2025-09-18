"use client"

import { useState } from "react"
import { Calendar, Clock, MessageSquare, User, Users } from "lucide-react"

export default function MyClassRoom() {
  const [activeTab, setActiveTab] = useState("overview")

  // Class stats data
  const classStats = [
    { icon: Users, label: "Students", value: "42", bgColor: "bg-blue-50", iconColor: "text-blue-600" },
    { icon: User, label: "Teachers", value: "8", bgColor: "bg-green-50", iconColor: "text-green-600" },
    { icon: Clock, label: "Attendance", value: "95%", bgColor: "bg-purple-50", iconColor: "text-purple-600" },
    { icon: Calendar, label: "Events", value: "3 Upcoming", bgColor: "bg-amber-50", iconColor: "text-amber-600" },
    { icon: MessageSquare, label: "Messages", value: "3 New", bgColor: "bg-red-50", iconColor: "text-red-600" },
  ]

  // Tabs data
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "teachers", label: "Teachers" },
    { id: "students", label: "Students" },
    { id: "timetable", label: "Timetable" },
    { id: "calendar", label: "Calendar" },
  ]

  // Class representatives data
  const classRepresentatives = [
    {
      name: "Gopi krishna",
      role: "Class Representative",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      name: "Shirisha",
      role: "Girls Representative",
      bgColor: "bg-pink-100",
      textColor: "text-pink-600",
    },
  ]

  // Message board data
  const messages = [
    {
      title: "Project Execution",
      author: "Mrs. Eswari (Class Teacher)",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-100",
    },
    {
      title: "Project Guide Signature",
      author: "Mrs. Eswari (Class Teacher)",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100",
    },
    {
      title: "Permission Group Inactive Today",
      author: "Eswari (Class Teacher)",
      bgColor: "bg-green-50",
      borderColor: "border-green-100",
    },
  ]

  // Teachers data
  const teachers = [
    { name: "Ms.Bhagya Lakshmi", subject: "Devops", email: "bhagya@mrcet.ac.in" },
    { name: "Mr.Shaik Riyaz", subject: "Data Science & Models", email: "shaikriyaz@eswari@mrcet.ac.in" },
    { name: "Mr.B.Ganesh", subject: "Cloud Computing", email: "ganesh@eswari@mrcet.ac.in" },
    { name: "Ms.Archana", subject: "Naural Language Processing", email: "archana@eswari@mrcet.ac.in" },
    { name: "Ms.C.S.N.Durgha", subject: "Blockchain Technology", email: "durga@eswari@mrcet.ac.in" },
    { name: "Mr.Archana", subject: "Computer Science", email: "archana@eswari@mrcet.ac.in" },
    { name: "Mr.Shaik Riyaz", subject: "Data Science Lab", email: "shaikriyaz@mrcet.ac.in" },
    { name: "Ms.D.Akhila", subject: "Data Science Lab", email: "akhila@eswari@mrcet.ac.in" },
    { name: "Ms.D.Sai Eswari", subject: "CLass Incharge", email: "eswari@eswari@mrcet.ac.in" },
  ]

  // Students data
  const students = [
    { name: "Abhinav", roll: "22N31A05E9", attendance: "95%", present: true },
    { name: "Sathwik", roll: "22N31A05G0", attendance: "88%", present: true },
    { name: "Uday", roll: "22N31A05J8", attendance: "92%", present: true },
    { name: "Sumanth", roll: "22N31A05F3", attendance: "97%", present: true },
    { name: "Naveen", roll: "22N31A05E4", attendance: "85%", present: false },
    { name: "Harsha", roll: "22N31A05J9", attendance: "91%", present: false },
    { name: "Vamshi", roll: "22N31A05K8", attendance: "89%", present: true },
    { name: "Vignesh", roll: "22N31A05J2", attendance: "94%", present: true },
    { name: "Manoj Varma", roll: "22N31A05K3", attendance: "90%", present: false },
    { name: "Vaishnav", roll: "22N31A05E1", attendance: "93%", present: true },
  ]

  // Timetable data
  const timetable = [
    {
      time: "9:20 - 10:20",
      mon: "CC",
      tue: "DS LAB",
      wed: "CC",
      thu: "NLP",
      fri: "DEVOPS",
    },
    {
      time: "10:20 - 11:20",
      mon: "BCT",
      tue: "DS LAB",
      wed: "DSM",
      thu: "BCT",
      fri: "CC",
    },
    {
      time: "11:20 - 11:30",
      mon: "Break",
      tue: "Break",
      wed: "Break",
      thu: "Break",
      fri: "Break",
    },
    {
      time: "11:30 - 12:30",
      mon: "DSM",
      tue: "DEVOPS",
      wed: "DEVOPS",
      thu: "CC",
      fri: "BCT",
    },
    {
      time: "12:30 - 1:30",
      mon: "Lunch",
      tue: "Lunch",
      wed: "Lunch",
      thu: "Lunch",
      fri: "Lunch",
    },
    {
      time: "1:30 - 2:30",
      mon: "NLP",
      tue: "BCT",
      wed: "APP DEV II",
      thu: "NLP",
      fri: "DSM",
    },
    {
      time: "2:30 - 3:30",
      mon: "PDS II",
      tue: "TUTORIAL",
      wed: "APP DEV II",
      thu: "CC",
      fri: "DEVOPS",
    },
  ]

  // Calendar events data
  const events = [
    {
      title: "Dussehra Holidays",
      date: "September 29 - October 5, 2025",
      description: "All students Should Attend after Holidays",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      icon: Calendar,
    },
    {
      title: "Mid-II Exams",
      date: "October 9-11, 2025",
      description: "Syllabus available in the study materials section",
      bgColor: "bg-red-100",
      textColor: "text-red-600",
      icon: Calendar,
    },
    {
      title: "Semester Exams",
      date: "August 23, 2025",
      description: "Syllabus available in the study materials section",
      bgColor: "bg-green-100",
      textColor: "text-green-600",
      icon: Calendar,
    },
  ]

  // Holidays data
  const holidays = [
    {
      day: "10",
      title: "National Holiday",
      date: "October 10, 2025",
    },
    {
      day: "27",
      title: "Founder's Day",
      date: "November 27, 2025",
    },
    {
      day: "15",
      title: "Chirmas",
      date: "December 25, 2025",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Class IV C</h2>
        <div className="flex flex-wrap gap-4">
          {classStats.map((stat, index) => (
            <div key={index} className={`flex items-center ${stat.bgColor} rounded-lg p-3`}>
              <stat.icon className={`w-5 h-5 ${stat.iconColor} mr-2`} />
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="font-medium">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === tab.id
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Class Representatives</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {classRepresentatives.map((rep, index) => (
                    <div key={index} className="flex items-center p-4 border rounded-lg">
                      <div
                        className={`w-12 h-12 rounded-full ${rep.bgColor} flex items-center justify-center ${rep.textColor} mr-4`}
                      >
                        <User className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-medium">{rep.name}</p>
                        <p className="text-sm text-gray-500">{rep.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Message Board</h3>
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b">
                    <h4 className="font-medium">Today's Messages</h4>
                  </div>
                  <div className="p-4 space-y-4">
                    {messages.map((message, index) => (
                      <div key={index} className={`p-3 ${message.bgColor} border ${message.borderColor} rounded-lg`}>
                        <p className="text-sm font-medium">{message.title}</p>
                        <p className="text-xs text-gray-500 mt-1">Posted by: {message.author}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "teachers" && (
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Subject Teachers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teachers.map((teacher, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium">{teacher.name}</p>
                        <p className="text-sm text-gray-500">{teacher.subject}</p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      <p>Email: {teacher.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "students" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800">Students List</h3>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">Today's Attendance:</span>
                  <span className="text-sm font-medium text-green-600">38/42 Present</span>
                </div>
              </div>
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Roll No.
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Attendance
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {students.map((student, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                              <User className="h-4 w-4 text-gray-500" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.roll}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.attendance}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              student.present ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {student.present ? "Present" : "Absent"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "timetable" && (
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Weekly Timetable</h3>
              <div className="border rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Monday
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tuesday
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Wednesday
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Thursday
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Friday
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {timetable.map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{row.time}</td>
                        <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">{row.mon}</td>
                        <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">{row.tue}</td>
                        <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">{row.wed}</td>
                        <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">{row.thu}</td>
                        <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">{row.fri}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "calendar" && (
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Academic Calendar</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b">
                    <h4 className="font-medium">Upcoming</h4>
                  </div>
                  <div className="p-4 space-y-3">
                    {events.map((event, index) => (
                      <div key={index} className="flex items-start">
                        <div
                          className={`flex-shrink-0 w-10 h-10 rounded-lg ${event.bgColor} flex items-center justify-center ${event.textColor} mr-3`}
                        >
                          <event.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-gray-500">{event.date}</p>
                          <p className="text-xs text-gray-500 mt-1">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b">
                    <h4 className="font-medium">Holidays</h4>
                  </div>
                  <div className="p-4 space-y-3">
                    {holidays.map((holiday, index) => (
                      <div key={index} className="flex items-center p-2 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-3">
                          <span className="text-sm font-medium">{holiday.day}</span>
                        </div>
                        <div>
                          <p className="font-medium">{holiday.title}</p>
                          <p className="text-xs text-gray-500">{holiday.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

