import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Error, Input, SubmitBtn, Swicher, Title, Wrapper , Form} from "../components/auth-components";
import GithubBtn from "../components/github-btn";

interface IForm {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [customError, setCustomError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<IForm>();

  const onValid = async (data: IForm) => {
    if (loading) return;

    setLoading(true);
    clearErrors(); // Clear all errors before attempting login
    setCustomError(null); // Clear custom errors

    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setCustomError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          {...register("email", {
            required: "Email is required",
          })}
          placeholder="Email"
        />
        <Input
          {...register("password", {
            required: "Password is required",
          })}
          placeholder="Password"
          type="password"
        />
        <SubmitBtn type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </SubmitBtn>
        {Object.keys(errors)
          .map((key) => {
            const errorKey = key as keyof IForm;
            return <Error key={key}>{errors[errorKey]?.message}</Error>;
          })}
        {customError && <Error>{customError}</Error>}
      </Form>
      <GithubBtn />
      <Swicher>
        Don't have an account? <Link to={"/create-account"}>Create One →</Link>
      </Swicher>
      
    </Wrapper>
  );
}
