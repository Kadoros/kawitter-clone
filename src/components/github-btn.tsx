import { GithubAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import styled from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Butten = styled.button`
  margin-top: 50px;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 50px;
  border: 1px solid gray;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: bold;
  background-color: white;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
const Logo = styled.img`
  width: 20px;
  height: 20px;
`;

export default function GithubBtn() {
    const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Butten onClick={onClick}>
      <Logo src="/public/github-logo.svg" />
      continue with github
    </Butten>
  );
}
