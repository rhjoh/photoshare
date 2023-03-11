import "./thumbs_list.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";

function ThumbPic(props) {
  const [optionsClicked, setOptionsClicked] = useState(false);

  const thumbnailClicked = (common) => {
    props.setSelectedThumbnail(common);
    console.log(props.selectedThumbnail);
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
    </div>
  );
}

function ThumbnailList(props) {
  const [selectedThumbnail, setSelectedThumbnail] = useState({});
  const [addAlbumClicked, setAddAlbumClicked] = useState(false);
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
  }
  function albumSaveClicked(albumID) {
    console.log(albumID);
    // Make a POST request to save the selectedThumbnail with an albumID.
    // Need to assign and get the albumID dynamically, could be x number of IDs from x number of albums.
    const newAlbumBody = {
      id: selectedThumbnail.id,
      albumID: albumID,
    };
    fetch("http://localhost:8000/albumsave", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAlbumBody),
    }).then(() => {
      // Currently the API call saves the photo to the album but it remains stale on the client. 
      // Need to make an API call here for the updated object and edit the existing object in photoData. 
      console.log("Sent fav request");
    });
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
          <i
            className="bi bi-journal-bookmark"
            onClick={() => setAddAlbumClicked(!addAlbumClicked)}
          ></i>
          <div
            id="albumSaveList"
            className="albumSaveList"
            style={
              addAlbumClicked
                ? { visibility: "visible" }
                : { visibility: "hidden" }
            }
            onMouseLeave={() => setAddAlbumClicked(!addAlbumClicked)}
          >
            <button
              id="button-test"
              onClick={() => albumSaveClicked(1)}
              // Album ID hard coded for now
              className="albumButton"
            >
              Album1
            </button>
          </div>
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
