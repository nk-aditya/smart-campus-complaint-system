import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);

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

  useEffect(() => {
    fetchComplaints();
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
    gridTemplateColumns: "1fr 2fr 1fr 1fr",
    backgroundColor: "#1d4ed8",
    padding: "15px",
    fontWeight: "bold",
  },

  row: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr 1fr 1fr",
    backgroundColor: "#1e293b",
    padding: "15px",
    borderBottom: "1px solid #334155",
  },
};

export default AdminDashboard;