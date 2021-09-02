import {
  AddCircle,
  CardGiftcard,
  EmojiEmotions,
  Gif,
} from "@material-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "../features/appSlice";
import { selectUser } from "../features/userSlice";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import { firebaseApp } from "../firebase";
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

const db = getFirestore(firebaseApp);

const Chat = () => {
  const elementRef = useRef();
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (channelId) {
      const channelRef = collection(db, "channels", channelId, "messages");
      const q = query(channelRef, orderBy("timestamp", "desc"));
      onSnapshot(q, (snapshot) => {
        // setMessages(snapshot.docs.map((doc) => console.log(doc.data())));
        setMessages(snapshot.docs.map((doc) => doc.data()));
        //elementRef.current.scrollIntoView();
      });
    }
  }, [channelId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "channels", channelId, "messages"), {
      message: input,
      timestamp: serverTimestamp(),
      user: user,
    });
    setInput("");
  };

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />
      <div className="chat__messages">
        {messages.map((message) => (
          <Message
            key="key"
            timestamp={message.timestamp}
            message={message.message}
            user={message.user}
          />
        ))}
        <div ref={elementRef} />
      </div>
      <div className="chat__input">
        <AddCircle fontSize="large" />
        <form>
          <input
            value={input}
            disabled={!channelId}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message #${channelName}`}
          />
          <button
            disabled={!channelId}
            className="chat__inputButton"
            type="submit"
            onClick={sendMessage}
          >
            Send Message
          </button>
        </form>{" "}
        <div className="chat__inputIcons">
          <CardGiftcard fontSize="large" />
          <Gif fontSize="large" />
          <EmojiEmotions fontSize="large" />
        </div>
      </div>
    </div>
  );
};

export default Chat;
