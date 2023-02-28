import React, { useEffect, useState, useRef } from 'react'
import Cookies from 'js-cookie'
import { uselogin, uselogout, fileUpload } from '../api'
import FilesComp from './FilesComp'

const Home = () => {

    const ref = useRef();

    const [cookie, setcookie] = useState(false)
    const [username, setusername] = useState()
    const [password, setpassword] = useState()
    const [addFile, setaddFile] = useState()
    const [FileArray, setFileArray] = useState(JSON.parse(localStorage.getItem('file')))

    //Check if user is logged in
    useEffect(() => {
        if (Cookies.get('token')) {
            setcookie(true)
        } else {
            setcookie(false)
        }
    }, [])

    useEffect(() => {
        if (FileArray.length > 0) {
            localStorage.setItem('file', JSON.stringify(FileArray))
        }

    }, [FileArray])


    //logout user
    const logout = async () => {
        const logout = await uselogout()
        if (logout) {
            setcookie(false)
            localStorage.removeItem('file')
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
                setFileArray(UserLog.User.files)
            }
        }
    }

    //submitFile 
    const fileSubmit = async () => {
        if (addFile) {
            const formData = new FormData();
            formData.append("file", addFile);
            const UserLog = await fileUpload(formData)
            setFileArray(UserLog.User.files)
            ref.current.value = ""
            setaddFile('')
        }
    }

    return (
        <div className='container'>
            <div className='py-3'>
                <div className="text-center">Mobigic Task</div>
            </div>
            <div className='p-4 row'>
                <span className='float-start col-sm-6'>
                    {cookie ?
                        <span className='row'>
                            <span className='col-sm-8'>
                                <input type="file" ref={ref} name='fileupload' className="form-control" onChange={(e) => setaddFile(e.target.files[0])} />
                            </span>
                            <span className='col-sm-4 '>
                                <button className='btn btn-outline-primary float-start' disabled={addFile ? false : true} onClick={() => fileSubmit()} >Save</button>
                            </span>

                        </span>
                        :
                        <>
                            Please login no need to register
                            <input type='text' placeholder='Enter Username' className='form-control py-2 my-2' value={username} onChange={(e) => setusername(e.target.value.trim())} />
                            <input type='text' placeholder='Enter Password' className='form-control py-2 my-2' value={password} onChange={(e) => setpassword(e.target.value.trim())} />
                        </>
                    }

                </span>
                <span className='col-sm-6'>
                    <button className='btn btn-outline-primary float-end' onClick={() => cookie ? logout() : login()} >{cookie ? "Logout" : "Login"}</button>
                </span>
            </div>
            {cookie && <div className='my-5'>
                <FilesComp FileArray={FileArray} setFileArray={setFileArray} />
            </div>}
        </div>
    )
}

export default Home