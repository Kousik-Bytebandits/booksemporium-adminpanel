import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Sidebar from './components/Sidebar';
import BookUploads from './pages/BookUploads';
import BookEditor from './pages/BookEditor';
import BookEditorForm from './pages/BookEditorForm';
import Transactions from './pages/Transactions';
import CustomersOrders from './pages/Order';
import Login from './pages/Login';

function RequireAuth({ isLoggedIn, children }) {
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false); // <-- NEW

  useEffect(() => {
    const sessionLogin = sessionStorage.getItem("isLoggedIn");
    if (sessionLogin === "true") {
      setIsLoggedIn(true);
    }
    setAuthChecked(true); // <-- tell app auth check is complete
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem("isLoggedIn", "true");
  };

  // ⏳ While checking auth, show nothing (or a loader)
  if (!authChecked) return null;

  return (
    <div className="flex bg-[#FDF9F3] h-screen w-full">
      {isLoggedIn && <Sidebar />}

      <Routes>
        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
          }
        />

        <Route
          path="/"
          element={
            <RequireAuth isLoggedIn={isLoggedIn}>
              <BookUploads />
            </RequireAuth>
          }
        />
        <Route
          path="/editor"
          element={
            <RequireAuth isLoggedIn={isLoggedIn}>
              <BookEditor />
            </RequireAuth>
          }
        />
        <Route
          path="/editor/:id"
          element={
            <RequireAuth isLoggedIn={isLoggedIn}>
              <BookEditorForm />
            </RequireAuth>
          }
        />
        <Route
          path="/transactions"
          element={
            <RequireAuth isLoggedIn={isLoggedIn}>
              <Transactions />
            </RequireAuth>
          }
        />
        <Route
          path="/orders"
          element={
            <RequireAuth isLoggedIn={isLoggedIn}>
              <CustomersOrders />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
