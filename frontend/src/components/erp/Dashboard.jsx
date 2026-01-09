import StudentLogin from "./StudentLogin";
import TeacherLogin from "./TeacherLogin";
import AdminLogin from "./AdminLogin";
import ManageTeachers from "../erp/admin/ManageTeachers"
import{Link}from"react-router-dom";
export default function Dashboard() {
  return (
    <div className="  flex items-center justify-center bg-gray-100 px-4">
      

<header>

     
<Link to="/student/login">
      <button className="bg-blue-600 text-white py-2 px-4 rounded m-4">
        Student Login 
      </button>
    </Link>
<Link to="/teacher/login">
      <button className="bg-blue-600 text-white py-2 px-4 rounded m-4">
        Teacher Login 
      </button>
    </Link>

    <Link to="/admin/login">
      <button className="bg-blue-600 text-white py-2 px-4 rounded m-4">
        Admin Login 
      </button>
    </Link>

</header>

      
      </div>
   
  );
}
