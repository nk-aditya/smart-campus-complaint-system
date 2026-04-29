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

    const interval = setInterval(() => {
      fetchComplaints();
    }, 3000);

    return () => clearInterval(interval);
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

        {/* Prepare Data */}
        {(() => {
          const unresolved = complaints.filter(
            (item) => item.status !== "Resolved"
          );
        
          const activeComplaint = unresolved[0];
        
          const ongoingComplaints = unresolved.slice(1);
        
          const resolvedComplaints = complaints.filter(
            (item) => item.status === "Resolved"
          );

          const getStatusColor = (status) => {
            if (status === "Pending") return "orange";
            if (status === "Assigned") return "#3b82f6";
            if (status === "In Progress") return "#a855f7";
            if (status === "Resolved") return "#22c55e";
            return "white";
          };
        
          return (
            <>
              {/* Active Complaint */}
              {activeComplaint && (
                <>
                  <h2 style={{ marginTop: "40px" }}>
                    Active Complaint
                  </h2>
        
                  <div style={styles.activeCard}>
                    <h3>{activeComplaint.title}</h3>
                    <p>{activeComplaint.description}</p>
                    <p>
                      <b>Status:</b>{" "}
                      <span
                        style={{
                          color: getStatusColor(activeComplaint.status),
                          fontWeight: "bold",
                        }}
                      >
                        {activeComplaint.status}
                      </span>
                    </p>
                    <p>
                      <b>Category:</b> {activeComplaint.category}
                    </p>
                  </div>
                </>
              )}
        
              {/* Ongoing Complaints */}
              {ongoingComplaints.length > 0 && (
                <>
                  <h2 style={{ marginTop: "40px" }}>
                    Ongoing Complaints
                  </h2>
        
                  <div style={styles.list}>
                    {ongoingComplaints.map((item) => (
                      <div key={item._id} style={styles.card}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <p>
                          <b>Status:</b>{" "}
                          <span
                            style={{
                              color: getStatusColor(item.status),
                              fontWeight: "bold",
                            }}
                          >
                            {item.status}
                          </span>
                        </p>
                        <p>
                          <b>Category:</b> {item.category}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              )}
        
              {/* Complaint History */}
              <h2 style={{ marginTop: "40px" }}>
                Resolved Complaints
              </h2>
        
              <div style={styles.list}>
                {resolvedComplaints.map((item) => (
                  <div key={item._id} style={styles.card}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>
                      <b>Status:</b>{" "}
                      <span
                        style={{
                          color: getStatusColor(item.status),
                          fontWeight: "bold",
                        }}
                      >
                        {item.status}
                      </span>
                    </p>
                    <p>
                      <b>Remark:</b> {item.remark}
                    </p>
                    <small>
                      {new Date(item.createdAt).toLocaleString()}
                    </small>
                  </div>
                ))}
              </div>
            </>
          );
        })()}
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
    width: "38rem",
    margin: "20px auto",
  },

  card: {
    backgroundColor: "#252525",
    border: "2px solid #393939",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "15px",
    textAlign: "left",
  },

  activeCard: {
    width: "35.5rem",
    margin: "20px auto",
    backgroundColor: "#393939",
    border: "2px solid #454545",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "left",
  },
};

export default StudentDashboard;