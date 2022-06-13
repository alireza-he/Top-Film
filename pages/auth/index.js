import React, {useState} from "react";
import {Card} from "react-bootstrap";
import LoginForm from "../../components/auth/login";
import RegisterForm from "../../components/auth/register";

const AuthPage = () => {
    const [status, setStatus] = useState(true);

    return (
        <div>
            <Card className="rtl w-50 mx-auto mt-5">
                <Card.Header className="text-center">
                    <h2>صفحه ورود</h2>
                </Card.Header>
                <Card.Body>
                    {status ?
                        <LoginForm setStatus={(e) => setStatus(e)}/>
                        :
                        <RegisterForm setStatus={(e) => setStatus(e)}/>
                    }
                </Card.Body>
            </Card>
        </div>
    )
}

export default AuthPage