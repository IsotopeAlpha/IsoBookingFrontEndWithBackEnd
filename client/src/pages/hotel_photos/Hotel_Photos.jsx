import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../hotel_photos/hotel_photos.css'

export default function HotelPhotos() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const id = location.pathname.split("/")[2];

    const previewFile = (files) => {
        for (let i = 0; i < files.length; i++) {
            let reader = new FileReader();
            reader.readAsDataURL(files[i]);
            reader.onload = () => {
                setImages((oldState) => [...oldState, reader.result])
            };
        }
    };

    const handleImage = (e) => {
        const files = e.target.files;
        console.log(files)
        previewFile(files)
    }

    const handleUpload = () => {
        setLoading(true);
        const data = { images: images };

        axios.put(`http://localhost:8000/api/hotels/upload/${id}`, data).then((res) => {
            setLoading(false)
            if (res.status === 200) {
                console.log(res.data)
                Swal.fire(
                    'Upload',
                    res.data.msg,
                    'success'
                )
            }
            else {
                Swal.fire(
                    'Upload',
                    res.data.msg,
                    'error'
                )
            }
        }).catch((err) => {
            console.log(err)
            setLoading(false)
            Swal.fire(
                'Upload',
                "Opps something went wrong",
                'error'
            )
        });
    }

    return (
        <div className='pho'>
            <div className='img-container'>
                {images.length < 1 ? <div className='img'></div> :
                    images.map((image, index) => <img key={index} src={image} alt=" Profile pic" className='img' />)}
                <input type="file" onChange={handleImage} multiple={true} />
            </div>
            <button disabled={loading} onClick={handleUpload}>{loading ? "Loading..." : "Upload"}</button>
        </div>
    )
}
