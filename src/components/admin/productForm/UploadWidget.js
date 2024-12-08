import React, { useState } from 'react'
import Card from '../../card/Card'
import { AiOutlineCloudUpload } from "react-icons/ai"
import { BsTrash } from "react-icons/bs"
import { toast } from 'react-toastify'

// const cloud_name = process.env.REACT_APP_CLOUD_NAME
const upload_preset = process.env.REACT_APP_UPLOAD_PRESET
const url = "https://api.cloudinary.com/v1_1/exxonmobil/image/upload";

const UploadWidget = ({files, setFiles}) => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [images, setImages] = useState([]);
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);



    const addImages = (e) => {
        const selectedFiles = e.target.files;
        const selectedFilesArray = Array.from(selectedFiles)

        const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file)
        })
        setImages((prevImages) => prevImages.concat(selectedFilesArray))
        setSelectedImages((prevImages) => prevImages.concat(imagesArray))

        e.target.value = ""
    }

    const removeImage = (image) => {
        const imageIndex = selectedImages.indexOf(image)
        setSelectedImages(
            selectedImages.filter((img) => img !== image)
        )
        setImages(
            images.filter((img, index) => index !== imageIndex)
        )
        URL.revokeObjectURL(image);
    };

    const uploadImages = () => {
        setUploading(true)
        let imageUrls = []

        const formData = new FormData()
        for (let i = 0; i < images.length; i++) {
            let file = images[i]
            formData.append("file", file)
            formData.append("upload_preset", upload_preset)
            formData.append("folder", "shopitoApp")

            fetch(url, {
                method : "POST",
                body: formData,
            })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data);
                imageUrls.push(data.secure_url)
                setProgress(imageUrls.length)

                if (imageUrls.length === images.length) {
                    setFiles((prevFiles) => prevFiles.concat(imageUrls))
                    setUploading(false)
                    console.log(files);
                    toast.success("Image upload Complete")
                    setImages([])
                    setSelectedImages([])
                    setProgress(0)
                }
            })
            .catch((error) => {
                setUploading(false)
                toast.error(error.message)
                console.log(error);
            })
        }

    }

  return (
    <div>
        <Card cardClass={"formcard group"}>
            <label className='uploadWidget'>
                <AiOutlineCloudUpload size={35} />
                <br />
                <span>Click to upload up to 5 images</span>
                <input 
                type='file' name='images' onChange={addImages} multiple
                accept='image/png, image/jpeg, image/webp'
                 />
            </label>
            <br />
            { selectedImages.length > 0 && 
                (selectedImages.length > 5 ? (
                    <p className='error'>You can't upload more than 5 images 
                    <br /> 
                    <span>Please remove  <b>{selectedImages.length - 5}</b> of them </span>
                    </p>
                ) : (
                    <div className='--center-all'>
                        <button className="--btn --btn-danger --btn-large" 
                        disabled={uploading}
                        onClick={uploadImages}>
                            {uploading ? `Uploading ${progress} of ${images.length}` : `Upload ${images.length} Image(s)`}
                        </button>
                    </div>
                ))
            }

            {/* view selected images */}
            <div className={selectedImages.length > 0 ? "images" : ""}>
                {selectedImages !== 0 && 
                    selectedImages.map((image, index) => {
                        return (
                            <div key={image} className='image' >
                                <img src={image} alt='productImage' width={200} />
                                <button className="-btn" onClick={() => removeImage(image)}>
                                    <BsTrash size={25} />
                                </button>
                                <p>{index + 1}</p>
                            </div>
                        )
                    })
                }
            </div>
        </Card>
    </div>
  )
}

export default UploadWidget