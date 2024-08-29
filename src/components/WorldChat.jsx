import React, { useEffect, useRef, useState, useContext } from 'react';
import { IoSend } from "react-icons/io5";
import axios from 'axios';
import { MainContext } from './context/context';
import { Link } from 'react-router-dom';
import Modal from './Modal';

function WorldChat() {
    const { islogin } = useContext(MainContext);
    const [message, setMessage] = useState('');
    const [chats, setChats] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(true); // Set to true to show the modal by default
    const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode
    const endOfMessagesRef = useRef(null); 
    const { id, name, setLogin } = useContext(MainContext);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const res = await axios.get('http://localhost:9000/world');
                const chatArray = res.data.data;
                setChats(chatArray); 
            } catch (error) {
                console.error('Error fetching chats:', error);
            }
        };

        fetchChats();
        const interval = setInterval(fetchChats, 500);
        return () => clearInterval(interval); 
    }, []);

    useEffect(() => {
        if (endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chats]); 

    const WorldChatHandler = async () => {
        try {
            const data = { name, text: message };
            await axios.post('http://localhost:9000/world', data);
            setMessage('');
        } catch (err) {
            console.log(err);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            WorldChatHandler();
        }
    };

    const SignoutHandler = () => {
        setLogin(false);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <>
            {islogin ? (
                <div className={isDarkMode ? 'bg-white text-white' : 'bg-black text-white'}>
                    {/* Modal for Guidelines */}
                    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                        <div className='p-4'>
                            <h2 className='text-xl font-bold mb-2'>Guidelines</h2>
                            <p>Please follow all guidelines:</p>
                            <ul className='list-disc pl-5'>
                                <li>Spammers are Blocked Directly.</li>
                                <li>Chats will be removed after 12 hours to make Server Cool.</li>
                                <li>Everyone is unknown here.</li>
                                <li>All types of chats are allowed here. Don’t be offensive.</li>
                                <li>Take care of your data and privacy. Never share any contact information.</li>
                            </ul>
                        </div>
                    </Modal>

                    <div className="flex flex-col h-screen">
                        {/* Header */}
                        <div className='flex items-center justify-between px-4 py-2'>
                            <div className='flex items-center'>
                                <img
                                    className='w-10 md:w-12 rounded-full'
                                    src='https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png'
                                    alt='profile'
                                />
                                <p className='ml-4 text-sm md:text-base'>{name}</p>
                            </div>
                            <div className='flex items-center'>
                                <button
                                    onClick={SignoutHandler}
                                    className='bg-red-700 font-bold rounded-md px-4 py-2 text-white hover:bg-red-800'>
                                    Sign Out
                                </button>
                                <button
                                    onClick={toggleDarkMode}
                                    className='ml-4 bg-blue-500 font-bold rounded-md px-4 py-2 text-white hover:bg-blue-600'>
                                    {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className='flex-1 overflow-y-auto p-4'>
                            <div className="flex flex-col space-y-2">
                                {chats.map((chat, index) => (
                                    <div key={index} className={`flex ${chat.name === name ? 'justify-start' : 'justify-start'} mb-2`}>
                                        <div className={`p-2 rounded-md ${chat.name === name ? 'bg-green-700' : 'bg-blue-700'}`}>
                                            <p className='font-bold text-xs md:text-sm'>
                                                {chat.name.replace(/@gmail\.com$/, '')}
                                            </p>
                                            <p className='text-xs md:text-sm'>
                                                {chat.text}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                <div ref={endOfMessagesRef} />
                            </div>
                        </div>

                        {/* Send message */}
                        <div className='grid grid-cols-8 p-4'>
                            <div className='col-span-7'>
                                <input
                                    onChange={(e) => setMessage(e.target.value)}
                                    value={message}
                                    onKeyDown={handleKeyDown}
                                    className='rounded-md p-3 w-full border-2 border-blue-500 text-black focus:border-blue-700'
                                    type='text'
                                    placeholder='write message here...'
                                />
                            </div>
                            <div
                                onClick={WorldChatHandler}
                                className='text-blue-700 cursor-pointer col-span-1 ml-2 text-2xl flex justify-center items-center'>
                                <IoSend />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center h-screen bg-gray-100">
                    <div className="p-14 bg-white rounded-lg shadow-lg text-center max-w-md">
                        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4">Welcome to Chatter</h2>
                        <p className="mb-4 text-green-900 font-bold text-sm md:text-base">Login to start chatting with the World.</p>
                        <div className='grid grid-cols-1'>
                            <Link to='/signup' className="mb-1 px-6 py-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
                                Create Account
                            </Link>
                            <p className='text-xl text-black'>OR</p>
                            <Link to='/login' className="mt-2 px-6 py-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default WorldChat;
