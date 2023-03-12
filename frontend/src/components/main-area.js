/* This will render ThumbnailList and edit/new  */

import ThumbnailList from "./thumbs_list.js";
import UploadContainer from "./upload_container.js";
import EditContainer from "./edit_container";
import "./main-area.css";
import { useState } from "react";

function MainArea(props) {
  return (
    <div className="main-area-main">
      <ThumbnailList
        photoData={props.photoData}
        editPhotoObject={props.editPhotoObject}
        setEditPhotoObject={props.setEditPhotoObject}
        photoAPICallState={props.photoAPICallState}
        setPhotoAPICallState={props.setPhotoAPICallState}
        albumData={props.albumData}
      />
      {props.addPhotoState ? (
        <UploadContainer
          photoData={props.photoData}
          photoAPICallState={props.photoAPICallState}
          setPhotoAPICallState={props.setPhotoAPICallState}
          editPhotoObject={props.editPhotoObject}
          setEditPhotoObject={props.setEditPhotoObject}
        />
      ) : null}
      <EditContainer
        editPhotoObject={props.editPhotoObject}
        setEditPhotoObject={props.setEditPhotoObject}
      />
    </div>
  );
}

export default MainArea;
