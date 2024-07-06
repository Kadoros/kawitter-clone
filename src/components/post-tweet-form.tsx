import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../firebase";

const MAX_FILE_SIZE = 1000000;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ddd;
  font-size: 16px;
  resize: none;
`;

const AttachFileBtn = styled.label`
  padding: 10px 20px;
  border: 1px solid gray;
  border-radius: 50px;
  background-color: #1d9bf0;
  color: white;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitBtn = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 50px;
  border: 1px solid gray;
  background-color: #1d9bf0;
  color: white;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
`;

interface IForm {
  text: string;
  file: File | null;
}

export default function PostTweetForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<IForm>();
  const [loading, setLoading] = useState(false);
  const file = watch("file");
  const user = auth.currentUser;

  const onSubmit = async (data: IForm) => {
    if (!user || loading || data.text.length > 150) return;
    setLoading(true);

    try {
      const doc = await addDoc(collection(db, "tweets"), {
        text: data.text,
        createdAt: new Date(),
        username: user.displayName || "Anonymous",
        userId: user.uid,
      });

      if (data.file) {
        const fileRef = ref(
          storage,
          `tweets/${user.uid}-${user.displayName}/${doc.id}`
        );
        const result = await uploadBytes(fileRef, data.file);
        const fileURL = await getDownloadURL(result.ref);
        await updateDoc(doc, { photo: fileURL });
      }

      // Reset the form after successful submission
      reset();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextArea
        {...register("text", {
          required: "Text is required",
          maxLength: {
            value: 150,
            message: "Text cannot exceed 150 characters",
          },
        })}
        rows={5}
        maxLength={150}
        placeholder="What's happening?"
      />
      {errors.text && <ErrorText>{errors.text.message}</ErrorText>}
      <AttachFileBtn htmlFor="file">
        {file ? "Change File" : "Add File"}
      </AttachFileBtn>
      <AttachFileInput
        {...register("file", {
          validate: (file) =>{
            if (file && file.size > MAX_FILE_SIZE) {
              return "File size should be less than 1MB";
            }
        }})}
        id="file"
        type="file"
        accept="image/*"
      />
      {errors.file && <ErrorText>{errors.file.message}</ErrorText>}
      <SubmitBtn type="submit">{loading ? "Posting..." : "Post"}</SubmitBtn>
    </Form>
  );
}
