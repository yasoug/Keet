import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../design/Card/Card';
import Update from '../../components/Update'
import { useNavigate } from 'react-router-dom'


const UserHeader = () => {
  const [userData, setUserData] = useState(null);
  const [isUpdate,setUpdate] = useState(false)
  const [res,setRes] = useState(null)
  const onTap = () => {
    console.log('clicked');
    document.getElementById('my_modal_2').showModal();
  };

  useEffect(() => {
    const userId = localStorage.getItem('user');
    console.log(userId)
    if (!userId) return;
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/user?user_id=${userId}`);
        console.log(response)
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [isUpdate]);

  return (
    <div>
      <Card
        media={userData?.url || 'default_profile_url.jpg'}
        title={userData?.name || 'Name'}
        onClick={onTap}
      />

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box bg-white shadow-md rounded-md p-0">
        <form method="dialog">
      <button onClick={()=>setUpdate(false)} className="btn btn-sm btn-circle btn-ghost relative left-60 bottom-1">✕</button>
    </form>
    { !isUpdate && <div>
    <h3 className="font-bold text-lg text-center relative bottom-8  ">{userData?.name || 'Name'}</h3>
          <img src={userData?.url || 'default_profile_url.jpg'} alt="Profile" className="w-32 h-24 rounded-full mx-auto p-0 relative bottom-12" />
          <div className='relative bottom-12'>
          <p className="text-center mb-2">Age: {userData?.age || '-'} year(s) </p>
          <p className="text-center mb-2">Sex: {userData?.sex || '-'}</p>
          <p className="text-center mb-2">Likes: {userData?.likes || '-'}</p>
          <button onClick={()=>{setUpdate(true)}} className=' bg-blue-600 text-white hover:bg-blue-400 font-bold py-1 lg:px-2 relative top-3 rounded-md'>
            Edit Info
          </button>
          </div>
    </div> }
              { isUpdate && <Update update={setUpdate}/>}
        </div>
      </dialog>
    </div>
  );
};

export default UserHeader
