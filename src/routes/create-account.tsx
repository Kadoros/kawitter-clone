import { useState } from "react";
import { styled } from "styled-components";

const Warpper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 420px;
    padding: 50px 0px;
`;
const Form = styled.form`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
   
`;
const Input = styled.input`
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 50px;
    border: 1px solid gray;
    width: 100%;
    &[type="submit"] {
        cursor: pointer;
        &:hover {
            opacity: 0.8;
        }
    }
`;
const Title = styled.h1`
    font-size: 42px;
`;
const Error = styled.span`
    font-size: 12px;
    color: red;
    font-weight: bold;
`;
export default function CreateAccount() {
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {target: {name, value}} = e;
        if (name === "name") setName(value);
        else if (name === "email") setEmail(value);
        else if (name === "password") setPassword(value);
    }
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            
        } catch (error) {
            setError(`${error}`);
        } finally {
            setLoading(false);
        }

        
    }
    return (
    <Warpper>
        <Title>Create Account</Title>
        <Form onSubmit={onSubmit}>
            <Input onChange={onChange} name="name" value={name} placeholder="name" type="text" required/>
            <Input onChange={onChange} name="email" value={email} placeholder="email" type="email" required/>
            <Input onChange={onChange} name="password" value={password} placeholder="password" type="password" required/>
            <Input type="submit" value={isLoading? "Loading" : "Create Account"}/>
        </Form>
        {error ? <Error>{error}</Error>: null}
    </Warpper>
    )
}