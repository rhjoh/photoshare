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
    });
    console.log(props.testState);
    props.setTestState(!props.testState);
    console.log(props);
  };

  function FileMetaInfo(props) {
    console.log(
      "File meta info props: " + JSON.stringify(props.commonProps[0].title)
    );
    return <p>File meta info</p>;
  }

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
          {selectedFile ? <FileMetaInfo commonProps={props.photoData} /> : null}
        {/* Need to change the props above back to selected file if we want to show the size of the selected file.  */}
        </>
      </div>
    </div>
  );
}

export default UploadContainer;
