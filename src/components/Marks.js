"use client"

import React, { useState, useEffect } from "react"
import { BookOpen, ChevronDown, Loader2, Download } from "lucide-react"
import { generateStudentMarksPDF } from "./services/pdfService"
import { useNotification } from "./contextprovider/NotificationContext"

const StudentTable = () => {
  const { addNotification } = useNotification();
  const [data, setData] = useState(null)
  const [expandedStudent, setExpandedStudent] = useState(null)

  useEffect(() => {
    // Simulate loading data with a slight delay
    const timer = setTimeout(() => {
      const jsonData = {
        subjects: [
          {
            name: "Cloud Computing",
            marks: { internal: 40, external: 30, lab: 60 },
          },
          {
            name: "BlockChain Technology",
            marks: { internal: 30, external: 30, lab: 60 },
          },
          {
            name: "Devops",
            marks: { internal: 30, external: 30, lab: 60 },
          },
        ],
        lab_subjects: [
          {
            name: "DSM LAB",
            marks: { lab: 20 },
          },
          {
            name: "Mini Project",
            marks: { lab: 30 },
          },
        ],
        students: [
          {
            name: "Abhinav",
            marks: {
              "Cloud Computing": { internal: 25, external: 50, lab: 10 },
              "BlockChain Technology": { internal: 20, external: 60, lab: 10 },
              "Devops": { internal: 30, external: 50, lab: 8 },
              "DSM LAB": { lab: 10 },
              "Mini Project": { lab: 0 },
            },
          },
          {
            name: "Sathwik",
            marks: {
              "Cloud Computing": { internal: 18, external: 45, lab: 15 },
              "BlockChain Technology": { internal: 0, external: 0, lab: 0 },
              "Devops": { internal: 0, external: 0, lab: 0 },
              "DSM LAB": { lab: 0 },
              "Mini Project": { lab: 0 },
            },
          },
          {
            name: "Uday",
            marks: {
              "Cloud Computing": { internal: 28, external: 60, lab: 4 },
              "BlockChain Technology": { internal: 0, external: 0, lab: 0 },
              "Devops": { internal: 0, external: 0, lab: 0 },
              "DSM LAB": { lab: 0 },
              "Mini Project": { lab: 0 },
            },
          },
          {
            name: "Rahul",
            marks: {
              "Cloud Computing": { internal: 30, external: 28, lab: 45 },
              "BlockChain Technology": { internal: 0, external: 0, lab: 0 },
              "Devops": { internal: 0, external: 0, lab: 0 },
              "DSM LAB": { lab: 0 },
              "Mini Project": { lab: 0 },
            },
          },
          {
            name: "Priya",
            marks: {
              "Cloud Computing": { internal: 35, external: 29, lab: 52 },
              "BlockChain Technology": { internal: 0, external: 0, lab: 0 },
              "Devops": { internal: 0, external: 0, lab: 0 },
              "DSM LAB": { lab: 0 },
              "Mini Project": { lab: 0 },
            },
          },
          {
            name: "Amit",
            marks: {
              "Cloud Computing": { internal: 32, external: 25, lab: 48 },
              "BlockChain Technology": { internal: 0, external: 0, lab: 0 },
              "Devops": { internal: 0, external: 0, lab: 0 },
              "DSM LAB": { lab: 0 },
              "Mini Project": { lab: 0 },
            },
          },
          {
            name: "Sneha",
            marks: {
              "Cloud Computing": { internal: 38, external: 28, lab: 55 },
              "BlockChain Technology": { internal: 0, external: 0, lab: 0 },
              "Devops": { internal: 0, external: 0, lab: 0 },
              "DSM LAB": { lab: 0 },
              "Mini Project": { lab: 0 },
            },
          },
          {
            name: "Vikram",
            marks: {
              "Cloud Computing": { internal: 15, external: 12, lab: 20 },
              "BlockChain Technology": { internal: 10, external: 8, lab: 15 },
              "Devops": { internal: 0, external: 0, lab: 0 },
              "DSM LAB": { lab: 5 },
              "Mini Project": { lab: 10 },
            },
          },
          {
            name: "Neha",
            marks: {
              "Cloud Computing": { internal: 20, external: 15, lab: 25 },
              "BlockChain Technology": { internal: 12, external: 10, lab: 18 },
              "Devops": { internal: 0, external: 0, lab: 0 },
              "DSM LAB": { lab: 8 },
              "Mini Project": { lab: 0 },
            },
          },
          {
            name: "Rajesh",
            marks: {
              "Cloud Computing": { internal: 0, external: 0, lab: 0 },
              "BlockChain Technology": { internal: 15, external: 13, lab: 22 },
              "Devops": { internal: 10, external: 9, lab: 15 },
              "DSM LAB": { lab: 0 },
              "Mini Project": { lab: 5 },
            },
          },
          {
            name: "Ananya",
            marks: {
              "Cloud Computing": { internal: 18, external: 14, lab: 30 },
              "BlockChain Technology": { internal: 0, external: 0, lab: 0 },
              "Devops": { internal: 12, external: 11, lab: 20 },
              "DSM LAB": { lab: 0 },
              "Mini Project": { lab: 8 },
            },
          },
        ],
      }

      setData(jsonData)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  // Calculate percentage for color coding
  const getScoreColor = (score, max) => {
    const percentage = (score / max) * 100
    if (percentage >= 80) return "text-emerald-600 font-medium"
    if (percentage >= 60) return "text-blue-600"
    if (percentage >= 40) return "text-amber-600"
    return "text-red-600"
  }

  // Calculate total score for a student
  const calculateTotal = (student) => {
    if (!data) return { score: 0, max: 0 }

    let totalScore = 0
    let totalMax = 0

    // Add subject marks
    data.subjects.forEach((subject) => {
      const studentMarks = student.marks[subject.name] || {}
      totalScore += (studentMarks.internal || 0) + (studentMarks.external || 0) + (studentMarks.lab || 0)
      totalMax += subject.marks.internal + subject.marks.external + subject.marks.lab
    })

    // Add lab subject marks
    data.lab_subjects.forEach((labSubject) => {
      const studentMarks = student.marks[labSubject.name] || {}
      totalScore += studentMarks.lab || 0
      totalMax += labSubject.marks.lab
    })

    return { score: totalScore, max: totalMax }
  }

  const toggleStudentExpand = (studentName) => {
    if (expandedStudent === studentName) {
      setExpandedStudent(null)
    } else {
      setExpandedStudent(studentName)
    }
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-sm">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
          <p className="text-gray-500 font-medium">Loading student data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-500" />
          <h2 className="text-lg font-medium text-gray-800">Student Performance</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">{data.students.length} Students</div>
          {expandedStudent && (
            <button
              onClick={() => {
                const student = data.students.find(s => s.name === expandedStudent);
                if (student) {
                  generateStudentMarksPDF(student, student.name);
                  addNotification(`${student.name}'s report has been downloaded successfully`, "success");
                }
              }}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Download size={14} className="mr-1.5" />
              Download Report
            </button>
          )}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100">
                Student
              </th>
              {data.subjects.map((subject) => (
                <th
                  key={subject.name}
                  colSpan={3}
                  className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center border-b border-gray-100"
                >
                  {subject.name}
                </th>
              ))}
              {data.lab_subjects.map((labSubject) => (
                <th
                  key={labSubject.name}
                  className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center border-b border-gray-100"
                >
                  {labSubject.name}
                </th>
              ))}
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center border-b border-gray-100">
                Total
              </th>
            </tr>
            <tr className="bg-gray-50 text-left">
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100"></th>
              {data.subjects.map((subject) => (
                <React.Fragment key={`${subject.name}-headers`}>
                  <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider text-center border-b border-gray-100">
                    Int <span className="text-gray-400">({subject.marks.internal})</span>
                  </th>
                  <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider text-center border-b border-gray-100">
                    Ext <span className="text-gray-400">({subject.marks.external})</span>
                  </th>
                  <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider text-center border-b border-gray-100">
                    Lab <span className="text-gray-400">({subject.marks.lab})</span>
                  </th>
                </React.Fragment>
              ))}
              {data.lab_subjects.map((labSubject) => (
                <th
                  key={`${labSubject.name}-header`}
                  className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider text-center border-b border-gray-100"
                >
                  Lab <span className="text-gray-400">({labSubject.marks.lab})</span>
                </th>
              ))}
              <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider text-center border-b border-gray-100">
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            {data.students.map((student, index) => {
              const { score, max } = calculateTotal(student)
              const percentage = ((score / max) * 100).toFixed(1)

              return (
                <tr
                  key={student.name}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition-colors`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{student.name}</td>

                  {data.subjects.map((subject) => {
                    const marks = student.marks[subject.name] || {}
                    return (
                      <React.Fragment key={`${student.name}-${subject.name}`}>
                        <td
                          className={`px-4 py-4 whitespace-nowrap text-sm text-center ${getScoreColor(marks.internal || 0, subject.marks.internal)}`}
                        >
                          {marks.internal || 0}
                        </td>
                        <td
                          className={`px-4 py-4 whitespace-nowrap text-sm text-center ${getScoreColor(marks.external || 0, subject.marks.external)}`}
                        >
                          {marks.external || 0}
                        </td>
                        <td
                          className={`px-4 py-4 whitespace-nowrap text-sm text-center ${getScoreColor(marks.lab || 0, subject.marks.lab)}`}
                        >
                          {marks.lab || 0}
                        </td>
                      </React.Fragment>
                    )
                  })}

                  {data.lab_subjects.map((labSubject) => {
                    const marks = student.marks[labSubject.name] || {}
                    return (
                      <td
                        key={`${student.name}-${labSubject.name}`}
                        className={`px-4 py-4 whitespace-nowrap text-sm text-center ${getScoreColor(marks.lab || 0, labSubject.marks.lab)}`}
                      >
                        {marks.lab || 0}
                      </td>
                    )
                  })}

                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-center">
                    <div className={`${getScoreColor(score, max)}`}>
                      {score}/{max} <span className="text-gray-500">({percentage}%)</span>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        {data.students.map((student, index) => {
          const { score, max } = calculateTotal(student)
          const percentage = ((score / max) * 100).toFixed(1)
          const isExpanded = expandedStudent === student.name

          return (
            <div
              key={student.name}
              className={`border-b border-gray-100 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
            >
              <div
                className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-blue-50"
                onClick={() => toggleStudentExpand(student.name)}
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{student.name}</h3>
                    <div className={`text-sm ${getScoreColor(score, max)}`}>
                      {percentage}%{" "}
                      <span className="text-gray-500 text-xs">
                        ({score}/{max})
                      </span>
                    </div>
                  </div>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-gray-400 transition-transform ${isExpanded ? "transform rotate-180" : ""}`}
                />
              </div>

              {isExpanded && (
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Subjects</h4>
                      {data.subjects.map((subject) => {
                        const marks = student.marks[subject.name] || {}
                        return (
                          <div key={subject.name} className="mb-3 bg-white p-3 rounded-lg shadow-sm">
                            <h5 className="font-medium text-gray-700 mb-2">{subject.name}</h5>
                            <div className="grid grid-cols-3 gap-2 text-sm">
                              <div>
                                <div className="text-gray-500 text-xs">Internal</div>
                                <div className={getScoreColor(marks.internal || 0, subject.marks.internal)}>
                                  {marks.internal || 0}/{subject.marks.internal}
                                </div>
                              </div>
                              <div>
                                <div className="text-gray-500 text-xs">External</div>
                                <div className={getScoreColor(marks.external || 0, subject.marks.external)}>
                                  {marks.external || 0}/{subject.marks.external}
                                </div>
                              </div>
                              <div>
                                <div className="text-gray-500 text-xs">Lab</div>
                                <div className={getScoreColor(marks.lab || 0, subject.marks.lab)}>
                                  {marks.lab || 0}/{subject.marks.lab}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    <div>
                      <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Lab Subjects</h4>
                      {data.lab_subjects.map((labSubject) => {
                        const marks = student.marks[labSubject.name] || {}
                        return (
                          <div key={labSubject.name} className="mb-3 bg-white p-3 rounded-lg shadow-sm">
                            <h5 className="font-medium text-gray-700 mb-2">{labSubject.name}</h5>
                            <div className="text-sm">
                              <div className="text-gray-500 text-xs">Lab</div>
                              <div className={getScoreColor(marks.lab || 0, labSubject.marks.lab)}>
                                {marks.lab || 0}/{labSubject.marks.lab}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StudentTable