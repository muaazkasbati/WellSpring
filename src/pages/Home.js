import React, { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'


const Home = () => {

  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const [initialQuestion, setinitialQuestion] = useState(queryParams.get('question'));
  const [chatsList, setChatsList] = useState([]);
  const [chat, setChat] = useState([]);
  const [chatid, setChatId] = useState([]);
  const [load, setload] = useState(true);
  const [userInput, setUserInput] = useState('');
  const username = process.env.REACT_APP_USERNAME;
  const password = process.env.REACT_APP_PASSWORD;


  const basicAuth = 'Basic ' + btoa(username + ':' + password);
  // console.log("=====>",`Bearer ${username}:${password}`);

  const createNewChat = async () => {
    try {
      setload(true);
      const response = await axios.post(
        'https://newson-health.trainmy.net/api/v1/chats',
        {
          kb: 'wellspring-live',
          method: 'gpt35-chat-5-refs',
          title: 'Chat 1',
          message: "Hi",
        },
        {
          headers: {
            Authorization: basicAuth,
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
        // navigate(`/result/${response.data.chatid}`);
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
    // Retrieve chats from local storage on component mount
    const savedChats = JSON.parse(localStorage.getItem('chats')) || [];
    setChat(savedChats);
  }, []);

  const OpenChat = async (userMessage) => {
    try {
      console.log("11=====>", `Bearer ${username}:${password}`);

      setload(true);
      const response = await axios.post(
        '/api/v1/chats',
        {
          "kb": "wellspring-live",
          "method": "gpt35-chat-5-refs",
          "title": "Chat 1",
          "message": "Hi"
        },
        {
          headers: {
            Authorization: basicAuth,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data, "response")

      if (response.data) {
        setChat([...chat, response.data]);
        setChat((prevChat) => [...prevChat, response.data]);
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

  const handleSearch = () => {
    OpenChat(userInput);
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      handleSearch();
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

  return (
    <>
      {/* {load && <Loader /> } */}
      <section className="wh-home px-md-5 px-2 py-5">
        <div className="d-flex flex-wrap">
          <div className="column-1">
            <div className="wh-sidebar wh-white-bg wh-radius p-3">
              <img className="mx-auto d-block" src="../assets/images/logo.svg" alt="" width="112" />
              <div className="wh-light-bg wh-radius p-3">
                <p className="text-center font-size-14 mb-0">Wellspring AI unlocks the power of domain-specific knowledge within women’s health and menopause care.</p>
              </div>
              <ul className="list-unstyled wh-lisks-list">
                {Links.map((l) => (
                  <li key={l}><a href="">{l.name} <i class="bi bi-arrow-right"></i></a></li>
                ))}
              </ul>
              <div className="wh-light-bg wh-radius p-3">
                <p className="text-center font-size-12 mb-0"><span className="fw-semibold">Disclaimer:</span><br />
                  Information is sourced from NICE, RCOG, MHRA, and other published literature. No warrant is given that the module is free of errors, complete or up-to-date, and no information herein should be considered a substitution for medical expertise, experience and judgement.</p>
              </div>
              {/* <ul className="list-unstyled wh-lisks-list">
              <li className="active">
                <a className="cursor-pointer" onClick={createNewChat}>New Chat <i className="bi bi-pencil-square"></i></a>
              </li>
              {chat.map((chat) => (
                <li key={chat.chatid}>
                  <a href={`/result/${chat.chatid}`}>
                    {chat.chatid} <i className="bi bi-pencil-square"></i>
                  </a>
                </li>
              ))}
            </ul> */}
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
              <div className="w-75 border-top mx-auto d-block wh-border-color"></div>
              <p className="text-center font-size-10">© Copyright 2023, All Rights Reserved.</p>
            </div>
          </div>
          <div className="column-2 align-self-center px-md-5">
            <img className="mx-auto d-block mobile-logo mb-3" src="../assets/images/logo.svg" alt="" width="112" />
            <h1 className="fw-semibold text-center mb-5">How can I assist you today?</h1>
            <div className="d-flex gap-2 wh-white-bg wh-radius px-3 py-3 mb-5 wh-search">
              <input type="text" name="search" onChange={(e) => setUserInput(e.target.value)} placeholder="Ask anything..." id="search" onKeyDown={handleKeyDown} />
              <button type="button" onClick={handleSearch} ><i class="bi bi-arrow-right-short"></i></button>
            </div>
            <div className="w-50 border-top mx-auto d-block wh-border-color mb-4"></div>
            <h2 className="fw-semibold text-center mb-4">Popular Questions</h2>
            <div>
              <div className="row gy-3 gx-3">
                {Popular_Questions.map((pq) => (
                  <div key={pq} className="col-md-6"><a className="wh-pq" href="">{pq.name} <i class="bi bi-arrow-right"></i></a></div>
                ))}
              </div>
            </div>
            <div className="wh-footer-links">
              <ul className="list-unstyled d-flex justify-content-center gap-3 mb-0">
                <li><a href="">Home</a></li>
                <li><a href="">About Us</a></li>
                <li><a href="">Contact Us</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home