import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: "#333",
        display: "flex",
        justifyContent: "center",
        padding: "15px"
      }}
    >
      <Link style={{ color: "white", margin: "10px", textDecoration: "none" }} to="/">
        Home
      </Link>

      <Link style={{ color: "white", margin: "10px", textDecoration: "none" }} to="/about">
        About
      </Link>

      <Link style={{ color: "white", margin: "10px", textDecoration: "none" }} to="/services">
        Services
      </Link>

      <Link style={{ color: "white", margin: "10px", textDecoration: "none" }} to="/contact">
        Contact
      </Link>
    </nav>
  );
}

export default Navbar;
