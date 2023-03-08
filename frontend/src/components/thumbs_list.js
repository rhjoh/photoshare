import "./thumbs_list.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";

function ThumbPic(props) {
  const [optionsClicked, setOptionsClicked] = useState(false);

  const thumbnailClicked = (common) => {
    props.setSelectedThumbnail(common);
    console.log(props.selectedThumbnail);
  };
  const editClicked = (common) => {
    console.log("Edit clicked");
    console.log(common);
    props.setEditPhotoObject(common);
  };
  const favouriteThumbClicked = (common) => {
    let newFavValue;
    common.isfavourite.data == 0 ? (newFavValue = 1) : (newFavValue = 0);
    console.log(newFavValue);
    const newFavBody = {
      id: common.id,
      isFav: newFavValue,
    };
    fetch("http://localhost:8000/favourite", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFavBody),
    }).then(() => {
      props.setPhotoAPICallState(!props.photoAPICallState);
    });
  };

  const deleteClicked = (common) => {
    console.log("Deleting ", common.id);
    const deleteBody = {
      id: common.id,
    };
    fetch("http://localhost:8000/delete", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deleteBody),
    }).then(() => {
      props.setPhotoAPICallState(!props.photoAPICallState);
      console.log(props.photoAPICallState);
    });
  };

  return (
    <div
      className={
        props.commonProps.id === props.selectedThumbnail.id
          ? "thumbnail-container-clicked"
          : "thumbnail-container"
      }
      onClick={() => thumbnailClicked(props.commonProps)}
      id={props.commonProps.id}
    >
      <img
        src={`http://localhost:8000/photos/${props.commonProps.filename}`}
        alt="alt_text"
      ></img>
      <p className="p-left">{props.commonProps.title}</p>
      <i
        id="favourite-heart"
        onClick={() => favouriteThumbClicked(props.commonProps)}
        className={
          props.commonProps.isfavourite.data[0] === 0
            ? "bi bi-heart heart-empty"
            : "bi bi-heart-fill heart-fill"
        }
      ></i>

      {/* This should be a ? operator  */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="white"
        className="svgClassTest"
        viewBox="0 0 16 16"
        onClick={() => setOptionsClicked(!optionsClicked)}
      >
        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
      </svg>
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
  const [selectedThumbnail, setSelectedThumbnail] = useState({});
  function deleteClick() {
    console.log("Delete pressed");
    const deleteBody = {
      id: selectedThumbnail.id,
    };
    console.log(deleteBody);
    fetch("http://localhost:8000/delete", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deleteBody),
    }).then(() => {
      props.setPhotoAPICallState(!props.photoAPICallState);
      console.log(props.photoAPICallState);
    });
  }
  function favouriteIconClicked() {
    console.log("Favourite clicked: ", selectedThumbnail);
    // <i class="bi bi-heart-fill"></i>
  }
  return (
    <div className="thumbs_main">
      <div className="search-header">
        <input
          id="searchbar"
          type="text"
          placeholder="Search"
          className="search-input"
        />
        <div id="actionBar" className="actionBar">
          <i className="bi bi-trash" onClick={() => deleteClick()}></i>
          <i className="bi bi-heart" onClick={() => favouriteIconClicked()}></i>
          <i className="bi bi-share"></i>
          <i className="bi bi-pencil-square"></i>
        </div>
      </div>
      {props.photoData.map((item, key) => (
        <ThumbPic
          commonProps={item}
          key={key}
          editPhotoObject={props.editPhotoObject}
          setEditPhotoObject={props.setEditPhotoObject}
          photoAPICallState={props.photoAPICallState}
          setPhotoAPICallState={props.setPhotoAPICallState}
          selectedThumbnail={selectedThumbnail}
          setSelectedThumbnail={setSelectedThumbnail}
        />
      ))}
    </div>
  );
}

export default ThumbnailList;
