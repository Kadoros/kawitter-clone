import { styled } from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  gap: 10px; // Added gap between columns
`;

const Column = styled.div``;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
  object-fit: cover; // Ensure the image covers the entire area
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const DeleteBtn = styled.button`
  cursor: pointer;
  color: red;
  font-size: 16px;
  border: none;
  background-color: transparent;
  &:hover {
    opacity: 0.8;
  }
`;

export default function Tweet({ username, photo, text, userId, id }: ITweet) {
  console.log(username, photo, text);
  const user = auth.currentUser;
  const onDelete = async () => {
    const ok = window.confirm("Are you sure you want to delete this tweet?");
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "tweets", id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${userId}-${username}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        <Payload>{text}</Payload>
        {user?.uid === userId && (
          <DeleteBtn onClick={onDelete}>Delete</DeleteBtn>
        )}
      </Column>
      <Column>
        {photo ? <Photo src={photo} alt={`${username}'s tweet`} /> : null}
      </Column>
    </Wrapper>
  );
}
