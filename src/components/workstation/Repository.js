import { useState, useEffect } from "react"
import {Search,Filter,FileText,Image,FileArchive,File,Upload,Clock,Tag,ChevronDown,Download,Share2,Bookmark,BookmarkCheck,} from "lucide-react"
import { format, subDays } from "date-fns"

//files
const MOCK_FILES = [
  {
    id: 1,
    name: "BlockChain Technology.pdf",
    type: "pdf",
    size: "2.4 MB",
    uploadedBy: "Prof. Durga",
    uploadDate: subDays(new Date(), 2),
    category: "Notes",
    subject: "BCT",
    downloads: 100,
    thumbnail: null,
    url: "https://aws-bucket-url.com/files/data-structures-notes.pdf",
  },
  {
    id: 2,
    name: "Cloud Computing.docx",
    type: "docx",
    size: "1.1 MB",
    uploadedBy: "Prof. Ravi",
    uploadDate: subDays(new Date(), 5),
    category: "Study Material",
    subject: "CC",
    downloads: 20,
    thumbnail: null,
    url: "https://aws-bucket-url.com/files/calculus-formula-sheet.docx",
  },
  {
    id: 3,
    name: "Project List.xlsx",
    type: "xlsx",
    size: "0.8 MB",
    uploadedBy: "Prof. Eswari",
    uploadDate: subDays(new Date(), 7),
    category: "Templates",
    subject: "General",
    downloads: 32,
    thumbnail: null,
    url: "https://aws-bucket-url.com/files/physics-lab-report-template.xlsx",
  },
  {
    id: 4,
    name: "Data Science Models.pdf",
    type: "pdf",
    size: "3.2 MB",
    uploadedBy: "Prof. Shaik Riyaz",
    uploadDate: subDays(new Date(), 1),
    category: "Guidelines",
    subject: "Data Science",
    downloads: 120,
    thumbnail: null,
    url: "https://aws-bucket-url.com/files/semester-project-guidelines.pdf",
  },
  {
    id: 5,
    name: "Weekly meet-Project.pdf",
    type: "pdf",
    size: "4.5 MB",
    uploadedBy: "MS.D.Sai Eswari",
    uploadDate: subDays(new Date(), 3),
    category: "Project",
    subject: "Mini Project",
    downloads: 47,
    thumbnail: "/placeholder.svg?height=100&width=100",
    url: "https://aws-bucket-url.com/files/circuit-diagrams.png",
  },
  {
    id: 6,
    name: "Assignments.zip",
    type: "zip",
    size: "7.8 MB",
    uploadedBy: "Class CR(Student)",
    uploadDate: subDays(new Date(), 4),
    category: "Solutions",
    subject: "Computer Science",
    downloads: 56,
    thumbnail: null,
    url: "https://aws-bucket-url.com/files/programming-assignment-solutions.zip",
  },
  {
    id: 7,
    name: "DSM LAB.pdf",
    type: "pdf",
    size: "1.9 MB",
    uploadedBy: "Prof. Shaik Riyaz",
    uploadDate: subDays(new Date(), 10),
    category: "Examples",
    subject: "DMS",
    downloads: 19,
    thumbnail: null,
    url: "https://aws-bucket-url.com/files/research-paper-example.pdf",
  },
  {
    id: 8,
    name: "NLP.pdf",
    type: "pdf",
    size: "1.5 MB",
    uploadedBy: "Prof. Archana",
    uploadDate: subDays(new Date(), 15),
    category: "Guidelines",
    subject: "NLP",
    downloads: 112,
    thumbnail: null,
    url: "https://aws-bucket-url.com/files/chemistry-lab-safety-rules.pdf",
  },
]

// Categories for filtering
const CATEGORIES = [
  "All Categories",
  "Notes",
  "Study Material",
  "Templates",
  "Guidelines",
  "Diagrams",
  "Solutions",
  "Examples",
]

// Subjects for filtering
const SUBJECTS = [
  "All Subjects",
  "BCT",
  "CC",
  "General",
  "Data Science",
  "Mini Project",
  "Computer Science",
  "DMS",
  "NLP",
]

// File types for filtering
const FILE_TYPES = ["All Types", "pdf", "docx", "xlsx", "png", "zip"]

