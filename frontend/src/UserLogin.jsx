import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [userData, setUserData] = useState({});

    
    const submitHandler = (e) => {
        e.preventDefault();
        console.log(email, password);

        setUserData({
            email,
            password,
        });

        setemail("");
        setpassword("");
    }

    useEffect(() => {
        console.log("Updated userData:", userData);
    }, [userData]);

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className="w-16 mb-10" src="https://imgs.search.brave.com/Qytw_NXKyFxwwc0vzLr3hbi8hrXtzDbeh_Ziku74uSI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTcwMHgzOTQucG5n" alt="" />
                <form
                    onSubmit={(e) => {
                        submitHandler(e)
                    }}
                    action="">
                    <h3 className='mb-2 text-lg font-medium'>What's your email</h3>
                    <input required
                        value={email}
                        onChange={(e) => {
                            setemail(e.target.value);
                        }}
                        className='bg-[#eeeeee] mb-7 border rounded px-4 py-2 w-full text-lg placeholder:text-base' type="email" placeholder='email@example.com' />
                    <h3 className='mb-2 text-lg font-medium'> Enter Password</h3>
                    <input
                        value={password}
                        onChange={(e) => {
                            setpassword(e.target.value);
                        }}
                        className='bg-[#eeeeee] mb-7 border rounded px-4 py-2 w-full text-lg placeholder:text-base' type="password" placeholder='password' />
                    <button className='bg-[#111] text-white font-semibold mb-3 border rounded px-4 py-2 w-full text-lg placeholder:text-base'>
                        Login
                    </button>
                </form>
                <p className='text-center'>New here?  <Link to="/signup" className='text-blue-600'>Create New Account</Link></p>
            </div>
            <div>
                <Link to="/captain-login"
                className='bg-[#10b467] flex items-center justify-center text-white font-semibold mb-5 border rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as Captain</Link>
            </div>
        </div>
    )
}

export default UserLogin