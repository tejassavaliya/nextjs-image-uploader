import { useState } from 'react';
import axios from 'axios';
import ProgressBar from "./ProgressBar";
import Link from "next/link";
import Nav from "./Nav";

function Upload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [completed, setCompleted] = useState(0);
    const [imageUrl, setImageUrl] = useState('');
    const [copySuccess, setCopySuccess] = useState('');
    
    const copyToClipBoard = () => {
        let copyText = document.getElementById("imageUrl");
        let textArea = document.createElement("textarea");
        textArea.value = copyText.textContent;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("Copy");
        textArea.remove();
      };

    const fileSelectedHandler = event => {
        console.log(event.target.files);
        const file = event.target.files[0];
        setSelectedFile(file);
        const previewContainer = document.getElementById('imagePreview');
        const previewImage = previewContainer.querySelector('.image-preview__image');
        const previewDefaultText = previewContainer.querySelector('.image-preview__default-text');

        if( file ) {
            const reader = new FileReader();
            previewDefaultText.style.display = "none";
            previewImage.style.display = "block";

            reader.addEventListener('load', function() {
                previewImage.setAttribute('src', this.result)
            });

            reader.readAsDataURL(file);
        } else {
            resetHandler();
        }

    }

    const fileUploadHandler = event => {
        const fd = new FormData();
        fd.append('file', selectedFile, selectedFile.name);
        fd.append('expires', '1m');
        console.log(event.target.files);
        const config = {
            onUploadProgress: progressEvent =>  { 
                console.log("Upload Progress ", Math.round(progressEvent.loaded / progressEvent.total * 100) + "%") 
                setCompleted(Math.round(progressEvent.loaded / progressEvent.total * 100));
            }
        }
        axios.post('https://api.anonymousfiles.io/', fd,
            config  
        )
        .then(data => {
            console.log(data)
            setImageUrl( data.data.url);
            alert("Upload Successfully ");
        });
       
    };

    const resetHandler = event => {
        const previewContainer = document.getElementById('imagePreview');
        const previewImage = previewContainer.querySelector('.image-preview__image');
        const previewDefaultText = previewContainer.querySelector('.image-preview__default-text');
        
        previewDefaultText.style.display = null;
        previewImage.style.display = null;
        previewImage.setAttribute('src', "");
        setCompleted(0);
    }
    const copyUrlHandler = () => {
        console.log("copy url", imageUrl)
        navigator.clipboard.writeText(imageUrl)
    }
    const copyUrlBtn = () => {
        let btn;
        if(imageUrl) {
            btn = <button onClick={copyUrlHandler}>copy url</button>;
        }
        return btn;
    }

    return (
        <div>
            <Nav />
            <h1>Upload Image</h1>
            <input type="file"
                accept=".jpeg, .png, .jpg, .gif"
                onChange={fileSelectedHandler} />
            <button type="button" onClick={fileUploadHandler}>UPLOAD</button>
            <button type="button" onClick={resetHandler}>RESET</button>
            <div className="image-preview" id="imagePreview">
                <img src="" alt="Image Preview" className="image-preview__image" />
                <span className="image-preview__default-text">Image Preview</span>
            </div>
            <span id="imageUrl">{imageUrl}</span>{copyUrlBtn()}
            <style jsx>
                {`
                    .image-preview {
                        width: 300px;
                        min-height: 100px;
                        border: 2px solid #ddd;
                        margin-top: 15px;

                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-weigth: bold;
                        color: #ccc;
                    }
                    .image-preview__image {
                        display: none;
                        width:100%;

                    }

                `}
            </style>
            <ProgressBar bgcolor={"#6a1b9a"} completed={completed} />

        </div>
    )
}

export default Upload;
