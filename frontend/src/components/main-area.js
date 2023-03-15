/* This will render ThumbnailList and edit/new  */

import ThumbnailList from "./thumbs_list.js";
import UploadContainer from "./upload_container.js";
import EditContainer from "./edit_container";
import EditMenu from "./edit_menu.js";
import "./main-area.css";
import { useState } from "react";

function MainArea(props) {
  const [selectedThumbnail, setSelectedThumbnail] = useState({});
  return (
    <div className="main-area-main">
      <ThumbnailList
        photoData={props.photoData}
        editPhotoObject={props.editPhotoObject}
        setEditPhotoObject={props.setEditPhotoObject}
        photoAPICallState={props.photoAPICallState}
        setPhotoAPICallState={props.setPhotoAPICallState}
        albumData={props.albumData}
        selectedThumbnail={selectedThumbnail}
        setSelectedThumbnail={setSelectedThumbnail}
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
      <EditMenu
        selectedThumbnail={selectedThumbnail}
        setSelectedThumbnail={setSelectedThumbnail}
        photoData={props.photoData}
        setPhotoData={props.setPhotoData}
        setPhotoAPICallState={props.setPhotoAPICallState}
        photoAPICallState={props.photoAPICallState}
      />

      {/* This older edit container stuff can be removed  */}
      {/*       <EditContainer
        editPhotoObject={props.editPhotoObject}
        setEditPhotoObject={props.setEditPhotoObject}
      /> */}
    </div>
  );
}

export default MainArea;
