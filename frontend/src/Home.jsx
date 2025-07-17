import {Link} from 'react-router-dom'
import React, { useContext } from 'react'
import { UserDataContext } from './context/UserContext'

const Home = () => {

    const data = useContext(UserDataContext);

    console.log(data);
    return (
        <div className='bg-cover bg-center bg-no-repeat bg-bottom bg-[url(https://images.unsplash.com/photo-1617479582427-e67ee0e3c0cc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRyYWZmaWMlMjBsaWdodHN8ZW58MHx8MHx8fDA%3D)] h-screen pt-5 flex justify-between flex-col w-full'>
            <img className="w-16 ml-8 " src="https://imgs.search.brave.com/Qytw_NXKyFxwwc0vzLr3hbi8hrXtzDbeh_Ziku74uSI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTcwMHgzOTQucG5n" alt="" />
            <div className='bg-white py-4 pb-7 px-4'>
                <h2 className='text-[30px] font-bold'  >Get started with Uber</h2>
                <Link to="/login" className='flex items-center justify-center w-full  bg-black text-white py-3 mt-6 rounded'>
                    Continue
                </Link>
            </div>
        </div>
    )
}

export default Home