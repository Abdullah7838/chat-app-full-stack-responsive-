import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Chat from './Chat';
import { MainContext } from './context/context';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Home() {
  const navigate = useNavigate();
  navigate('/world');
  const [search, setSearch] = useState('');
  const [match, setMatch] = useState(null);
  const [error, setError] = useState('');
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState(null);
  const [activeContactId, setActiveContactId] = useState(null);
  const { setID, islogin } = useContext(MainContext);
  const [div, setDiv] = useState('hidden');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      const savedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
      setContacts(savedContacts);
    } catch (e) {
      console.error('Failed to load contacts from localStorage:', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    } catch (e) {
      console.error('Failed to save contacts to localStorage:', e);
    }
  }, [contacts]);

  const SearchHandler = async (e) => {
    const query = e.target.value;
    setSearch(query);

    if (!query) {
      setMatch(null);
      setError('');
      setNewContact(null);
      setDiv('hidden');
      return;
    }

    setIsLoading(true);
    setDiv('');

    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/users');
      const data = res.data;

      const foundMatch = data.find(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );

      if (foundMatch) {
        setMatch(foundMatch);
        setError('');
        setNewContact(foundMatch);
      } else {
        setMatch(null);
        setError('Not Found');
        setNewContact(null);
      }
    } catch (err) {
      console.error('Search request failed:', err);
      setMatch(null);
      setError('Server Error');
      setNewContact(null);
    } finally {
      setIsLoading(false);
    }
  };

  const AddContactHandler = () => {
    if (newContact && !contacts.some(contact => contact.id === newContact.id)) {
      setContacts(prevContacts => [...prevContacts, newContact]);
      setNewContact(null);
      setSearch('');
      setDiv('hidden');
    }
  };

  const ChatLinkHandler = (contactId) => {
    setActiveContactId(contactId);
    setID(contactId);
  };
  const GoTOWorldChatHandler=async()=>{
  navigate('/world')
  }
  return (
    <>
      {islogin ? (
        <div>
          <div className='xs:ml-0 xs:mr-0 sm:ml-0 sm:mr-0 md:ml-0 md:mr-0 lg:ml-40 lg:mr-40'>
            <div className='flex justify-center text-center text-blue-700 text-4xl'>Chatter</div>
            <div className='grid grid-cols-4 gap-4 bg-blue-950 p-4 w-auto rounded-md'>
              <div className='text-center col-span-1 overflow-hidden'>
                <p className='text-red-700 font-medium text-xl bg-blue-200 rounded-md p-1'>Your Chats</p>
                <div className='grid grid-cols-1'>
                  <p className='text-white mt-4 flex justify-center'>Add New Person</p>
                  <input
                    onChange={SearchHandler}
                    value={search}
                    type='text'
                    className='mt-2 p-2 rounded-md text-white bg-black'
                    placeholder='search here..'
                  />
                  <div
                    onClick={AddContactHandler}
                    className={`${div} cursor-pointer relative grid grid-cols-2 bg-white text-black mt-1 rounded-md p-1 font-medium`}>
                    <img
                      className='w-8'
                      alt=''
                      src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
                    />
                    <div
                      className='absolute left-12 mt-2 cursor-pointer'>
                      {isLoading ? (
                        <p>Loading...</p>
                      ) : (
                        match ? <p>{match.name}</p> : <p>{error}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className='text-white text-xl font-bold mb-2 mt-4'>Your Contacts</div>
                <div className='grid grid-cols-1 gap-4 overflow-y-auto' style={{ maxHeight: '400px' }}>
                  <button
                  onClick={GoTOWorldChatHandler}
                   className='bg-green-600 p-4 rounded-md text-lg font-bold text-white focus:bg-green-800'>
                    Chat with world</button>
                  {contacts.map(contact => (
                    <div
                      key={contact.id}
                      onClick={() => ChatLinkHandler(contact.id)}
                      className={`flex items-center p-2 rounded-md cursor-pointer ${activeContactId === contact.id ? 'bg-blue-600' : 'bg-black'}`}>
                      <img
                        src={contact.img}
                        alt={contact.name}
                        className='w-12 h-12 rounded-full'
                      />
                      <div className='ml-2'>
                        <p className='text-sky-400'>{contact.name}</p>
                        <p className='text-cyan-200'>
                          {contact.message ? (contact.message.slice(0, 12) + "...") : "No Message"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                </div>
                <div className='text-center col-span-3 bg-blue-900'>
                  <p className='text-red-700 font-medium text-xl bg-blue-200 rounded-md p-1'>Live Chat</p>
                  <Chat />
                </div>
              </div>
            </div>
          </div>
          ):(
          <div><div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="p-14 bg-white rounded-lg shadow-lg text-center max-w-md">
              <h2 className="text-3xl font-bold text-blue-700 mb-4">Welcome to Chatter</h2>
              <p className="mb-4 text-green-900 font-bold">Login to start chatting with the World.</p>
              <div className='grid grid-cols-1'>
                <Link to='/signup' className="mb-1px-6 py-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
                  Create Account
                </Link>
                <p className='text-xl  text-black'>OR</p>
                <Link to='/login' className="mt-2 px-6 py-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
                  Login
                </Link>
              </div>
            </div>
          </div></div>
  )}
        </>
      );
}

export default Home;
