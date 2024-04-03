import { useState } from 'react'
import Nav from '../components/design/Nav'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Onboarding = () => {
  const [Cookies] = useCookies('user')
  const [formData, setFromData] = useState({
    user_id: Cookies.user_id,
    name: '',
    age: '',
    show_sex: false,
    sex: '',
    sex_interest: '',
    url: '',
    likes: '',
    matches: []
  })

  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put('http://localhost:8000/user', { formData })
      const success = response.status === 200
      console.log(response)
      if (success) navigate('/home')
    } catch (err) {
      console.log(err)
    }
  }
  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    const name = e.target.name

    setFromData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
    <>
      <Nav minimal={true} setshowModal={() => {}} showModal={false} />
      <div className="onboarding">
        <h2>CREATE ACCOUNT</h2>

        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="name"
              required={true}
              value={formData.name}
              onChange={handleChange}
            />

            <label htmlFor="Age">Age</label>
            <input
              id="age"
              type="number"
              name="age"
              placeholder="age"
              required={true}
              value={formData.age}
              onChange={handleChange}
            />
            <label>Sex</label>
            <div className="multiple-input-container">
              <input
                id="Male-ID"
                type="radio"
                name="sex"
                value="Male"
                onChange={handleChange}
                checked={formData.sex === 'Male'}
              />
              <label htmlFor="Male-ID">Male</label>
              <input
                id="Female-ID"
                type="radio"
                name="sex"
                value="Female"
                onChange={handleChange}
                checked={formData.sex === 'Female'}
              />
              <label htmlFor="Female-ID">Female</label>
            </div>

            <label htmlFor="show-sex">Show sex on my profile</label>
            <input
              id="show-sex"
              type="checkbox"
              name="show_sex"
              onChange={handleChange}
              checked={formData.show_sex}
            />
            <label>Show Me</label>
            <div className="multiple-input-container">
              <input
                id="Male-ID-interest"
                type='radio'
                name='sex_interest'
                value="Male"
                onChange={handleChange}
                checked={formData.sex_interest === 'Male'}
              />
              <label htmlFor="Male-ID-interest">Male</label>
              <input
                id="Female-ID-interest"
                type='radio'
                name='sex_interest'
                value="Female"
                onChange={handleChange}
                checked={formData.sex_interest === 'Female'}
              />
              <label htmlFor="Female-ID-interest">Female</label>
            </div>
            <label htmlFor='likes'>About me</label>
            <input
              id="likes"
              type="text"
              name="likes"
              required={true}
              placeholder="i like to play"
              value={formData.likes}
              onChange={handleChange}
            />
            <input type="submit" />
          </section>
          <section>
            <label htmlFor="url">Profile Photo</label>
            <input type="url" name="url" id="url" onChange={handleChange} required={true} />
            <div className="photo-container">
              {formData.url && <img src={formData.url} alt="profile pic preview" />}
            </div>
          </section>
        </form>
      </div>
    </>
  )
}

export default Onboarding
