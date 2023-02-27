import React, { useEffect, useState } from 'react'

const FilesComp = (props) => {
    const { FileArray } = props
    return (
        <div className='p-3'>
            {
                FileArray && FileArray.map((value, index) => {
                    return (
                        <div className='py-2' key={index}>
                            {index}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default FilesComp