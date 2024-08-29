import React, { useEffect, useState, useContext } from 'react';
import { IoSend } from "react-icons/io5";
import axios from 'axios';
import { MainContext } from './context/context';

function Chat() {
    const [data, setData] = useState('');
    const { id } = useContext(MainContext);
    const [message, setMessage] = useState('');    
    useEffect(() => {
        const FindPerson = async () => {
            try {
                const res = await axios.get('https://jsonplaceholder.typicode.com/users');
                const data = res.data;
                const finding = data.find(item => item.id === id);
                if (finding) {
                    setData(finding);
                    console.log(finding);
                } else {
                    setData('No User Found With this ID');
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        FindPerson();
    }, [id]);

    const Messagesent = () => {
        try {
            
            axios.post('http://localhost:9000/chat/send', { message });
        } catch (err) {
            console.log(err);
        }
    };
    console.log(message);

    const messages = [
        { sender: 'him', text: 'His message 1' },
        { sender: 'me', text: 'My message 1' },
        { sender: 'him', text: 'His message 2' },
        { sender: 'me', text: 'My message 2' },
        { sender: 'him', text: 'His message 1' },
        { sender: 'me', text: 'My message 1' },
        { sender: 'him', text: 'His message 2' },
        { sender: 'me', text: 'My message 2' },
        { sender: 'him', text: 'His message 1' },
        { sender: 'me', text: 'My message 1' },
        { sender: 'him', text: 'His message 2' },
        { sender: 'me', text: 'My message 2' }
    ];

    return (
        <div className="h-[500px] flex flex-col">

            {/* User Profile */}
            <div className='bg-black h-13'>
                <div className='ml-4 grid grid-cols-2 relative'>
                    <img
                        className='mt-1 mb-1 bg-no-repeat w-10 rounded-full flex justify-center'
                        src='https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png'
                        alt=''>
                    </img>
                    <p className='absolute left-20 mt-3 text-white flex justify-start'>{data.name}</p>
                </div>
            </div>

            {/* Messages */}
            <div className='flex-1 overflow-y-auto p-4'>
                <div className="flex flex-col space-y-2">
                    {messages.map((message, index) => (
                        <div key={index} className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                            <p className={`p-2 m-2 rounded-md text-white ${message.sender === 'me' ? 'bg-black' : 'bg-green-700'}`}>
                                {message.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Send message */}
            <div className='grid grid-cols-8 p-4'>
                <div className='col-span-7'>
                    <input
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        className='bg-black text-white rounded-md p-3 w-full'
                        type='text'
                        placeholder='write message here...'
                    />
                </div>
                <div 
                    className='cursor-pointer col-span-1 ml-2 text-white text-4xl flex justify-center items-center'>
                    <IoSend />
                </div>
            </div>

        </div>
    );
}

export default Chat;
