import { useState, useContext } from "react";
import useFetch from "./hooks/useFetch";
import { ThemeContext, ThemeProvider } from "./context/ThemeContext";
import "./App.css";

// URL MockAPI ví dụ (Bạn có thể thay bằng đường dẫn MockAPI của bạn)
const API_URL = "https://6ad8214995e98f36aef2f5c9.mockapi.io/students";

function StudentManager() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { data: students, setData: setStudents, loading, error } = useFetch(API_URL);

  const [name, setName] = useState("");
  const [major, setMajor] = useState("CNTT");

  // Hàm thêm sinh viên mới
  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Vui lòng nhập tên sinh viên!");

    const newStudent = { id: Date.now().toString(), name, major };
    setStudents((prev) => [...prev, newStudent]);
    setName("");
  };

  // Hàm xóa sinh viên
  const handleDelete = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>🎓 Quản Lý Sinh Viên</h2>
        <button onClick={toggleTheme}>
          Chế độ: {theme === "light" ? "☀️ Sáng" : "🌙 Tối"}
        </button>
      </div>

      {/* Form thêm sinh viên */}
      <form onSubmit={handleAddStudent} style={{ margin: "20px 0", display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Họ và tên..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select value={major} onChange={(e) => setMajor(e.target.value)}>
          <option value="CNTT">CNTT</option>
          <option value="VT">Viễn Thông</option>
          <option value="DTVT">Điện Tử</option>
        </select>
        <button type="submit">Thêm</button>
      </form>

      {/* Xử lý 3 trạng thái Tải / Lỗi / Dữ liệu */}
      {loading && <p>⏳ Đang tải danh sách sinh viên...</p>}
      {error && <p style={{ color: "red" }}>❌ Lỗi: {error}</p>}

      {!loading && !error && (
        <ul>
          {students.map((sv) => (
            <li key={sv.id} style={{ marginBottom: "8px" }}>
              <strong>{sv.name}</strong> - Chuyên ngành: {sv.major}{" "}
              <button onClick={() => handleDelete(sv.id)} style={{ marginLeft: "10px", color: "red" }}>
                Xóa
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <StudentManager />
    </ThemeProvider>
  );
}