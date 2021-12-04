import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAuth } from "@firebase/auth";
import { useContext } from "react";
import { Context } from "../../store/Store";
export default function NavbarComponent() {
  const auth = getAuth();
  const [state, dispatch] = useContext(Context);
  const links = [
    {
      label: "Home",
      to: "home",
    },
    {
      label: "Posts",
      to: "posts",
    },
    {
      label: "Contact",
      to: "contact",
    },
    {
      label: "About",
      to: "about",
    },
    {
      label: "Liked",
      to: "my-posts",
    },
    {
      label: "Sale",
      to: "Sale",
    },
  ];
  return (
    <Navbar bg="primary">
      <Container>
        <Nav style={{ alignItems: "center", display: "flex" }}>
          <img src="./image/logo u band - new.png" width="50px" />

          {links.map((link) => (
            <Link
              to={link.to}
              style={{
                backgroundColor: "white",
                borderRadius: 45,
                width: 90,
                height: 40,
                marginLeft: 3,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                color: "black",
                textDecoration: "none",
              }}
            >
              {link.label}
            </Link>
          ))}
        </Nav>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          {!state.auth ? (
            <Link
              to="SignUp"
              className="btn btn-light"
              style={{ marginRight: "3%" }}
            >
              Sign-Up
            </Link>
          ) : (
            ""
          )}
          {state.auth ? (
            <Button
              variant="light"
              onClick={() =>
                auth
                  .signOut()
                  .then(() => dispatch({ type: "SET_AUTH", payload: false }))
              }
            >
              Logout
            </Button>
          ) : (
            <Link className="btn btn-light" to="/login">
              Login
            </Link>
          )}
          <div style={{ marginLeft: 10, color: "white" }}>
            {state.auth ? auth.currentUser.displayName : ""}
          </div>
        </div>
      </Container>
    </Navbar>
  );
}
