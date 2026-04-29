import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function WorkerDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [remarks, setRemarks] = useState({});

  const token = localStorage.getItem("token");

  const fetchComplaints = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/complaints/worker",
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

  const startWork = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/complaints/status/${id}`,
        { status: "In Progress" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchComplaints();
    } catch (error) {
      alert("Failed");
    }
  };

  const completeWork = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/complaints/complete/${id}`,
        { remark: remarks[id] || "" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchComplaints();
    } catch (error) {
      alert("Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h1>Worker Dashboard</h1>

        <div style={styles.list}>
          {complaints.map((item) => (
            <div key={item._id} style={styles.card}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <p><b>Student:</b> {item.createdBy?.name}</p>
              <p><b>Status:</b> {item.status}</p>

              {item.status === "Assigned" && (
                <button
                  style={styles.btn}
                  onClick={() => startWork(item._id)}
                >
                  Start Work
                </button>
              )}

              {item.status === "In Progress" && (
                <>
                  <textarea
                    placeholder="Enter completion remark"
                    style={styles.input}
                    onChange={(e) =>
                      setRemarks({
                        ...remarks,
                        [item._id]: e.target.value,
                      })
                    }
                  />

                  <button
                    style={styles.greenBtn}
                    onClick={() => completeWork(item._id)}
                  >
                    Complete Work
                  </button>
                </>
              )}
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
    background: "#0f111a",
    color: "white",
    textAlign: "center",
    paddingBottom: "50px",
  },

  list: {
    width: "38rem",
    margin: "30px auto",
  },

  card: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
    textAlign: "left",
  },

  input: {
    width: "95%",
    padding: "12px",
    marginTop: "10px",
    borderRadius: "8px",
    backgroundColor: "#18202e",
    border: "1px solid #565656d0",
  },

  btn: {
    marginTop: "10px",
    padding: "10px 18px",
    background: "#2563eb",
    border: "none",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
  },

  greenBtn: {
    marginTop: "10px",
    padding: "10px 18px",
    background: "#22c55e",
    border: "none",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default WorkerDashboard;