import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function StudentDashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Electricity");

  const [complaints, setComplaints] = useState([]);

  const token = localStorage.getItem("token");

  const fetchComplaints = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/complaints/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComplaints(res.data.complaints);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/complaints/create",
        { title, description, category },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Complaint Submitted");

      setTitle("");
      setDescription("");
      setCategory("Electricity");

      fetchComplaints();
    } catch (error) {
      alert("Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h1 style={styles.heading}>Student Dashboard</h1>

        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Complaint Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
            required
          />

          <textarea
            placeholder="Complaint Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
            required
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.input}
          >
            <option>Electricity</option>
            <option>Water</option>
            <option>Furniture</option>
            <option>Internet</option>
            <option>Cleaning</option>
          </select>

          <button style={styles.button}>
            Submit Complaint
          </button>
        </form>

        <h2 style={{ marginTop: "50px" }}>My Complaints</h2>

        {/* Active Complaint */}
        <div style={styles.list}>
          {complaints
          .filter((item) => item.status !== "Resolved")
          .slice(0, 1)
          .map((item) => (
            <div key={item._id} style={styles.activeCard}>
              <h3 style={{ color: "#fca5a5" }}>Active Complaint</h3>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <p><b>Category:</b> {item.category}</p>
              <p><b>Status:</b> {item.status}</p>
            </div>
          ))}
        </div>

        {/* History */}
        <h2 style={{ marginTop: "40px" }}>Complaint History</h2>

        <div style={styles.list}>
          {complaints
            .filter((item) => item.status === "Resolved")
            .map((item) => (
            <div key={item._id} style={styles.card}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p><b>Status:</b> {item.status}</p>
              <p><b>Remark:</b> {item.remark}</p>
              <small>
                {new Date(item.createdAt).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#0f111a",
    color: "white",
    textAlign: "center",
    paddingBottom: "50px",
  },

  heading:{
    fontSize:"3.2rem",
    marginBottom:"2rem"
  },
  form: {
    width: "400px",
    margin: "20px auto",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  input: {
    padding: "14px",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
  },

  textarea: {
    padding: "14px",
    height: "120px",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
  },

  button: {
    padding: "14px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },

  list: {
    width: "700px",
    margin: "20px auto",
  },

  card: {
    backgroundColor: "#1e293b",
    border: "2px solid #193cc6",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "15px",
    textAlign: "left",
  },

  activeCard: {
  backgroundColor: "#3b1d1d",
  border: "2px solid #ef4444",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "left",
  boxShadow: "0 0 15px rgba(239,68,68,0.25)",
},
};

export default StudentDashboard;