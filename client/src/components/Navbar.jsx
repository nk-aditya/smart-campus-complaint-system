import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={styles.nav}>
      <h2>Smart Campus System</h2>

      <div style={styles.right}>
        <span>
          Welcome, {name} ({role})
        </span>

        <button onClick={handleLogout} style={styles.btn}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  nav: {
    background: "#0d1b4c",
    color: "white",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  right: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },

  btn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "8px 14px",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default Navbar;