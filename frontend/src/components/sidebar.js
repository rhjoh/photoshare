import "./sidebar.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function SidebarButton(props) {
  return (
    <div className="sidebar-button">
      <p className={props.iconName} onClick={props.onClick}>
        {props.textValue}
      </p>
    </div>
  );
}

function Sidebar(props) {
  return (
    <div className="sidebar-main">
      <div className="sidebar-header">PicShare</div>

      <SidebarButton
        textValue={"Add Photo"}
        setAddPhotoState={props.setAddPhotoState}
        addPhotoState={props.addPhotoState}
        iconName={"bi bi-folder2"}
        onClick={() => props.setAddPhotoState(!props.addPhotoState)}
      />

      <SidebarButton
      textValue={"Favourites"}
      iconName={"bi bi-heart"}
      // onclick load favourites
      />
    </div>
  );
}

export default Sidebar;
