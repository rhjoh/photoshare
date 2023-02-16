import "./upload_container.css";
import { useEffect, useState } from "react";
function UploadContainer(props) {
  const [selectedFile, setSelectedFile] = useState();
  const fileSelected = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadButtonClickHandler = (e) => {
    e.preventDefault();
    const uploadBody = new FormData(document.getElementById("newForm"));
    const imageName = document.getElementById("nameField").value;
    uploadBody.append("imageTitle", imageName);
    fetch("http://localhost:8000/upload", {
      method: "POST",
      mode: "no-cors",
      body: uploadBody,
    }).then(() => {
        console.log(props.photoAPICallState);
    props.setPhotoAPICallState(!props.photoAPICallState);
    })
    /* console.log(props.photoAPICallState);
    props.setPhotoAPICallState(!props.photoAPICallState); */
  };

  return (
    <div className="upload-container">
      <form id="newForm" onSubmit={(e) => uploadButtonClickHandler(e)}>
        <input
          type="file"
          id="fileUpload"
          name="fileUpload"
          onChange={fileSelected}
        />
        <input type="text" id="nameField" placeholder="Image name..."></input>
        <button type="submit">Submit</button>
      </form>
      <div className="upload-container-text">
        <>
        </>
      </div>
    </div>
  );
}

export default UploadContainer;
