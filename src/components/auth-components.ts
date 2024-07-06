import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 420px;
  padding: 50px 0px;
`;
export const Form = styled.form`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;
export const Input = styled.input`
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
export const Title = styled.h1`
  font-size: 42px;
`;
export const Error = styled.span`
  font-size: 12px;
  color: red;
  font-weight: bold;
`;
export const SubmitBtn = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 50px;
  border: 1px solid gray;
  width: 100%;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export const Swicher = styled.span` 
    margin-top: 20px;
    a {
        color: #1d9bf0;
    }
`;