import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { MdOutlineImage } from "react-icons/md";
import { format } from "timeago.js";
import socketIO from "socket.io-client";
import axios from "axios";
const ENDPOINT = "http://localhost:4000";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const UserInbox = () => {
  const { user } = useSelector((state) => state.user);
  const [conversation, setConversation] = useState([]);
  const [open, setOpen] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState(null);
  const [userData, setUserData] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [activeStatus, setActiveStatus] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    axios
      .get(`${server}/conversation/get-all-user-conversation/${user._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setConversation(res.data.conversation);
      })
      .catch((error) => {
        toast.error("There was trouble while connecting to conversations!");
      });
  }, [user._id, conversation]);

  // check if user is online
  useEffect(() => {
    if (user) {
      const userId = user?._id;
      socketId.emit("addUser", userId);
      socketId.on("getUsers", (data) => {
        setOnlineUser(data);
      });
    }
  }, [user]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== user?._id);
    const online = onlineUser.find((user) => user.userId === chatMembers);
    return online ? true : false;
  };

  // get messages
  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.get(
          `${server}/message/get-all-messages/${currentChat?._id}`
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [currentChat]);

  // create new message
  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member.id !== user._id
    );

    socketId.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      if (newMessage !== "") {
        await axios
          .post(`${server}/message/create-new-message`, message)
          .then((res) => {
            setMessages([...messages, res.data.message]);
            updateLastMessage();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: user._id,
    });

    await axios
      .put(`${server}/conversation/update-last-message/${currentChat._id}`, {
        lastMessage: newMessage,
        lastMessageId: user._id,
      })
      .then((res) => {
        // console.log(res.data.conversation);
        setNewMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  

  return (
    <div className="w-full">
      {!open && (
        <>
          <h1 className="text-center font-Poppins py-3 text-[30px]">
            All Messages
          </h1>
          {/* show all the messages */}
          {conversation &&
            conversation.map((item, index) => (
              <MessageList
                data={item}
                key={index}
                index={index}
                setOpen={setOpen}
                setCurrentChat={setCurrentChat}
                me={user._id}
                setUserData={setUserData}
                userData={userData}
                online={onlineCheck(item)}
                setActiveStatus={setActiveStatus}
              />
            ))}
        </>
      )}

      {open && (
        <>
          <UserMessage
            setOpen={setOpen}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            sendMessageHandler={sendMessageHandler}
            messages={messages}
            userId={user._id}
            userData={userData}
            activeStatus={activeStatus}
            scrollRef={scrollRef}
          />
        </>
      )}
    </div>
  );
};

const MessageList = ({
  data,
  index,
  setOpen,
  setCurrentChat,
  me,
  setUserData,
  userData,
  online,
  setActiveStatus,
}) => {
  const [active, setActive] = useState(0);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`?${id}`);
  };

  useEffect(() => {
    console.log(me);
    setActiveStatus(online);
    const shopId = data?.members.find((shop) => shop !== me);

    const getUser = async () => {
      try {
        const res = await axios.get(`${server}/shop/shop-info/${shopId}`);
        //   console.log(res.data)
        setUser(res.data.shop);
        setUserData(res.data.shop)
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [me, data, setUserData, setActiveStatus, online]);

  
  return (
    <div
      className={`w-full flex p-2 px-3 ${
        active === index ? "bg-purple-100" : "bg-transparent"
      } hover:bg-purple-300 bg-purple-100 cursor-pointer`}
      onClick={(e) =>
        setActive(index) ||
        handleClick(data?._id) ||
        setOpen(true) ||
        setCurrentChat(data) ||
        setUserData(data)||
        setActiveStatus(online)
      }
    >
      <div className="relative">
        <img
          src={`${backend_url}/${user?.avatar}`}
          className="w-[50px] h-[50px] rounded-full"
          alt=""
        />
        {online ? (
          <div className="absolute top-[2px] right-[2px] w-[12px] h-[12px] bg-purple-500 rounded-full" />
        ) : null}
      </div>
      <div className="pl-3">
        <h1 className="text-[18px]">{user?.name}</h1>
        <p className="text-[16px] text-[#484747fa]">
          {data?.lastMessageId !== user?._id
            ? "You: "
            : user?.name.split(" ")[0] + ": "}{" "}
          {data?.lastMessage.slice(0, 30)}...
        </p>
      </div>
    </div>
  );
};

const UserMessage = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  userId,
  userData,
  activeStatus,
  scrollRef,
}) => {
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ beahaviour: "smooth" });
  }, [messages, scrollRef]);
  return (
    <div className="w-full min-h-full flex flex-col justify-between">
      {/* message header */}
      <div className="w-full flex py-3 items-center justify-between shadow bg-purple-100 p-2">
        <div className="flex">
          <img
            src={`${backend_url}/${userData?.avatar}`}
            className="w-[60px] h-[60px] rounded-full"
            alt=""
          />
          <div className="p-3">
            <h1 className="text-[18px] font-[600]">
              {userData?.name}
            </h1>
            <h1 className="text-[14px] text-[#8c8c8c]">
              {activeStatus ? "active now" : ""}
            </h1>
          </div>
        </div>
        <AiOutlineArrowRight
          size={25}
          className=" cursor-pointer"
          onClick={() => setOpen(false)}
        />
      </div>
      {/* display message */}
      <div className="px-2 h-[57vh] overflow-y-auto ">
        {messages &&
          messages.map((item, index) => (
            <>
              <div
                key={index}
                className={`flex w-full my-2 ${
                  item.sender === userId ? "justify-end" : "justify-start"
                }`}
                ref={scrollRef}
              >
                {item.sender !== userId && (
                  <img
                    src={`${backend_url}/${userData?.avatar}`}
                    className="w-[40px] h-[40px] rounded-full mr-3"
                    alt=""
                  />
                )}
                <div
                  className={`${
                    item.text.length > 60 ? "w-[25%]" : "w-max"
                  } p-2 rounded ${
                    item.sender === userId ? "bg-purple-600" : "bg-slate-400"
                  } text-white h-min`}
                >
                  <p className="">{item.text}</p>
                  <p className="text-[10px] text-end">
                    {format(item.createdAt)}
                  </p>
                </div>
              </div>
              {/* <div className="flex w-full justify-end my-2">
                  <div className="w-max p-2 rounded bg-purple-400 h-min">
                    <p className="text-white">Hey!</p>
                  </div>
                </div> */}
            </>
          ))}
      </div>
      {/* send message */}
      <form
        className="p-3 relative w-full flex justify-between items-center border-t-2 bg-purple-100"
        onSubmit={sendMessageHandler}
      >
        <div className="w-[3%]">
          <MdOutlineImage
            size={20}
            className="cursor-pointer hover:text-purple-600"
          />
        </div>
        <div className="w-[97%]">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            required
            placeholder="Enter your message..."
            className={`border w-full p-2 hover:border-purple-600 rounded-md`}
          />
          <input type="submit" value="Send" className="hidden" id="send" />
          <label htmlFor="send">
            <AiOutlineSend
              size={20}
              className="absolute top-6 right-4 cursor-pointer hover:text-purple-600"
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default UserInbox;
