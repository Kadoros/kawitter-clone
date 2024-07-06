import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";

export interface ITweet {
  id: string;
  text: string;
  username: string;
  createdAt: string;
  userId: string;
  photo: string;
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

export default function Timeline() {
  const [tweets, setTweets] = useState<ITweet[]>([]);

  useEffect(() => {
    let unsub: Unsub | null = null;

    const fetchTweets = async () => {
      const tweetsQuery = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc"),
        limit(20)
      );

      unsub = await onSnapshot(tweetsQuery, (snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          const {
            text,
            username,
            userId,
            photo,
            createdAt,
          } = doc.data() as ITweet;
          return {
            text,
            username,
            userId,
            photo,
            createdAt,
            id: doc.id,
          };
        });
        setTweets(tweets);
      });
    };
    fetchTweets();
    return () => unsub && unsub();
  }, []);

  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </Wrapper>
  );
}
