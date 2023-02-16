import "./edit_container.css";

function EditContainer(props) {
  function editSubmitButton() {
    console.log("Clicked");
    let uploadBody = {
      id: props.editPhotoObject.id,
      imgTags: document.getElementById("tagsInput").value,
    };
    console.log(uploadBody);
    console.log(typeof uploadBody);
    fetch("http://localhost:8000/update", {
      method: "POST",
      body: JSON.stringify(uploadBody),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }

  return Object.keys(props.editPhotoObject).length > 1 ? (
    <div className="editContainerMain">
      <p>Image title: {props.editPhotoObject.title}</p>
      <input type="text" placeholder="Edit title..." id="titleInput"></input>
      <p>Image tag: {props.editPhotoObject.tagobj}</p>
      <input type="text" placeholder="Add tags..." id="tagsInput"></input>
      <button id="editSubmitButton" onClick={() => editSubmitButton()}>
        Submit changes
      </button>
    </div>
  ) : null;
}

export default EditContainer;
