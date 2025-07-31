import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import BookUploads from "./pages/BookUploads";
import BookEditor from "./pages/BookEditor";
import BookEditorForm from "./pages/BookEditorForm";

function App() {
  return (
    <Router>
      <div className="flex bg-[#FDF9F3] h-screen">
        {/* Fixed Sidebar */}
       
          <Sidebar />
        

        {/* Main Content Area */}
       
          <Routes>
            <Route path="/editor" element={<BookEditor />} />
            <Route path="/" element={<BookUploads />} />
            <Route path="/editor/:id" element={<BookEditorForm/>}/>
            
           </Routes>
      
 </div>
    </Router>
  );
}

export default App;
