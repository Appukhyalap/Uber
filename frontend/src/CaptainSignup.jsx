import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const CaptainSignup = () => {

    const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [firstName, setFirstName] = useState('');
        const [lastName, setLastName] = useState('');
        const [userData, setUserData] = useState({});
    
        const submitHandler = (e) => {
            e.preventDefault();
            console.log(email,password,firstName,lastName);
    
            setUserData({
                fullName: {
                    firstName,
                    lastName
                },
                email,
                password
            });

            setEmail('');
            setPassword('');
            setFirstName('');
            setLastName('');
        }
    
        useEffect(() => {
            console.log("userData" , userData);
        } , [userData]);
    

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className="w-20 mb-5" src="https://imgs.search.brave.com/cykZ27VRScThHwy8RGxrj9c1g3kAPOiXNfIPS4mdXeU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1FbWJs/ZW0tNzAweDM5NC5w/bmc" alt="" />
                <form
                    onSubmit={(e) => {
                        submitHandler(e)
                    }}
                    action="">
                    <h3 className='mb-2 text-lg w-full font-medium'>What's our Captain's name</h3>
                    <div className='flex gap-4 mb-5'>
                        <input
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value);
                            }}
                            className='bg-[#eeeeee] w-1/2 border rounded px-4 py-2  text-lg placeholder:text-lg' type="text" placeholder='First name' />

                        <input required
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value);
                            }}
                            className='bg-[#eeeeee]  w-1/2 border rounded px-4 py-2  text-lg placeholder:text-lg' type="text" placeholder='last name' />

                    </div>
                    <h3 className='mb-2 text-lg font-medium'>What's our Captain's email</h3>
                    <input required
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        className='bg-[#eeeeee] mb-6 border rounded px-4 py-2 w-full text-lg placeholder:text-lg' type="email" placeholder='email@example.com' />
                    <h3 className='mb-2 text-lg font-medium'> Enter Password</h3>
                    <input
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        className='bg-[#eeeeee] mb-6 border rounded px-4 py-2 w-full text-lg placeholder:text-base' type="password" placeholder='password' />
                    <button className='bg-[#111] text-white font-semibold mb-3 border rounded px-4 py-2 w-full text-lg placeholder:text-base'>
                        Login
                    </button>
                </form>
                <p className='text-center'>Already have an Account?  <Link to="/captain-login" className='text-blue-600'>Login here</Link></p>
            </div>
            <div>
                <p className='text-[12px]'>This site is protected by  reCAPTCHA and the <span className='underline font-semibold'>Google Privacy Policy</span> and <span className='underline font-semibold'>Terms of Services</span> apply
                </p>
            </div>
    </div>
  )
}

export default CaptainSignup