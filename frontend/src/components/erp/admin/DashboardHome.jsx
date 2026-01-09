 
import AllStudents from "../teacher/AllStudents";
import ManageTeachers from "./ManageTeachers";
  

export default function DashboardHome() {
  return (
    <div>
      <ManageTeachers />
      <AllStudents />
    </div>
    
  );
}

