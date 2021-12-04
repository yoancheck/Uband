import { useContext } from "react";
import { Context } from "../../store/Store";
import { Button, Container, Form } from "react-bootstrap";
import { useHistory } from "react-router";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";

import { databaseProfile } from "./SignUp";

export function Login() {
    const [state, dispatch] = useContext(Context);
    const history = useHistory();
    const EMAIL = "email";
    const PASSWORD = "password";
    const auth = getAuth();

    const signup = () =>
        signInWithEmailAndPassword(
            auth,
            document.getElementById(EMAIL).value,
            document.getElementById(PASSWORD).value
        );
    const google = () =>
        signInWithPopup(auth, new GoogleAuthProvider())
            .then((user) => {databaseProfile(user.user.displayName, user.user.uid, user.user.photoURL); history.push('/home') })
            .catch((e) => console.log(e));

    return (
        <div style={{ width: '25%', margin: 'auto' }}>
            <img src="./image/logo u band - new.png" width="200px" />
            {
                state.auth ? (
                    <div />
                ) : (
                    <div>
                        {" "}
                        <Form.Label><h3><b>Username</b></h3></Form.Label>
                        <Form.Control id={EMAIL} />
                        <br />
                        <Form.Label><h3><b>Password</b></h3></Form.Label>
                        <Form.Control id={PASSWORD} type="password" />
                        <br />
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Button style={{ width: "45%" }} variant="primary">Login</Button>
                            <Button
                            style={{width: '45%'}}
                                img
                                src="btn_google_signin_dark_normal_web/image.png"
                                onClick={google}
                            >
                                Google
                            </Button>
                        </div>

                    </div>

                )
            }
        </div>
    )
}