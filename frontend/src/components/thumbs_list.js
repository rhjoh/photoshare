import "./thumbs_list.css";
import { useEffect, useState } from "react";

function ThumbPic(props) {
  const [optionsClicked, setOptionsClicked] = useState(false);

  const editClicked = (common) => {
    console.log("Edit clicked");
    console.log(common);
    props.setEditPhotoObject(common);
  };

  const deleteClicked = (common) => {
    console.log("Deleting " , common.id)
    // POST To /delete here. 
    const deleteBody = {
      id: common.id
    }
    fetch('http://localhost:8000/delete', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(deleteBody)
    }).then(() => {
      props.setPhotoAPICallState(!props.photoAPICallState)
      console.log(props.photoAPICallState)
    })
  }

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
        <button
          style={{ width: "inherit" }}
          onClick={() => deleteClicked(props.commonProps)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function ThumbnailList(props) {
  return (
    <div className="thumbs_main">
      <div className="search-main">
        <input
          id="searchbar"
          type="text"
          placeholder="Search"
          className="search-input"
        />
      </div>
      {props.photoData.map((item, key) => (
        <ThumbPic
          commonProps={item}
          key={key}
          editPhotoObject={props.editPhotoObject}
          setEditPhotoObject={props.setEditPhotoObject}
          photoAPICallState={props.photoAPICallState}
          setPhotoAPICallState={props.setPhotoAPICallState}
        />
      ))}
    </div>
  );
}

export default ThumbnailList;
