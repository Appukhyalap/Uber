import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [captainData, setcaptainData] = useState({})


    const submitHandler = (e) => {
        e.preventDefault();
        console.log(email, password);

        setcaptainData({
            email,
            password,
        });

        setemail("");
        setpassword("");
    }

    useEffect(() => {
        console.log("Updated captainData:", captainData);
    }, [captainData]);

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className="w-20 mb-5" src="https://imgs.search.brave.com/cykZ27VRScThHwy8RGxrj9c1g3kAPOiXNfIPS4mdXeU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1FbWJs/ZW0tNzAweDM5NC5w/bmc" alt="" />
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
                <p className='text-center'>Join a fleet?  <Link to="/captain-signup" className='text-blue-600'>Register as a Captain</Link></p>
            </div>
            <div>
                <Link to="/login"
                    className='bg-[#d56226] flex items-center justify-center text-white font-semibold mb-5 border rounded px-4 py-2 w-full text-lg placeholder:text-base'>
                    Sign in as User
                </Link>
            </div>
        </div>
    )
}

export default CaptainLogin