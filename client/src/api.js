import axios from 'axios'

const client = new axios.create({
    baseURL: 'http://localhost:5000/',
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Contetnt-Type': 'multipart/form-data'
    },
})

const download = new axios.create({
    baseURL: 'http://localhost:5000/',
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Contetnt-Type': 'multipart/form-data'
    },
    responseType: 'blob'
})

export const uselogin = async (username, password) => {
    const uselogin = await client.post('/auth', { username: username, password: password })

    if (uselogin.data.status == 200) {
        return uselogin.data
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

export const fileDelete = async (flname) => {
    const fileDelete = await client.post('/delete', { fl: flname })
    if (fileDelete.data.status == 200) {
        return fileDelete.data
    } else {
        return false
    }
}

export const downLoad = async (flName) => {
    const fileDownload = await download.post('/download', { fl: flName })
    const fetchedFile = new File([fileDownload.data], flName);
    const a = document.createElement('a');
    a.download = flName;
    const blob = new Blob([fetchedFile]);
    a.href = URL.createObjectURL(blob);
    a.addEventListener('click', (e) => {
        setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
    });
    a.click();
}