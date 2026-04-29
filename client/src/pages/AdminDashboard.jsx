import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [selectedWorkers, setSelectedWorkers] = useState({});

  const token = localStorage.getItem("token");

  const fetchComplaints = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/complaints/all",
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

  const fetchWorkers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/auth/workers"
      );
  
      setWorkers(res.data.workers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComplaints();
    fetchWorkers();
  }, []);

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h1>Admin Dashboard</h1>

        <div style={styles.table}>
          <div style={styles.header}>
            <div>Student</div>
            <div>Title</div>
            <div>Category</div>
            <div>Status</div>
            <div>Worker</div>
            <div>Action</div>
          </div>

          {complaints.map((item) => (
            <div key={item._id} style={styles.row}>
              <div>{item.createdBy?.name}</div>
              <div>{item.title}</div>
              <div>{item.category}</div>
              <div style={{
                fontWeight: "bold", 
                color:
                  item.status === "Pending"
                    ? "orange"
                    : item.status === "Assigned"
                    ? "#3b82f6"
                    : item.status === "In Progress"
                    ? "#a855f7"
                    : "#22c55e",
                  }
                }
              >{item.status}
              </div>
              {/* Worker Column */}
              <div>
                <select
                  style={styles.select}
                  value={selectedWorkers[item._id] || ""}
                  onFocus={(e) =>
                    (e.target.style.border = "1px solid #2563eb")
                  }
                  onBlur={(e) =>
                    (e.target.style.border = "1px solid #334155")
                  }
                  onChange={(e) =>
                    setSelectedWorkers({
                      ...selectedWorkers,
                      [item._id]: e.target.value,
                    })
                  }
                >
                  <option value="">Select Worker</option>
          
                  {workers.map((worker) => (
                    <option key={worker._id} value={worker._id}>
                      {worker.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Column */}
              <div>
                <button style={styles.btn}>
                  Assign
                </button>
              </div>
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

  table: {
    width: "90%",
    margin: "30px auto",
    borderRadius: "10px",
    overflow: "hidden",
  },

  header: {
    display: "grid",
    gridTemplateColumns: "1fr 1.3fr 1fr 1fr 1.3fr 0.8fr",
    backgroundColor: "#1d4ed8",
    padding: "15px",
    fontWeight: "bold",
  },

  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1.3fr 1fr 1fr 1.3fr 0.8fr",
    backgroundColor: "#1e293b",
    padding: "15px",
    borderBottom: "1px solid #334155",
  },
  btn: {
    padding: "10px 18px",
    margin:"6px 20px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "0.3s",
  },
  select: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #334155",
    backgroundColor: "#1f2c3f",
    color: "white",
    fontSize: "15px",
    outline: "none",
    cursor: "pointer",
    minWidth: "170px",
    transition: "0.3s",
  },
};

export default AdminDashboard;