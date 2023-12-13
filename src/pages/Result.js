import React, { useState, useEffect, useRef } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'

const Result = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const [chat, setChat] = useState([]);
  const [chatid, setChatId] = useState([]);
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [load, setload] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [lastMesssage, setlastMesssage] = useState(null);
  const username = process.env.REACT_APP_USERNAME;
  const password = process.env.REACT_APP_PASSWORD;
  const [Added, setAdded] = useState(0);
  const [removeMessage, setRemoveMessage] = useState(false);
  const basicAuth = 'Basic ' + btoa(username + ':' + password);
  const chatContainerRef = useRef();


  // const TypingEffect = ({ text, speed = 50 }) => {
  //   console.log('text t', text.index+1, messages?.length-1)
  //   const [visibleText, setVisibleText] = useState('');

  //   useEffect(() => {
  //     let index = 0;

  //     const typingInterval = setInterval(() => {
  //       setVisibleText((prevText) => {
  //         const nextChar = text.message.charAt(index);
  //         index += 1;
  //         return prevText + nextChar;
  //       });

  //       if (index === text.message.length) {
  //         clearInterval(typingInterval);
  //       }
  //     }, speed);

  //     return () => clearInterval(typingInterval);
  //   }, [text.message, speed]);

  //   return <p className={`font-size-16 mb-4 ${load && text.index+1==messages?.length-1?"answer-text":""}`}>{visibleText}</p>;
  // };

  const fetchMessages = async () => {
    try {
      
      setload(true);
      // Fetch messages for the specified chatId
      const response = await axios.get(`/api/v1/chats/${chatId}/messages`, {
        headers: {
          Authorization: basicAuth,
          'Content-Type': 'application/json',
        },
      });
      console.log("fetch", response,)

      if (response?.data) {
        setMessages(response?.data);
        // const lastMessage = response?.data[response?.data - 1];
        // console.log("=====>", lastMessage)
      } else {
        console.error('Error fetching messages:', response.statusText);
      }

      setload(false);
    } catch (error) {
      console.error('An error occurred while fetching messages:', error);
      setload(false);
    }
  };
  useEffect(() => {
    setlastMesssage(messages[messages?.length - 1])

  }, [messages])

  console.log("setlastMesssage", lastMesssage?.message)
  const sendMessage = async () => {
    try {
    console.log("=====>",`Bearer ${username}:${password}`);

      setRemoveMessage(true)
      setload(true);

      setMessages((prev) => [...prev, { role: 'user', message: userInput }, { role: 'assistant', message: "" }]);
      console.log("sending message to chat bot", chatId, userInput);
      // Post a new message to the chat
      const response = await axios.post(`/api/v1/chats/${chatId}/messages`, {
        message: userInput,
      }, {
        headers: {
          Authorization: basicAuth,
          'Content-Type': 'application/json',
        },
      });
      setUserInput("")
      console.log("send", response.data)
      if (response.data) {
        console.log("response data of messge", Added, response.data);
        // Update the messages with the new message
        setAdded((prev) => prev + 1)
        setMessages((prev) => [...prev, response.data]);
      } else {
        console.error('Error sending message:', response.statusText);
      }

      fetchMessages();


    } catch (error) {
      console.error('An error occurred while sending the message:', error);
      setload(false);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      sendMessage();
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [chatId]);

  useEffect(() => {
    setTimeout(() => {
      console.log("=====>",`Bearer ${username}:${password}`);

      fetchMessages();
    }, 2000)

  }, [Added])

  const createNewChat = async () => {
    console.log("=====>",`Bearer ${username}:${password}`);
    try {
      setload(true);

      const response = await axios.post(
        '/api/v1/chats',
        {
          kb: 'wellspring-live',
          method: 'gpt35-chat-5-refs',
          title: 'Chat 1',
          message: "Hi",
        },
        {
          headers: {
            Authorization: `Bearer ${username}:${password}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data) {
        // Save the chat data to local storage
        const savedChats = JSON.parse(localStorage.getItem('chats')) || [];
        const updatedChats = [...savedChats, response.data];
        localStorage.setItem('chats', JSON.stringify(updatedChats));
        setChat(updatedChats);
        navigate(`/chat/${response.data.chatid}`);
      } else {
        console.error('Error creating new chat:', response.statusText);
      }
      setload(false);
    } catch (error) {
      console.error('An error occurred while creating a new chat:', error.response);
      setload(false);
    }
  };

  useEffect(() => {
    const savedChats = JSON.parse(localStorage.getItem('chats')) || [];
    setChat(savedChats);
  }, []);


  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000); // Reset copied state after 3 seconds
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  const handleShareText = (text) => {
    if (navigator.share) {
      navigator.share({
        title: 'Chat Message',
        text: text,
      })
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      console.warn('Web Share API not supported on this browser');
    }
  };

  const Links = [
    {
      id: 1,
      name: 'Home',
    },
    {
      id: 2,
      name: 'Discover',
    },
    {
      id: 3,
      name: 'Library',
    }
  ]
  const Popular_Questions = [
    {
      id: 1,
      name: 'Your question goes here, this is just a placeholder text?',
    },
    {
      id: 2,
      name: 'Your question goes here, this is just a placeholder text?',
    },
    {
      id: 3,
      name: 'Your question goes here, this is just a placeholder text?',
    },
    {
      id: 4,
      name: 'Your question goes here, this is just a placeholder text?',
    }
  ]
  const Sources_Links = [
    {
      id: 1,
      name: 'https://example.com/books/balanc',
    },
    {
      id: 2,
      name: 'https://example.com/books/balanc',
    },
    {
      id: 3,
      name: 'https://example.com/books/balanc',
    },
  ]

  console.log('chat', chat)


  const [displayText, setDisplayText] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    if (load && messages?.length > 0) {
      // const lastMessage = messages[messages.length - 1];

      // console.log(lastMessage, "lastMessage")
      const words = lastMesssage?.message?.split(' ');

      if (typingIndex < words?.length) {
        const newTimeoutId = setTimeout(() => {
          setDisplayText(lastMesssage?.message);
          setTypingIndex((prevIndex) => prevIndex + 1);
        }, 50);
        setTimeoutId(newTimeoutId);
      }
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [load, typingIndex, messages, timeoutId]);

  return (
    <>

      <section className="wh-chat px-md-5 px-2 py-5">
        <div className="d-flex flex-wrap position-relative gap-3">
          <div className="column-1" >
            <div className="wh-sidebar wh-white-bg wh-radius p-3">
              <img className="mx-auto d-block" src="../assets/images/logo.svg" alt="" width="112" />
              <ul className="list-unstyled wh-lisks-list">
                {Links.map((l) => (
                  <li key={l}><a href="" onClick={() => navigate(`/${l.name}`)}>{l.name} <i class="bi bi-arrow-right"></i></a></li>
                ))}
              </ul>

              <ul className="list-unstyled wh-lisks-list">
                <li className="active">
                  <a className="cursor-pointer" onClick={createNewChat}>New Chat <i className="bi bi-pencil-square"></i></a>
                </li>
                {chat.map((chat) => (
                  <li key={chat.chatid}>
                    <a href={`/chat/${chat.chatid}`}>
                      {chat.chatid} <i className="bi bi-pencil-square"></i>
                    </a>
                  </li>
                ))}
              </ul>

              <div>
                <div className="d-flex justify-content-between align-items-center wh-hover-icon px-2 ">
                  <div className="d-flex gap-2 align-items-center ">
                    <img className="" src="../assets/images/user-image.svg" alt="" width="50" />
                    <div className="mx-1">
                      <p className="font-size-16 mb-0">John Doe</p>
                      <p className="font-size-10 mb-0" style={{ color: '#757575' }}>User</p>
                    </div>
                  </div>
                  <i class="bi bi-gear"></i>
                </div>
                <div className="w-75 border-top mx-auto d-block wh-border-color my-4"></div>
                <p className="text-center font-size-10">© Copyright 2023, All Rights Reserved.</p>
              </div>
            </div>
          </div>
          <div className="column-2 position-relative px-3">

            <div ref={chatContainerRef} className={`chat-scrolling ${messages?.length > 1 ? 'more-scrolling' : ''}`} id="chatContainer">
              {messages?.length > 0 && messages.map((message, index) => {
                // console.log('message.index==messages?.length-1', message.index,messages?.length,message.index==messages?.length)
                return (
                  <>
                    {message.role === 'user' && (
                      <>
                        <h2 className="fw-semibold wh-gradient-text">Question</h2>
                        <h1 className="fw-semibold mb-5">{message?.message}</h1>
                      </>
                    )}
                    {message.role === 'assistant' && (
                      <>
                        <div ref={(el) => { if (el && index === messages?.length - 1) { el.scrollIntoView({ behavior: 'smooth', block: 'end' }); } }} key={index}>
                          <h2 className="fw-semibold wh-gradient-text">Answer</h2>
                          <div className={load && message.index == messages?.length && 'typing-message'}>
                            {load && !message?.message?.length ? (
                              <p className="font-size-16 mb-4 answer-text">AI typing...</p>
                            ) : (
                              <p className={`font-size-16 mb-4 ${message.index == messages?.length && "answer-text"}`}>
                                {/* {message?.message} */}
                                {index === messages?.length - 1 ? lastMesssage?.message : message?.message}
                              </p>
                              // <TypingEffect text={message} />
                            )}
                            {/* {lastMesssage?.message} */}
                          </div>
                          {/* <p className="font-size-16 mb-4 answer-text">{message.message}</p> */}
                          <div className="row mb-4">
                            <div className="col-md-6 d-flex gap-2">
                              <a className="btn wh-button" href="javascript:void(0)" onClick={() => handleShareText(message.message)} role="button">
                                <i className="bi bi-share"></i> Share
                              </a>
                              <a className="btn wh-button" href="javascript:void(0)" role="button">
                                <i className="bi bi-repeat"></i> Rewrite
                              </a>
                            </div>
                            <div className="col-md-6 d-flex gap-2 justify-content-end">
                              <a className="btn wh-button wh-button-icon" href="javascript:void(0)" role="button">
                                <i className="bi bi-star"></i>
                              </a>
                              <a className="btn wh-button wh-button-icon" href="javascript:void(0)" role="button">
                                <i className="bi bi-flag"></i>
                              </a>
                              <a className="btn wh-button wh-button-icon" href="javascript:void(0)" onClick={() => handleCopyToClipboard(message.message)} role="button">
                                <i className="bi bi-clipboard"></i>
                              </a>
                            </div>
                          </div>
                          <div className="border-top wh-border-color mb-4"></div>
                        </div>
                      </>
                    )}
                  </>
                )
              })}
            </div>

            <div className="d-flex gap-2 wh-white-bg wh-radius px-3 py-3 wh-search wh-search-result-page">
              <input onChange={(e) => setUserInput(e.target.value)} type="text" name="search" placeholder="Ask anything..." value={removeMessage ? "" : userInput} onKeyDown={handleKeyDown} />
              <button onClick={sendMessage} type="submit"><i class="bi bi-arrow-right-short"></i></button>
            </div>

          </div>

          <div className="column-3">
            <h3 className="fw-semibold mb-4">Sources</h3>
            <div className="row gy-3 gx-3 mb-5">
              {Sources_Links.map((sl) => (
                <div key={sl} className="col-md-12"><a className="wh-pq" href="">{sl.name} <i class="bi bi-arrow-right"></i></a></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Result