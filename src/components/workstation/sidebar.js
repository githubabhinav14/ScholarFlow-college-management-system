import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import { BookOpen, Briefcase, FileText, Package2 } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const routes = [
    { name: "MyClassRoom", path: "/", icon: BookOpen },
    { name: "WorkStation", path: "/workstation", icon: Briefcase },
    { name: "MarksDossier", path: "/marks", icon: FileText },
    { name: "Personal", path: "/personal", icon: FileText },
    { name: "Buckets", path: "/buckets", icon: Package2 },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex-shrink-0">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-blue-600">ScholarFlow</h1>
      </div>
      <nav className="mt-6">
        <ul>
          {routes.map((route) => (
            <li key={route.name} className="mb-2">
              <Link
                to={route.path}
                className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${location.pathname === route.path ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <route.icon className="w-5 h-5 mr-3" />
                {route.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;