const RepositoryLayout = () => {
  const [files, setFiles] = useState(MOCK_FILES)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedSubject, setSelectedSubject] = useState("All Subjects")
  const [selectedFileType, setSelectedFileType] = useState("All Types")
  const [dateRange, setDateRange] = useState({ start: null, end: null })
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState("grid")
  const [favorites, setFavorites] = useState([])
  const [showFilters, setShowFilters] = useState(false)

  // Filter files based on search and filters
  useEffect(() => {
    let filteredFiles = [...MOCK_FILES]

    // Search term filter
    if (searchTerm) {
      filteredFiles = filteredFiles.filter(
        (file) =>
          file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          file.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
          file.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          file.subject.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Category filter
    if (selectedCategory !== "All Categories") {
      filteredFiles = filteredFiles.filter((file) => file.category === selectedCategory)
    }

    // Subject filter
    if (selectedSubject !== "All Subjects") {
      filteredFiles = filteredFiles.filter((file) => file.subject === selectedSubject)
    }

    // File type filter
    if (selectedFileType !== "All Types") {
      filteredFiles = filteredFiles.filter((file) => file.type === selectedFileType)
    }

    // Date range filter
    if (dateRange.start && dateRange.end) {
      filteredFiles = filteredFiles.filter(
        (file) => file.uploadDate >= dateRange.start && file.uploadDate <= dateRange.end,
      )
    }

    // Sort files
    if (sortBy === "newest") {
      filteredFiles.sort((a, b) => b.uploadDate.getTime() - a.uploadDate.getTime())
    } else if (sortBy === "oldest") {
      filteredFiles.sort((a, b) => a.uploadDate.getTime() - b.uploadDate.getTime())
    } else if (sortBy === "name") {
      filteredFiles.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === "downloads") {
      filteredFiles.sort((a, b) => b.downloads - a.downloads)
    }

    setFiles(filteredFiles)
  }, [searchTerm, selectedCategory, selectedSubject, selectedFileType, dateRange, sortBy])

  // Toggle favorite status
  const toggleFavorite = (fileId) => {
    setFavorites((prev) => {
      if (prev.includes(fileId)) {
        return prev.filter((id) => id !== fileId)
      } else {
        return [...prev, fileId]
      }
    })
  }

  // Handle file download
  const handleDownload = (file) => {
    // Create a temporary anchor element
    const link = document.createElement("a")
    link.href = "/NOTES.pdf"
    link.download = "NOTES.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Update download count (in a real app, this would be an API call)
    const updatedFiles = files.map((f) => {
      if (f.id === file.id) {
        return { ...f, downloads: f.downloads + 1 }
      }
      return f
    })
    setFiles(updatedFiles)
  }

  // Get file icon based on type
  const getFileIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-6 w-6 text-red-500" />
      case "docx":
        return <FileText className="h-6 w-6 text-blue-500" />
      case "xlsx":
        return <FileText className="h-6 w-6 text-green-500" />
      case "png":
      case "jpg":
      case "jpeg":
        return <Image className="h-6 w-6 text-purple-500" />
      case "zip":
        return <FileArchive className="h-6 w-6 text-amber-500" />
      default:
        return <File className="h-6 w-6 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* header of the section */}
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Class Repository</h1>
          <p className="text-gray-500">Access and share class materials for the current semester</p>
        </header>

        {/* main sections */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
          <div className="p-4">

            <div className="flex flex-col md:flex-row gap-4">
              {/* search bar section*/}
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search files, categories, or uploaders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* buttons section */}
              <div className="flex gap-2">

                {/* filters options */}
                <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                  <Filter className="h-4 w-4" /> Filters <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "transform rotate-180" : ""}`}/>
                </button>

                {/* view mode button */}
                <button onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")} className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                  {viewMode === "grid" ? "List View" : "Grid View"}
                </button>

                {/* upload button */}
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Upload className="h-4 w-4" /> Upload
                </button>
              </div>

            </div>

            {/* filter options */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4">
                
                {/* categories */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    className="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* subjects */} 
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <select
                    className="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                  >
                    {SUBJECTS.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                {/* fileType */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">File Type</label>
                  <select
                    className="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={selectedFileType}
                    onChange={(e) => setSelectedFileType(e.target.value)}
                  >
                    {FILE_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
 
                {/* sortby */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                  <select
                    className="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="name">Name (A-Z)</option>
                    <option value="downloads">Most Downloads</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Files Display section*/}
        {files.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
            <div className="flex flex-col items-center justify-center">
              <FileText className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">No files found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All Categories")
                  setSelectedSubject("All Subjects")
                  setSelectedFileType("All Types")
                  setDateRange({ start: null, end: null })
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        ): 
        viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {files.map((file) => (
              <div
                key={file.id}
                className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleDownload(file)}>
                      {getFileIcon(file.type)}
                      <div>
                        <h3 className="font-medium text-gray-800 line-clamp-1">{file.name}</h3>
                        <p className="text-xs text-gray-500">{file.size}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFavorite(file.id)}
                      className="text-gray-400 hover:text-amber-500 transition-colors"
                    >
                      {favorites.includes(file.id) ? (
                        <BookmarkCheck className="h-5 w-5 text-amber-500" />
                      ) : (
                        <Bookmark className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="h-4 w-4 text-gray-400" />
                    <span className="text-xs text-gray-600">{file.category}</span>
                    <span className="text-gray-300">|</span>
                    <span className="text-xs text-gray-600">{file.subject}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-xs text-gray-600">{format(file.uploadDate, "MMM dd, yyyy")}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>By {file.uploadedBy}</span>
                    <span>{file.downloads} downloads</span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                    <button
                      onClick={() => handleDownload(file)}
                      className="flex items-center gap-1 text-blue-600 text-sm hover:text-blue-800 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </button>
                    <button className="flex items-center gap-1 text-gray-600 text-sm hover:text-gray-800 transition-colors">
                      <Share2 className="h-4 w-4" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    File
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Subject
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Uploaded By
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Downloads
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
                {files.map((file) => (
                  <tr key={file.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleDownload(file)}>
                        {getFileIcon(file.type)}
                        <div>
                          <div className="font-medium text-gray-800">{file.name}</div>
                          <div className="text-xs text-gray-500">{file.size}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{file.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{file.subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{file.uploadedBy}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {format(file.uploadDate, "MMM dd, yyyy")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{file.downloads}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => toggleFavorite(file.id)}
                          className="text-gray-400 hover:text-amber-500 transition-colors"
                        >
                          {favorites.includes(file.id) ? (
                            <BookmarkCheck className="h-5 w-5 text-amber-500" />
                          ) : (
                            <Bookmark className="h-5 w-5" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDownload(file)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <Download className="h-5 w-5" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 transition-colors">
                          <Share2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default RepositoryLayout