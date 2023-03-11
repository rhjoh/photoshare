import "./sidebar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";

function SidebarButton(props) {
  return (
    <div className="sidebar-button">
      <p className={props.iconName} onClick={props.onClick}>
        {props.textValue}
      </p>
    </div>
  );
}

function AlbumButton(props) {
  function albumClicked(albumID) {
    /* 
    Major issue here. photoData is rewritten so we can't filter more than once. 
    We also can't just use a copy of photoData, because the thumbnail list pulls from that. 

    Instead of filtering the existing photoData, I'm just gonna make an API call for all photos of a given albumID. 
    Not sure if this is a terrible idea or not. 
     */
    fetch(`http://localhost:8000/photos/album/${albumID}`)
      .then((res) => res.json())
      .then(data => props.setPhotoData(data))
  }
  return (
    <div
      className="sidebar-button"
      id={props.commonProps.id}
      onClick={() => albumClicked(props.albumID)}
    >
      <p className="bi bi-journals">{props.commonProps.albumName}</p>
    </div>
  );
}

function Sidebar(props) {
  return (
    <div className="sidebar-main">
      <div className="sidebar-header">PicShare</div>

      <SidebarButton
        textValue={"Home"}
        iconName={"bi bi-house"}
        onClick={() => props.setPhotoAPICallState(!props.photoAPICallState)}
      />
      <SidebarButton
        textValue={"Upload"}
        setAddPhotoState={props.setAddPhotoState}
        addPhotoState={props.addPhotoState}
        iconName={"bi bi-folder2"}
        onClick={() => props.setAddPhotoState(!props.addPhotoState)}
      />

      <SidebarButton textValue={"Favourites"} iconName={"bi bi-heart"} />
      {props.albumData.map((item, key) => (
        <AlbumButton
          commonProps={item}
          key={key}
          albumID={item.id}
          photoData={props.photoData}
          setPhotoData={props.setPhotoData}
        />
      ))}
      {/* Wtf -- using => {} doesnt work but => () does. Why? */}
    </div>
  );
}
export default Sidebar;
