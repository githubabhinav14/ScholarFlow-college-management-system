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
            name: "Scripting Languages",
            marks: { internal: 40, external: 30, lab: 60 },
          },
          {
            name: "Machine Learning",
            marks: { internal: 30, external: 30, lab: 60 },
          },
          {
            name: "Big Data Analytics",
            marks: { internal: 30, external: 30, lab: 60 },
          },
        ],
        lab_subjects: [
          {
            name: "BDA Lab",
            marks: { lab: 20 },
          },
          {
            name: "ML Lab",
            marks: { lab: 30 },
          },
        ],
        students: [
          {
            name: "Abhinav",
            marks: {
              "Scipting Langiages": { internal: 25, external: 50, lab: 10 },
              "Machine Learning": { internal: 20, external: 60, lab: 10 },
              "Big Data Analytics": { internal: 30, external: 50, lab: 8 },
              "BDA LAB": { lab: 10 },
              "ML Lab": { lab: 10 },
            },
          },
          {
            name: "Sathwik",
            marks: {
              "Scipting Langiages": { internal: 18, external: 45, lab: 15 },
              "Machine Learning": { internal: 22, external: 50, lab: 10 },
              "Big Data Analytics": { internal: 25, external: 45, lab: 10 },
              "BDA LAB": { lab: 15 },
              "ML Lab": { lab: 10 },
            },
          },
          {
            name: "Uday",
            marks: {
              "Scipting Langiages": { internal: 28, external: 60, lab: 4 },
              "Machine Learning": { internal: 25, external: 55, lab: 9 },
              "Big Data Analytics": { internal: 30, external: 60, lab: 5 },
              "BDA LAB": { lab: 4 },
              "ML Lab": { lab: 9 },
            },
          },
          {
            name: "Rahul",
            marks: {
              "Scipting Langiages": { internal: 30, external: 28, lab: 45 },
              "Machine Learning": { internal: 25, external: 27, lab: 50 },
              "Big Data Analytics": { internal: 28, external: 26, lab: 55 },
              "BDA LAB": { lab: 18 },
              "ML Lab": { lab: 25 },
            },
          },
          {
            name: "Priya",
            marks: {
              "Scipting Langiages": { internal: 35, external: 29, lab: 52 },
              "Machine Learning": { internal: 28, external: 28, lab: 54 },
              "Big Data Analytics": { internal: 27, external: 27, lab: 50 },
              "BDA LAB": { lab: 19 },
              "ML Lab": { lab: 27 },
            },
          },
          {
            name: "Amit",
            marks: {
              "Scipting Langiages": { internal: 32, external: 25, lab: 48 },
              "Machine Learning": { internal: 26, external: 26, lab: 52 },
              "Big Data Analytics": { internal: 29, external: 28, lab: 53 },
              "BDA LAB": { lab: 17 },
              "ML Lab": { lab: 26 },
            },
          },
          {
            name: "Sneha",
            marks: {
              "Scipting Langiages": { internal: 38, external: 28, lab: 55 },
              "Machine Learning": { internal: 29, external: 29, lab: 57 },
              "Big Data Analytics": { internal: 28, external: 28, lab: 56 },
              "BDA LAB": { lab: 18 },
              "ML Lab": { lab: 28 },
            },
          },
          {
            name: "Vikram",
            marks: {
              "Scipting Langiages": { internal: 36, external: 27, lab: 53 },
              "Machine Learning": { internal: 27, external: 27, lab: 55 },
              "Big Data Analytics": { internal: 28, external: 28, lab: 54 },
              "BDA LAB": { lab: 17 },
              "ML Lab": { lab: 27 },
            },
          },
          {
            name: "Neha",
            marks: {
              "Scipting Langiages": { internal: 34, external: 26, lab: 51 },
              "Machine Learning": { internal: 26, external: 26, lab: 53 },
              "Big Data Analytics": { internal: 27, external: 27, lab: 52 },
              "BDA LAB": { lab: 16 },
              "ML Lab": { lab: 26 },
            },
          },
          {
            name: "Rajesh",
            marks: {
              "Scipting Langiages": { internal: 33, external: 25, lab: 50 },
              "Machine Learning": { internal: 25, external: 25, lab: 52 },
              "Big Data Analytics": { internal: 26, external: 26, lab: 51 },
              "BDA LAB": { lab: 15 },
              "ML Lab": { lab: 25 },
            },
          },
          {
            name: "Ananya",
            marks: {
              "Scipting Langiages": { internal: 37, external: 28, lab: 54 },
              "Machine Learning": { internal: 28, external: 28, lab: 56 },
              "Big Data Analytics": { internal: 29, external: 29, lab: 55 },
              "BDA LAB": { lab: 18 },
              "ML Lab": { lab: 28 },
            },
          },
          {
            name: "Karthik",
            marks: {
              "Scipting Langiages": { internal: 36, external: 27, lab: 53 },
              "Machine Learning": { internal: 27, external: 27, lab: 55 },
              "Big Data Analytics": { internal: 28, external: 28, lab: 54 },
              "BDA LAB": { lab: 17 },
              "ML Lab": { lab: 27 },
            },
          },
          {
            name: "Divya",
            marks: {
              "Scipting Langiages": { internal: 35, external: 26, lab: 52 },
              "Machine Learning": { internal: 26, external: 26, lab: 54 },
              "Big Data Analytics": { internal: 27, external: 27, lab: 53 },
              "BDA LAB": { lab: 16 },
              "ML Lab": { lab: 26 },
            },
          },
          {
            name: "Arjun",
            marks: {
              "Scipting Langiages": { internal: 34, external: 25, lab: 51 },
              "Machine Learning": { internal: 25, external: 25, lab: 53 },
              "Big Data Analytics": { internal: 26, external: 26, lab: 52 },
              "BDA LAB": { lab: 15 },
              "ML Lab": { lab: 25 },
            },
          },
          {
            name: "Meera",
            marks: {
              "Scipting Langiages": { internal: 33, external: 24, lab: 50 },
              "Machine Learning": { internal: 24, external: 24, lab: 52 },
              "Big Data Analytics": { internal: 25, external: 25, lab: 51 },
              "BDA LAB": { lab: 14 },
              "ML Lab": { lab: 24 },
            },
          },
          {
            name: "Rohan",
            marks: {
              "Scipting Langiages": { internal: 32, external: 23, lab: 49 },
              "Machine Learning": { internal: 23, external: 23, lab: 51 },
              "Big Data Analytics": { internal: 24, external: 24, lab: 50 },
              "BDA LAB": { lab: 13 },
              "ML Lab": { lab: 23 },
            },
          },
          {
            name: "Kavya",
            marks: {
              "Scipting Langiages": { internal: 31, external: 22, lab: 48 },
              "Machine Learning": { internal: 22, external: 22, lab: 50 },
              "Big Data Analytics": { internal: 23, external: 23, lab: 49 },
              "BDA LAB": { lab: 12 },
              "ML Lab": { lab: 22 },
            },
          },
          {
            name: "Aditya",
            marks: {
              "Scipting Langiages": { internal: 30, external: 21, lab: 47 },
              "Machine Learning": { internal: 21, external: 21, lab: 49 },
              "Big Data Analytics": { internal: 22, external: 22, lab: 48 },
              "BDA LAB": { lab: 11 },
              "ML Lab": { lab: 21 },
            },
          },
          {
            name: "Nisha",
            marks: {
              "Scipting Langiages": { internal: 29, external: 20, lab: 46 },
              "Machine Learning": { internal: 20, external: 20, lab: 48 },
              "Big Data Analytics": { internal: 21, external: 21, lab: 47 },
              "BDA LAB": { lab: 10 },
              "ML Lab": { lab: 20 },
            },
          },
          {
            name: "Varun",
            marks: {
              "Scipting Langiages": { internal: 28, external: 19, lab: 45 },
              "Machine Learning": { internal: 19, external: 19, lab: 47 },
              "Big Data Analytics": { internal: 20, external: 20, lab: 46 },
              "BDA LAB": { lab: 9 },
              "ML Lab": { lab: 19 },
            },
          },
          {
            name: "Pooja",
            marks: {
              "Scipting Langiages": { internal: 27, external: 18, lab: 44 },
              "Machine Learning": { internal: 18, external: 18, lab: 46 },
              "Big Data Analytics": { internal: 19, external: 19, lab: 45 },
              "BDA LAB": { lab: 8 },
              "ML Lab": { lab: 18 },
            },
          },
          {
            name: "Ravi",
            marks: {
              "Scipting Langiages": { internal: 26, external: 17, lab: 43 },
              "Machine Learning": { internal: 17, external: 17, lab: 45 },
              "Big Data Analytics": { internal: 18, external: 18, lab: 44 },
              "BDA LAB": { lab: 7 },
              "ML Lab": { lab: 17 },
            },
          },
          {
            name: "Anjali",
            marks: {
              "Scipting Langiages": { internal: 25, external: 16, lab: 42 },
              "Machine Learning": { internal: 16, external: 16, lab: 44 },
              "Big Data Analytics": { internal: 17, external: 17, lab: 43 },
              "BDA LAB": { lab: 6 },
              "ML Lab": { lab: 16 },
            },
          },
          {
            name: "Suresh",
            marks: {
              "Scipting Langiages": { internal: 24, external: 15, lab: 41 },
              "Machine Learning": { internal: 15, external: 15, lab: 43 },
              "Big Data Analytics": { internal: 16, external: 16, lab: 42 },
              "BDA LAB": { lab: 5 },
              "ML Lab": { lab: 15 },
            },
          },
          {
            name: "Deepa",
            marks: {
              "Scipting Langiages": { internal: 23, external: 14, lab: 40 },
              "Machine Learning": { internal: 14, external: 14, lab: 42 },
              "Big Data Analytics": { internal: 15, external: 15, lab: 41 },
              "BDA LAB": { lab: 4 },
              "ML Lab": { lab: 14 },
            },
          },
          {
            name: "Vijay",
            marks: {
              "Scipting Langiages": { internal: 22, external: 13, lab: 39 },
              "Machine Learning": { internal: 13, external: 13, lab: 41 },
              "Big Data Analytics": { internal: 14, external: 14, lab: 40 },
              "BDA LAB": { lab: 3 },
              "ML Lab": { lab: 13 },
            },
          },
          {
            name: "Shreya",
            marks: {
              "Scipting Langiages": { internal: 21, external: 12, lab: 38 },
              "Machine Learning": { internal: 12, external: 12, lab: 40 },
              "Big Data Analytics": { internal: 13, external: 13, lab: 39 },
              "BDA LAB": { lab: 2 },
              "ML Lab": { lab: 12 },
            },
          },
          {
            name: "Nikhil",
            marks: {
              "Scipting Langiages": { internal: 20, external: 11, lab: 37 },
              "Machine Learning": { internal: 11, external: 11, lab: 39 },
              "Big Data Analytics": { internal: 12, external: 12, lab: 38 },
              "BDA LAB": { lab: 1 },
              "ML Lab": { lab: 11 },
            },
          },
          {
            name: "Tanvi",
            marks: {
              "Scipting Langiages": { internal: 19, external: 10, lab: 36 },
              "Machine Learning": { internal: 10, external: 10, lab: 38 },
              "Big Data Analytics": { internal: 11, external: 11, lab: 37 },
              "BDA LAB": { lab: 0 },
              "ML Lab": { lab: 10 },
            },
          },
          {
            name: "Gaurav",
            marks: {
              "Scipting Langiages": { internal: 38, external: 29, lab: 58 },
              "Machine Learning": { internal: 29, external: 29, lab: 59 },
              "Big Data Analytics": { internal: 28, external: 28, lab: 57 },
              "BDA LAB": { lab: 19 },
              "ML Lab": { lab: 29 },
            },
          },
          {
            name: "Swati",
            marks: {
              "Scipting Langiages": { internal: 37, external: 28, lab: 57 },
              "Machine Learning": { internal: 28, external: 28, lab: 58 },
              "Big Data Analytics": { internal: 27, external: 27, lab: 56 },
              "BDA LAB": { lab: 18 },
              "ML Lab": { lab: 28 },
            },
          },
          {
            name: "Prakash",
            marks: {
              "Scipting Langiages": { internal: 36, external: 27, lab: 56 },
              "Machine Learning": { internal: 27, external: 27, lab: 57 },
              "Big Data Analytics": { internal: 26, external: 26, lab: 55 },
              "BDA LAB": { lab: 17 },
              "ML Lab": { lab: 27 },
            },
          },
          {
            name: "Jyoti",
            marks: {
              "Scipting Langiages": { internal: 35, external: 26, lab: 55 },
              "Machine Learning": { internal: 26, external: 26, lab: 56 },
              "Big Data Analytics": { internal: 25, external: 25, lab: 54 },
              "BDA LAB": { lab: 16 },
              "ML Lab": { lab: 26 },
            },
          },
          {
            name: "Sanjay",
            marks: {
              "Scipting Langiages": { internal: 34, external: 25, lab: 54 },
              "Machine Learning": { internal: 25, external: 25, lab: 55 },
              "Big Data Analytics": { internal: 24, external: 24, lab: 53 },
              "BDA LAB": { lab: 15 },
              "ML Lab": { lab: 25 },
            },
          },
          {
            name: "Aarti",
            marks: {
              "Scipting Langiages": { internal: 33, external: 24, lab: 53 },
              "Machine Learning": { internal: 24, external: 24, lab: 54 },
              "Big Data Analytics": { internal: 23, external: 23, lab: 52 },
              "BDA LAB": { lab: 14 },
              "ML Lab": { lab: 24 },
            },
          },
          {
            name: "Manoj",
            marks: {
              "Scipting Langiages": { internal: 32, external: 23, lab: 52 },
              "Machine Learning": { internal: 23, external: 23, lab: 53 },
              "Big Data Analytics": { internal: 22, external: 22, lab: 51 },
              "BDA LAB": { lab: 13 },
              "ML Lab": { lab: 23 },
            },
          },
          {
            name: "Ritu",
            marks: {
              "Scipting Langiages": { internal: 31, external: 22, lab: 51 },
              "Machine Learning": { internal: 22, external: 22, lab: 52 },
              "Big Data Analytics": { internal: 21, external: 21, lab: 50 },
              "BDA LAB": { lab: 12 },
              "ML Lab": { lab: 22 },
            },
          },
          {
            name: "Alok",
            marks: {
              "Scipting Langiages": { internal: 30, external: 21, lab: 50 },
              "Machine Learning": { internal: 21, external: 21, lab: 51 },
              "Big Data Analytics": { internal: 20, external: 20, lab: 49 },
              "BDA LAB": { lab: 11 },
              "ML Lab": { lab: 21 },
            },
          },
          {
            name: "Preeti",
            marks: {
              "Scipting Langiages": { internal: 29, external: 20, lab: 49 },
              "Machine Learning": { internal: 20, external: 20, lab: 50 },
              "Big Data Analytics": { internal: 19, external: 19, lab: 48 },
              "BDA LAB": { lab: 10 },
              "ML Lab": { lab: 20 },
            },
          },
          {
            name: "Vivek",
            marks: {
              "Scipting Langiages": { internal: 28, external: 19, lab: 48 },
              "Machine Learning": { internal: 19, external: 19, lab: 49 },
              "Big Data Analytics": { internal: 18, external: 18, lab: 47 },
              "BDA LAB": { lab: 9 },
              "ML Lab": { lab: 19 },
            },
          },
          {
            name: "Shweta",
            marks: {
              "Scipting Langiages": { internal: 27, external: 18, lab: 47 },
              "Machine Learning": { internal: 18, external: 18, lab: 48 },
              "Big Data Analytics": { internal: 17, external: 17, lab: 46 },
              "BDA LAB": { lab: 8 },
              "ML Lab": { lab: 18 },
            },
          },
          {
            name: "Rajat",
            marks: {
              "Scipting Langiages": { internal: 26, external: 17, lab: 46 },
              "Machine Learning": { internal: 17, external: 17, lab: 47 },
              "Big Data Analytics": { internal: 16, external: 16, lab: 45 },
              "BDA LAB": { lab: 7 },
              "ML Lab": { lab: 17 },
            },
          },
          {
            name: "Neetu",
            marks: {
              "Scipting Langiages": { internal: 25, external: 16, lab: 45 },
              "Machine Learning": { internal: 16, external: 16, lab: 46 },
              "Big Data Analytics": { internal: 15, external: 15, lab: 44 },
              "BDA LAB": { lab: 6 },
              "ML Lab": { lab: 16 },
            },
          },
          {
            name: "Vinay",
            marks: {
              "Scipting Langiages": { internal: 24, external: 15, lab: 44 },
              "Machine Learning": { internal: 15, external: 15, lab: 45 },
              "Big Data Analytics": { internal: 14, external: 14, lab: 43 },
              "BDA LAB": { lab: 5 },
              "ML Lab": { lab: 15 },
            },
          },
          {
            name: "Sonali",
            marks: {
              "Scipting Langiages": { internal: 23, external: 14, lab: 43 },
              "Machine Learning": { internal: 14, external: 14, lab: 44 },
              "Big Data Analytics": { internal: 13, external: 13, lab: 42 },
              "BDA LAB": { lab: 4 },
              "ML Lab": { lab: 14 },
            },
          },
          {
            name: "Dinesh",
            marks: {
              "Scipting Langiages": { internal: 22, external: 13, lab: 42 },
              "Machine Learning": { internal: 13, external: 13, lab: 43 },
              "Big Data Analytics": { internal: 12, external: 12, lab: 41 },
              "BDA LAB": { lab: 3 },
              "ML Lab": { lab: 13 },
            },
          },
          {
            name: "Geeta",
            marks: {
              "Scipting Langiages": { internal: 21, external: 12, lab: 41 },
              "Machine Learning": { internal: 12, external: 12, lab: 42 },
              "Big Data Analytics": { internal: 11, external: 11, lab: 40 },
              "BDA LAB": { lab: 2 },
              "ML Lab": { lab: 12 },
            },
          },
          {
            name: "Mohan",
            marks: {
              "Scipting Langiages": { internal: 20, external: 11, lab: 40 },
              "Machine Learning": { internal: 11, external: 11, lab: 41 },
              "Big Data Analytics": { internal: 10, external: 10, lab: 39 },
              "BDA LAB": { lab: 1 },
              "ML Lab": { lab: 11 },
            },
          },
          {
            name: "Radha",
            marks: {
              "Scipting Langiages": { internal: 19, external: 10, lab: 39 },
              "Machine Learning": { internal: 10, external: 10, lab: 40 },
              "Big Data Analytics": { internal: 9, external: 9, lab: 38 },
              "BDA LAB": { lab: 0 },
              "ML Lab": { lab: 10 },
            },
          },
          {
            name: "Kishore",
            marks: {
              "Scipting Langiages": { internal: 18, external: 9, lab: 38 },
              "Machine Learning": { internal: 9, external: 9, lab: 39 },
              "Big Data Analytics": { internal: 8, external: 8, lab: 37 },
              "BDA LAB": { lab: 0 },
              "ML Lab": { lab: 9 },
            },
          },
          {
            name: "Sunita",
            marks: {
              "Scipting Langiages": { internal: 17, external: 8, lab: 37 },
              "Machine Learning": { internal: 8, external: 8, lab: 38 },
              "Big Data Analytics": { internal: 7, external: 7, lab: 36 },
              "BDA LAB": { lab: 0 },
              "ML Lab": { lab: 8 },
            },
          },
          {
            name: "Ramesh",
            marks: {
              "Scipting Langiages": { internal: 16, external: 7, lab: 36 },
              "Machine Learning": { internal: 7, external: 7, lab: 37 },
              "Big Data Analytics": { internal: 6, external: 6, lab: 35 },
              "BDA LAB": { lab: 0 },
              "ML Lab": { lab: 7 },
            },
          },
          {
            name: "Sarita",
            marks: {
              "Scipting Langiages": { internal: 15, external: 6, lab: 35 },
              "Machine Learning": { internal: 6, external: 6, lab: 36 },
              "Big Data Analytics": { internal: 5, external: 5, lab: 34 },
              "BDA LAB": { lab: 0 },
              "ML Lab": { lab: 6 },
            },
          },
          {
            name: "Kamal",
            marks: {
              "Scipting Langiages": { internal: 14, external: 5, lab: 34 },
              "Machine Learning": { internal: 5, external: 5, lab: 35 },
              "Big Data Analytics": { internal: 4, external: 4, lab: 33 },
              "BDA LAB": { lab: 0 },
              "ML Lab": { lab: 5 },
            },
          },
          {
            name: "Lata",
            marks: {
              "Scipting Langiages": { internal: 13, external: 4, lab: 33 },
              "Machine Learning": { internal: 4, external: 4, lab: 34 },
              "Big Data Analytics": { internal: 3, external: 3, lab: 32 },
              "BDA LAB": { lab: 0 },
              "ML Lab": { lab: 4 },
            },
          },
          {
            name: "Rakesh",
            marks: {
              "Scipting Langiages": { internal: 12, external: 3, lab: 32 },
              "Machine Learning": { internal: 3, external: 3, lab: 33 },
              "Big Data Analytics": { internal: 2, external: 2, lab: 31 },
              "BDA LAB": { lab: 0 },
              "ML Lab": { lab: 3 },
            },
          },
          {
            name: "Suman",
            marks: {
              "Scipting Langiages": { internal: 11, external: 2, lab: 31 },
              "Machine Learning": { internal: 2, external: 2, lab: 32 },
              "Big Data Analytics": { internal: 1, external: 1, lab: 30 },
              "BDA LAB": { lab: 0 },
              "ML Lab": { lab: 2 },
            },
          },
          {
            name: "Rajiv",
            marks: {
              "Scipting Langiages": { internal: 10, external: 1, lab: 30 },
              "Machine Learning": { internal: 1, external: 1, lab: 31 },
              "Big Data Analytics": { internal: 0, external: 0, lab: 29 },
              "BDA LAB": { lab: 0 },
              "ML Lab": { lab: 1 },
            },
          }
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
