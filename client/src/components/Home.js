import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { uselogin, uselogout, fileUpload } from '../api'
import FilesComp from './FilesComp'

const Home = () => {

    const [cookie, setcookie] = useState(false)
    const [username, setusername] = useState()
    const [password, setpassword] = useState()
    const [addFile, setaddFile] = useState()
    const [FileArray, setFileArray] = useState([])

    //Check if user is logged in
    useEffect(() => {
        if (Cookies.get('token')) {
            setcookie(true)
            setFileArray(JSON.parse(localStorage.getItem('files')))
        } else {
            setcookie(false)
        }

    }, [])

    //logout user
    const logout = async () => {
        const logout = await uselogout()
        if (logout) {
            setcookie(false)
            setusername('')
            setpassword('')
        }
    }

    //login user
    const login = async () => {
        if (username && password) {
            const UserLog = await uselogin(username, password)
            if (UserLog) {
                setcookie(true)

            }
        }
    }

    //submitFile 
    const fileSubmit = async () => {
        if (addFile) {
            const formData = new FormData();
            formData.append("file", addFile);
            const UserLog = await fileUpload(formData)
            localStorage.setItem('files', JSON.stringify(UserLog.User.files))
            setFileArray(UserLog.User.files)
        }
    }

    return (
        <div className='container'>
            <div className='py-3'>
                <div className="text-center">Mobigic</div>
            </div>
            <div className='p-4'>
                <span className='w-20 float-start'>
                    {cookie ?
                        <span className='d-flex'>
                            <input type="file" className="form-control mx-2" onChange={(e) => setaddFile(e.target.files[0])} />
                            <button className='btn btn-outline-primary' disabled={addFile ? false : true} onClick={() => fileSubmit()} >Save</button>
                        </span>
                        :
                        <>
                            Please login no need to register
                            <input type='text' placeholder='Enter Username' className='form-control py-2 my-2' value={username} onChange={(e) => setusername(e.target.value.trim())} />
                            <input type='text' placeholder='Enter Password' className='form-control py-2 my-2' value={password} onChange={(e) => setpassword(e.target.value.trim())} />
                        </>
                    }

                </span>
                <span className='float-end '>
                    <button className='btn btn-outline-primary' onClick={() => cookie ? logout() : login()} >{cookie ? "Logout" : "Login"}</button>
                </span>
            </div>
            {cookie && <div className='my-5 border'>
                <FilesComp FileArray={FileArray} />
            </div>}
        </div>
    )
}

export default Home