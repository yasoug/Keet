import { useState } from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const AuthModal = ({ setshowModal, IsSignUp }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const [error, setError] = useState(null)
    const [spin,setSpin] = useState(false)
   

    const navigate = useNavigate()


    const handleClick = () => {
        setshowModal(false)
    }

    const handleSubmit = async (e) => {
        /* putting a condition on the account submit */
        e.preventDefault()
        try {
            setSpin(true)
            if (IsSignUp && (password !== confirmPassword)) {
                setError('Passwords need to match')
                return
            }
            const response = await axios.post(`http://localhost:8000/${IsSignUp ? 'signup' : 'login'}`, { email, password });
             console.log(response)
             console.log(response.data.token)
            localStorage.setItem('AuthToken', response.data.token);
            localStorage.setItem('user',response.data.user_id)

            const success = response.status === 201

            if (success && IsSignUp) navigate('/Onboarding')
            if (success && !IsSignUp) navigate('/Home')
        }
        catch (error) {
            console.error("Authentication failed:", error.message);
            setError("Authentication failed. Please check your credentials.");
        }

        finally{
              setSpin(false)
        }
    }
    
    return (
        <div className="auth-modal">
            <button className="close-icon" onClick={handleClick}>⮾</button>
            <h2 className="ml-16" >{IsSignUp ? 'SignUp' : 'LOG IN'}</h2>
           { IsSignUp ? <p>By Signing Up, you agree to our terms. Learn how we process your data in our Privacy Policy and Cookie Policy.</p>: <p>Welcome back! Log in to find your purrfect match </p> }
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {IsSignUp && <input
                    type="password"
                    id="password-check"
                    name="password-check"
                    placeholder="confirm password"
                    required={true}
                    onChange={(e) => setconfirmPassword(e.target.value)}
                />}
                <input className="secondary-button" type="submit" />
                <p>{error}</p>
            </form>
            <hr />
            <h2>GET THE APP</h2>
        </div>
    );
}

export default AuthModal
