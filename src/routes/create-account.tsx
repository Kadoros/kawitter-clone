import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Error, Input, SubmitBtn, Swicher, Title, Wrapper, Form } from "../components/auth-components";
import GithubBtn from "../components/github-btn";



interface IForm {
  email: string;
  userName: string;
  password: string;
  passwordConfirm: string;
}

export default function CreateAccount() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [customError, setCustomError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors
  } = useForm<IForm>();

  const onValid = async (data: IForm) => {
    clearErrors();
    setCustomError(null);

    if (data.password !== data.passwordConfirm) {
      setError(
        "passwordConfirm",
        { message: "Passwords do not match" },
        { shouldFocus: true }
      );
    } else {
      if (loading) return;
      try {
        setLoading(true);
        const credentials = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        console.log(credentials.user);
        await updateProfile(credentials.user, {
          displayName: data.userName,
        });
        navigate("/");
      } catch (error) {
        if (error instanceof FirebaseError) {
          setCustomError(error.message);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Wrapper>
      <Title>Create Account</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          {...register("userName", { required: "Username is required" })}
          placeholder="Name"
        />
        <Input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Email is not valid",
            },
          })}
          placeholder="Email"
        />
        <Input
          {...register("password", {
            required: "Password is required",
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{8,}$/,
              message:
                "The password must be at least 8 characters long and include at least one letter, one number, and one special character.",
            },
          })}
          placeholder="Password"
          type="password"
        />
        <Input
          {...register("passwordConfirm", { required: "Password confirmation is required" })}
          placeholder="Confirm Password"
          type="password"
        />
        <SubmitBtn type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </SubmitBtn>
        {Object.keys(errors).map((key) => {
          const errorKey = key as keyof IForm;
          return <Error key={key}>{errors[errorKey]?.message}</Error>;
        })}
        {customError && <Error>{customError}</Error>}
        
      </Form>
      <GithubBtn />
      <Swicher>
        Already have an account? <Link to={"/login"}>Login →</Link>
      </Swicher>
      
    </Wrapper>
  );
}
