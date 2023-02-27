import axios from 'axios'

const client = new axios.create({
    baseURL: 'http://localhost:5000/',
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Contetnt-Type': 'multipart/form-data'
    }
})

export const uselogin = async (username, password) => {
    const uselogin = await client.post('/auth', { username: username, password: password })

    if (uselogin.data.status == 200) {
        return true
    } else {
        return false
    }

}

export const uselogout = async () => {
    const uselogout = await client.post('/logout', {})

    if (uselogout.data.status == 200) {
        return true
    } else {
        return false
    }

}

export const fileUpload = async (formData) => {
    const fileUpload = await client.post('/upload', formData)

    if (fileUpload.data.status == 200) {
        return fileUpload.data
    } else {
        return false
    }
}