import "./sidebar.css";

function SidebarButton(props) {
  return (
    <div className="sidebar-button">
      <p onClick={props.onClick}>{props.textValue}</p>
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
        onClick={() => props.setAddPhotoState(!props.addPhotoState)}
      />

      <SidebarButton textValue={"Albums"} />
    </div>
  );
}

export default Sidebar;
