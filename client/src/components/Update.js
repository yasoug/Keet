import { useState } from 'react';
import Nav from '../components/design/Nav';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Update = ({update}) => {
  const [formData, setFormData] = useState({
    user_id: localStorage.getItem('user'),
    name: '',
    age: '',
    show_sex: false,
    sex: '',
    sex_interest: '',
    url: '',
    likes: '',
    matches: []
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:8000/user', { formData });
      const success = response.status === 200;
      if (success) 
      {
        update(false)
        navigate('/Home');
      }
    } catch (err) {
      console.log(err);
    }
  
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const name = e.target.name;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <>
      <Nav minimal={true} setshowModal={() => {}} showModal={false} />
      <div className="flex justify-center relative right-6 bottom-2">
      <button onClick={()=>update(false)} className="btn btn-sm btn-circle btn-ghost relative bottom-6 right-12">
        <img src="back.png" alt="return" className='w-4'/>
      </button>
        <div className="bg-white w-80 p-8 rounded-lg shadow-md max-w-md">
          <h2 className="text-2xl font-semibold mb-4">My Cat's Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Cat's name"
                required={true}
                value={formData.name}
                onChange={handleChange}
                className="input-field w-24"
              />
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium">Age</label>
              <input
                id="age"
                type="text"
                name="age"
                placeholder="Cat's age"
                required={true}
                value={formData.age}
                onChange={handleChange}
                className="input-field w-24"
              />
            </div>

            <div>
              <label htmlFor="sex" className="block text-sm font-medium">Sex</label>
              <select
                id="sex"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label htmlFor="interest" className="block text-sm font-medium">Interest</label>
              <select
                id="interest"
                name="sex_interest" 
                value={formData.sex_interest} 
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label htmlFor="about" className="block text-sm font-medium">Likes</label>
              <textarea
                id="about"
                name="likes"
                rows="3"
                placeholder="what your cat likes"
                value={formData.likes}
                onChange={handleChange}
                className="input-field"
              ></textarea>
            </div>

            <div>
              <label htmlFor="url" className="block text-sm font-medium">Profile Photo URL</label>
              <input
                id="url"
                type="url"
                name="url"
                placeholder="Enter URL"
                required={true}
                value={formData.url}
                onChange={handleChange}
                className="input-field"
              />
               {formData.url && (
                <img
                  src={formData.url}
                  alt="profile pic preview"
                  className="mt-2 rounded-md shadow-md"
                  style={{  height: 'auto' }}
                />
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Update Info
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Update; 
