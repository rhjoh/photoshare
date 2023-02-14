import "./thumbs_list.css";
import UploadContainer from "./upload_container";
import EditContainer from "./edit_container";
import { useEffect, useState } from "react";

function ThumbPic(props) {
  const [optionsClicked, setOptionsClicked] = useState(false);

  const editClicked = (common) => {
    console.log("Edit clicked");
    console.log(common);
    props.setEditPhotoObject(common);
  };

  return (
    <div className="thumbnail-container">
      <img
        src={`http://localhost:8000/photos/${props.commonProps.filename}`}
        alt="alt_text"
      ></img>
      <p className="p-left">{props.commonProps.title}</p>
      <p
        className="p-right"
        id="optionsButton"
        onClick={() => setOptionsClicked(!optionsClicked)}
      >
        Options
      </p>
      <div
        className="thumbnail-dropdown"
        id="optionsInterface"
        style={
          optionsClicked ? { visibility: "visible" } : { visibility: "hidden" }
        }
        onMouseLeave={() => setOptionsClicked(!optionsClicked)}
      >
        <button
          style={{ width: "inherit" }}
          onClick={() => editClicked(props.commonProps)}
        >
          Edit
        </button>
        <button style={{ width: "inherit" }}>Delete</button>
      </div>
    </div>
  );
}

function ThumbsList() {
  const [testState, setTestState] = useState(false);
  const [photoData, setPhotoData] = useState([]);
  const [editPhotoObject, setEditPhotoObject] = useState({});

  useEffect(() => {
    fetch("http://localhost:8000/photos")
      .then((response) => response.json())
      .then((json) => {
        setPhotoData(json);
      });
  }, [testState]);

  return (
    <div className="thumbs_main">
      {photoData.map((item, key) => (
        <ThumbPic
          commonProps={item}
          key={key}
          editPhotoObject={editPhotoObject}
          setEditPhotoObject={setEditPhotoObject}
        />
      ))}
      <UploadContainer
        testState={testState}
        setTestState={setTestState}
        photoData={photoData}
      />
      <EditContainer editPhotoObject={editPhotoObject} />
    </div>
  );
}

export default ThumbsList;
