"use client"

import { useState } from "react"
import { ArrowLeft, Download, FileText, Plus, Search, Upload, User, ExternalLink, X } from "lucide-react"

export default function Buckets() {
  const [activeTab, setActiveTab] = useState("my-buckets")
  const [selectedBucket, setSelectedBucket] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [uploadingFiles, setUploadingFiles] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [showSubmissionDetails, setShowSubmissionDetails] = useState(false)
  const [selectedSubmission, setSelectedSubmission] = useState(null)

  // buckets
  const buckets = [
    {
      id: 1,
      title: "MINI Project",
      description: "Submit your project reports with Documentation and PPT",
      deadline: "September 18, 2025",
      progress: 58,
      submissions: 12,
      total: 42,
    },
    {
      id: 2,
      title: "NEOPAT",
      description: "Status of Student",
      deadline: "Seotember 18, 2025",
      progress: 18,
      submissions: 38,
      total: 42,
    },
    {
      id: 3,
      title: "1-day Certification Drive ( Student Enablement Program )",
      description: "NASCOOM",
      deadline: "September 25, 2025",
      progress: 45,
      submissions: 19,
      total: 42,
    },
  ]

  // student submission data with direct URLs
  const studentSubmissions = [
    {
      id: 1,
      bucketId: 1,
      studentName: "Abhinav",
      rollNo: "101",
      submissionDate: "2023-03-10",
      status: "Submitted",
      grade: "A",
      files: [
        {
          name: "project_report.pdf",
          url: "https://example-bucket.s3.amazonaws.com/submissions/101/project_report.pdf",
          size: "2.4 MB",
        },
        {
          name: "Ouput Screens.jpg",
          url: "https://example-bucket.s3.amazonaws.com/submissions/101/experiment_photo.jpg",
          size: "2.2 MB",
        },
      ],
      textResponses: {
        "Project Title": "Nexus Project",
        Hypothesis: "Where Education Meets Innovation",
        Conclusion:
          "Uses For College Managment",
      },
    },
    {
      id: 2,
      bucketId: 1,
      studentName: "Sathwik",
      rollNo: "102",
      submissionDate: "2025-04-09",
      status: "Submitted",
      grade: "B+",
      files: [
        {
          name: "project_report.pdf",
          url: "https://example-bucket.s3.amazonaws.com/submissions/102/science_project.pdf",
          size: "3.1 MB",
        },
        {
          name: "data_chart.png",
          url: "https://example-bucket.s3.amazonaws.com/submissions/102/data_chart.png",
          size: "8.8 MB",
        },
      ],
      textResponses: {
        "Project Title": "Retain Edge",
        Hypothesis: "Calculate the Price",
        Conclusion: "Want to Buy any second hand cars use retain edge",
      },
    },
    {
      id: 3,
      bucketId: 1,
      studentName: "Uday",
      rollNo: "103",
      submissionDate: "2025-04-09",
      status: "Submitted",
      grade: "A-",
      files: [
        {
          name: "research_paper.pdf",
          url: "https://example-bucket.s3.amazonaws.com/submissions/103/research_paper.pdf",
          size: "4.2 MB",
        },
        {
          name: "experiment_setup.jpg",
          url: "https://example-bucket.s3.amazonaws.com/submissions/103/experiment_setup.jpg",
          size: "2.5 MB",
        },
      ],
      textResponses: {
        "Project Title": "Water Filtration Methods",
        Hypothesis: "Activated charcoal will filter water more effectively than sand.",
        Conclusion: "Activated charcoal removed 95% of impurities compared to 70% for sand filtration.",
      },
    },
    {
      id: 4,
      bucketId: 1,
      studentName: "Sumanth",
      rollNo: "104",
      submissionDate: "2023-03-14",
      status: "Submitted",
      grade: "A+",
      files: [
        {
          name: "science_report.pdf",
          url: "https://example-bucket.s3.amazonaws.com/submissions/104/science_report.pdf",
          size: "3.7 MB",
        },
        {
          name: "results.jpg",
          url: "https://example-bucket.s3.amazonaws.com/submissions/104/results.jpg",
          size: "1.8 MB",
        },
      ],
      textResponses: {
        "Project Title": "Bacterial Growth in Different Environments",
        Hypothesis: "Bacteria grow faster in warm, moist environments.",
        Conclusion: "Bacteria colonies in warm, moist environments grew 3x faster than in cool, dry environments.",
      },
    },
    {
      id: 5,
      bucketId: 1,
      studentName: "Manish",
      rollNo: "105",
      submissionDate: "",
      status: "Not Submitted",
      grade: "",
      files: [],
      textResponses: {},
    },


    // More students for Science Project
    {
      id: 6,
      bucketId: 1,
      studentName: "Naveen",
      rollNo: "106",
      submissionDate: "2023-03-13",
      status: "Submitted",
      grade: "B",
      files: [
        {
          name: "project.pdf",
          url: "https://example-bucket.s3.amazonaws.com/submissions/106/project.pdf",
          size: "2.9 MB",
        },
      ],
      textResponses: {
        "Project Title": "Sound Wave Propagation",
        Hypothesis: "Sound travels faster through solids than liquids or gases.",
        Conclusion: "Sound traveled 4x faster through metal than through air in our experiment.",
      },
    },
    {
      id: 7,
      bucketId: 1,
      studentName: "Manoj Varma",
      rollNo: "107",
      submissionDate: "2023-03-09",
      status: "Submitted",
      grade: "B-",
      files: [
        {
          name: "science_project.pdf",
          url: "https://example-bucket.s3.amazonaws.com/submissions/107/science_project.pdf",
          size: "3.3 MB",
        },
        {
          name: "data.xlsx",
          url: "https://example-bucket.s3.amazonaws.com/submissions/107/data.xlsx",
          size: "1.5 MB",
        },
      ],
      textResponses: {
        "Project Title": "Plant Growth with Different Light Colors",
        Hypothesis: "Plants grow better under full-spectrum light than single-color light.",
        Conclusion: "Plants under full-spectrum light grew 25% taller than those under red or blue light alone.",
      },
    },
    {
      id: 8,
      bucketId: 1,
      studentName: "Harsha",
      rollNo: "108",
      submissionDate: "2025-04-14",
      status: "Submitted",
      grade: "A",
      files: [
        {
          name: "report.pdf",
          url: "https://example-bucket.s3.amazonaws.com/submissions/108/report.pdf",
          size: "4.1 MB",
        },
        {
          name: "photos.zip",
          url: "https://example-bucket.s3.amazonaws.com/submissions/108/photos.zip",
          size: "8.7 MB",
        },
      ],
      textResponses: {
        "Project Title": "Acid Rain Effects on Plant Life",
        Hypothesis: "Increased acidity in water will negatively impact plant growth.",
        Conclusion: "Plants watered with pH 4 solution showed 40% less growth than control plants.",
      },
    },
    {
      id: 9,
      bucketId: 1,
      studentName: "Rajesh",
      rollNo: "109",
      submissionDate: "",
      status: "Not Submitted",
      grade: "",
      files: [],
      textResponses: {},
    },
    {
      id: 10,
      bucketId: 1,
      studentName: "Vignesh",
      rollNo: "110",
      submissionDate: "2023-03-11",
      status: "Submitted",
      grade: "A-",
      files: [
        {
          name: "science_project.pdf",
          url: "https://example-bucket.s3.amazonaws.com/submissions/110/science_project.pdf",
          size: "3.5 MB",
        },
      ],
      textResponses: {
        "Project Title": "Magnetism and Electricity",
        "Hypothesis": "Moving magnets can generate electrical current.",
        "Conclusion": "Our hand-cranked magnet generator produced enough electricity to light an LED bulb.",
      },
    },
    // Math Problem Set submissions
    {
      id: 11,
      bucketId: 2,
      studentName: "Bharath",
      rollNo: "101",
      submissionDate: "2023-03-08",
      status: "Submitted",
      grade: "A",
      files: [
        {
          name: "Project.pdf",
          url: "https://example-bucket.s3.amazonaws.com/submissions/101/math_solutions.pdf",
          size: "1.8 MB",
        },
      ],
      textResponses: {
        "Completion Status": "All problems completed",
        "Difficulty Level": "Medium",
      },
    },
    // Art Portfolio submissions
    {
      id: 21,
      bucketId: 3,
      studentName: "Vignesh LE",
      rollNo: "101",
      submissionDate: "2025-04-09",
      status: "Submitted",
      grade: "A+",
      files: [
        {
          name: "portrait.jpg",
          url: "https://example-bucket.s3.amazonaws.com/submissions/101/portrait.jpg",
          size: "3.2 MB",
        },
        {
          name: "landscape.jpg",
          url: "https://example-bucket.s3.amazonaws.com/submissions/101/landscape.jpg",
          size: "4.5 MB",
        },
        {
          name: "abstract.jpg",
          url: "https://example-bucket.s3.amazonaws.com/submissions/101/abstract.jpg",
          size: "2.8 MB",
        },
      ],
      textResponses: {
        "Artist Statement": "My work explores the relationship between light and emotion.",
        "Techniques Used": "Oil painting, watercolor, charcoal",
      },
    },
  ]

  // Helper functions
  const getBucketSubmissions = (bucketId) => {
    return studentSubmissions.filter((submission) => submission.bucketId === bucketId)
  }

  const getSubmittedCount = (bucketId) => {
    return studentSubmissions.filter(
      (submission) => submission.bucketId === bucketId && submission.status === "Submitted",
    ).length
  }

  const getPendingCount = (bucketId) => {
    return studentSubmissions.filter(
      (submission) => submission.bucketId === bucketId && submission.status === "Not Submitted",
    ).length
  }

  // Filtered submissions based on search
  const filteredSubmissions = selectedBucket
    ? getBucketSubmissions(selectedBucket).filter(
        (submission) =>
          submission.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          submission.rollNo.includes(searchTerm),
      )
    : []

  // Get selected bucket data
  const selectedBucketData = buckets.find((bucket) => bucket.id === selectedBucket)

  // Event handlers
  const handleViewDetails = (bucketId) => {
    setSelectedBucket(bucketId)
  }

  const handleBackToBuckets = () => {
    setSelectedBucket(null)
    setSearchTerm("")
  }

  // File handling functions
  const handleFileChange = (e) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files))
    }
  }

  const handleFileUpload = async () => {
    if (selectedFiles.length === 0) return

    setUploadingFiles(true)

    try {
      // Simulate file upload
      setTimeout(() => {
        setSelectedFiles([])
        setUploadingFiles(false)
        alert("Files uploaded successfully!")
      }, 1500)
    } catch (error) {
      console.error("Error uploading file:", error)
      alert("Error uploading files. Please try again.")
      setUploadingFiles(false)
    }
  }

  // Function to download a file
  const handleDownloadFile = (fileUrl, fileName) => {
    try {
      // Open the file URL with download attribute
      window.open(fileUrl, "_blank")
    } catch (error) {
      console.error("Error downloading file:", error)
      alert("Error downloading file. Please try again.")
    }
  }

  // Function to download all files from a submission
  const handleDownloadAllFiles = (submission) => {
    if (!submission.files || submission.files.length === 0) {
      alert("No files to download")
      return
    }

    try {
      // Open each file in a new tab
      submission.files.forEach((file) => {
        window.open(file.url, "_blank")
      })
    } catch (error) {
      console.error("Error downloading files:", error)
      alert("Error downloading files. Please try again.")
    }
  }

  // Function to view submission details
  const handleViewSubmissionDetails = (submission) => {
    setSelectedSubmission(submission)
    setShowSubmissionDetails(true)
  }

  // Function to close submission details
  const handleCloseSubmissionDetails = () => {
    setShowSubmissionDetails(false)
    setSelectedSubmission(null)
  }

  // Render bucket list view
  const renderBucketList = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* navigation of the section */}
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab("my-buckets")}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === "my-buckets"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              My Buckets
            </button>
            <button
              onClick={() => setActiveTab("create-bucket")}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === "create-bucket"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Create New Bucket
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* list of buckets */}
          {activeTab === "my-buckets" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                {/* title */}
                <h3 className="text-lg font-medium text-gray-800">Active Buckets</h3>

                {/* new bucket redirect */}
                <button
                  onClick={() => setActiveTab("create-bucket")}
                  className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  <Plus className="w-4 h-4 mr-1" /> Create New
                </button>
              </div>

              {/* rendering list */}
              <div className="space-y-4">
                {buckets.map((bucket) => (
                  <div key={bucket.id} className="border rounded-lg overflow-hidden">
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{bucket.title}</h4>
                          <p className="text-sm text-gray-500 mt-1">{bucket.description}</p>
                        </div>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                          Due: {bucket.deadline}
                        </span>
                      </div>

                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-500">Progress</span>
                          <span className="font-medium">{bucket.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${bucket.progress}%` }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>{bucket.submissions} submissions</span>
                          <span>{bucket.total} total</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="w-4 h-4 mr-1" />
                        <span>Created by: Mrs. Parker</span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          className="px-3 py-1 text-xs font-medium rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                          onClick={() => handleViewDetails(bucket.id)}
                        >
                          View Details
                        </button>
                        <button className="px-3 py-1 text-xs font-medium rounded-md bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* new bucket form  */}
          {activeTab === "create-bucket" && (
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Create New Bucket</h3>

              <form className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Bucket Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter a title for your bucket"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe what students need to submit"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
                      Deadline
                    </label>
                    <input
                      type="date"
                      id="deadline"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="recipients" className="block text-sm font-medium text-gray-700 mb-1">
                      Recipients
                    </label>
                    <select
                      id="recipients"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Students</option>
                      <option value="group">Select Group</option>
                      <option value="individual">Select Individual Students</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Form Fields</label>
                  <div className="space-y-4">
                    {/* Text Field */}
                    <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium">Text Field</span>
                        <div className="flex space-x-2">
                          <button type="button" className="text-gray-500 hover:text-gray-700">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label htmlFor="field-label" className="block text-sm text-gray-600 mb-1">
                            Field Label
                          </label>
                          <input
                            type="text"
                            id="field-label"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., Project Title"
                          />
                        </div>
                        <div>
                          <label htmlFor="field-type" className="block text-sm text-gray-600 mb-1">
                            Field Type
                          </label>
                          <select
                            id="field-type"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="short-text">Short Text</option>
                            <option value="long-text">Long Text (Paragraph)</option>
                            <option value="number">Number</option>
                            <option value="date">Date</option>
                          </select>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="required-field" className="mr-2" />
                          <label htmlFor="required-field" className="text-sm text-gray-600">
                            Required field
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Another Text Field */}
                    <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium">Text Field</span>
                        <div className="flex space-x-2">
                          <button type="button" className="text-gray-500 hover:text-gray-700">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label htmlFor="field-label-2" className="block text-sm text-gray-600 mb-1">
                            Field Label
                          </label>
                          <input
                            type="text"
                            id="field-label-2"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., Hypothesis"
                            value="Hypothesis"
                          />
                        </div>
                        <div>
                          <label htmlFor="field-type-2" className="block text-sm text-gray-600 mb-1">
                            Field Type
                          </label>
                          <select
                            id="field-type-2"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="short-text">Short Text</option>
                            <option value="long-text" selected>
                              Long Text (Paragraph)
                            </option>
                            <option value="number">Number</option>
                            <option value="date">Date</option>
                          </select>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="required-field-2" className="mr-2" checked />
                          <label htmlFor="required-field-2" className="text-sm text-gray-600">
                            Required field
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* File Upload Field */}
                    <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium">File Upload</span>
                        <div className="flex space-x-2">
                          <button type="button" className="text-gray-500 hover:text-gray-700">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label htmlFor="file-field-label" className="block text-sm text-gray-600 mb-1">
                            Field Label
                          </label>
                          <input
                            type="text"
                            id="file-field-label"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., Project Report"
                            value="Project Report"
                          />
                        </div>
                        <div>
                          <label htmlFor="file-types" className="block text-sm text-gray-600 mb-1">
                            Allowed File Types
                          </label>
                          <select
                            id="file-types"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            multiple
                          >
                            <option value="pdf" selected>
                              PDF
                            </option>
                            <option value="doc" selected>
                              DOC/DOCX
                            </option>
                            <option value="images" selected>
                              Images (JPG, PNG)
                            </option>
                            <option value="zip">ZIP Archives</option>
                          </select>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="required-file" className="mr-2" checked />
                          <label htmlFor="required-file" className="text-sm text-gray-600">
                            Required field
                          </label>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="file-upload"
                            className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50"
                          >
                            <div className="flex flex-col items-center justify-center pt-3 pb-3">
                              <Upload className="w-6 h-6 text-gray-400 mb-1" />
                              <p className="text-sm text-gray-500">
                                <span className="font-medium">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">PDF, DOC, JPG, PNG (MAX. 10MB)</p>
                            </div>
                            <input
                              id="file-upload"
                              type="file"
                              className="hidden"
                              onChange={handleFileChange}
                              multiple
                            />
                          </label>
                        </div>
                        {selectedFiles.length > 0 && (
                          <div className="mt-3">
                            <p className="text-sm text-gray-600 mb-2">{selectedFiles.length} file(s) selected</p>
                            <button
                              type="button"
                              onClick={handleFileUpload}
                              disabled={uploadingFiles}
                              className="px-3 py-1 text-xs font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300"
                            >
                              {uploadingFiles ? "Uploading..." : "Upload Files"}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Another Field
                    </button>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab("my-buckets")}
                    className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Create Bucket
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Render bucket details view
  const renderBucketDetails = () => {
    if (!selectedBucket || !selectedBucketData) return null

    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 p-4 flex justify-between items-center">
          <div className="flex items-center">
            <button onClick={handleBackToBuckets} className="mr-3 p-1.5 rounded-full hover:bg-gray-100">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h3 className="text-lg font-medium text-gray-800">{selectedBucketData.title}</h3>
              <p className="text-sm text-gray-500">{selectedBucketData.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Due: {selectedBucketData.deadline}</span>
            <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-green-50 border border-green-200 text-green-700 hover:bg-green-100 flex items-center">
              <Download className="w-3.5 h-3.5 mr-1" />
              Export Data
            </button>
          </div>
        </div>

        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center bg-white rounded-lg p-3 border border-gray-200">
              <div>
                <p className="text-sm text-gray-500">Total Students</p>
                <p className="font-medium">{selectedBucketData.total}</p>
              </div>
            </div>
            <div className="flex items-center bg-white rounded-lg p-3 border border-gray-200">
              <div>
                <p className="text-sm text-gray-500">Submitted</p>
                <p className="font-medium text-green-600">{getSubmittedCount(selectedBucket)}</p>
              </div>
            </div>
            <div className="flex items-center bg-white rounded-lg p-3 border border-gray-200">
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="font-medium text-red-600">{getPendingCount(selectedBucket)}</p>
              </div>
            </div>
            <div className="flex items-center bg-white rounded-lg p-3 border border-gray-200">
              <div>
                <p className="text-sm text-gray-500">Completion</p>
                <p className="font-medium">{selectedBucketData.progress}%</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-500" />
            </div>
            <input
              type="text"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              placeholder="Search by student name or roll number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Student
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Roll No.
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Submission Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Files
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Text Responses
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Grade
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubmissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <User className="h-4 w-4 text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{submission.studentName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{submission.rollNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {submission.submissionDate || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        submission.status === "Submitted" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {submission.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {submission.files.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {submission.files.map((file, index) => (
                          <button
                            key={index}
                            onClick={() => handleDownloadFile(file.url, file.name)}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100"
                          >
                            <FileText className="w-3 h-3 mr-1" />
                            {file.name.length > 15 ? file.name.substring(0, 12) + "..." : file.name}
                          </button>
                        ))}
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {Object.keys(submission.textResponses).length > 0 ? (
                      <div className="max-w-xs">
                        {Object.entries(submission.textResponses)
                          .slice(0, 2)
                          .map(([key, value], index) => (
                            <div key={index} className="mb-1">
                              <span className="font-medium">{key}:</span>{" "}
                              {value.length > 30 ? value.substring(0, 27) + "..." : value}
                            </div>
                          ))}
                        {Object.keys(submission.textResponses).length > 2 && (
                          <button
                            onClick={() => handleViewSubmissionDetails(submission)}
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            + {Object.keys(submission.textResponses).length - 2} more fields
                          </button>
                        )}
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{submission.grade || "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {submission.status === "Submitted" ? (
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleDownloadAllFiles(submission)}
                          className="text-blue-600 hover:text-blue-900 flex items-center"
                        >
                          <Download className="w-3.5 h-3.5 mr-1" />
                          Download
                        </button>
                        <button
                          onClick={() => handleViewSubmissionDetails(submission)}
                          className="text-green-600 hover:text-green-900"
                        >
                          View Details
                        </button>
                      </div>
                    ) : (
                      <button className="text-gray-400 cursor-not-allowed">No Submission</button>
                    )}
                  </td>
                </tr>
              ))}

              {filteredSubmissions.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-10 text-center text-sm text-gray-500">
                    {searchTerm ? "No students match your search criteria." : "No submissions found for this bucket."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredSubmissions.length > 0 && (
          <div className="px-6 py-3 bg-gray-50 text-right text-xs text-gray-500">
            Showing {filteredSubmissions.length} of {getBucketSubmissions(selectedBucket).length} submissions
          </div>
        )}
      </div>
    )
  }

  // Render submission details modal
  const renderSubmissionDetails = () => {
    if (!showSubmissionDetails || !selectedSubmission) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="border-b border-gray-200 p-4 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-800">Submission Details: {selectedSubmission.studentName}</h3>
            <button onClick={handleCloseSubmissionDetails} className="text-gray-500 hover:text-gray-700 p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Student</p>
                <p className="mt-1">{selectedSubmission.studentName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Roll Number</p>
                <p className="mt-1">{selectedSubmission.rollNo}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Submission Date</p>
                <p className="mt-1">{selectedSubmission.submissionDate || "Not submitted"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <p className="mt-1">
                  <span
                    className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      selectedSubmission.status === "Submitted"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedSubmission.status}
                  </span>
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Files</h4>
              {selectedSubmission.files.length > 0 ? (
                <div className="space-y-2">
                  {selectedSubmission.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-blue-500 mr-2" />
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-gray-500">{file.size}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => window.open(file.url, "_blank")}
                          className="p-1.5 text-gray-500 hover:text-gray-700"
                          title="View file"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDownloadFile(file.url, file.name)}
                          className="p-1.5 text-blue-500 hover:text-blue-700"
                          title="Download file"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => handleDownloadAllFiles(selectedSubmission)}
                    className="mt-2 inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100"
                  >
                    <Download className="w-3.5 h-3.5 mr-1.5" />
                    Download All Files
                  </button>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No files submitted</p>
              )}
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Text Responses</h4>
              {Object.keys(selectedSubmission.textResponses).length > 0 ? (
                <div className="space-y-3">
                  {Object.entries(selectedSubmission.textResponses).map(([key, value], index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <p className="text-sm font-medium text-gray-700">{key}</p>
                      <p className="text-sm mt-1">{value}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No text responses submitted</p>
              )}
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Grading</h4>
              <div className="flex items-center space-x-4">
                <div className="w-1/3">
                  <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
                    Grade
                  </label>
                  <select
                    id="grade"
                    defaultValue={selectedSubmission.grade || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Grade</option>
                    <option value="A+">A+</option>
                    <option value="A">A</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B">B</option>
                    <option value="B-">B-</option>
                    <option value="C+">C+</option>
                    <option value="C">C</option>
                    <option value="C-">C-</option>
                    <option value="D">D</option>
                    <option value="F">F</option>
                  </select>
                </div>
                <div className="w-2/3">
                  <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
                    Feedback
                  </label>
                  <textarea
                    id="feedback"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Provide feedback to the student"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 p-4 flex justify-end space-x-3">
            <button
              onClick={handleCloseSubmissionDetails}
              className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button className="px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Buckets</h2>
        <p className="text-gray-600">
          Create and manage form submissions from students. Buckets help collect and organize information efficiently.
        </p>
      </div>

      {selectedBucket ? renderBucketDetails() : renderBucketList()}
      {renderSubmissionDetails()}
    </div>
  )
}

