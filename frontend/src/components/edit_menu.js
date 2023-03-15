import "./edit_menu.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";

function FormInput(props) {
  function handleInputChange(event) {
    props.onInputchange(event.target.value);
  }
  // Input values don't change on selectedThumbnail change
  return (
    <div className="editInputArea">
      <input
        id="inputUpdate"
        placeholder={props.photoAttributeValue}
        onChange={handleInputChange}
      ></input>
    </div>
  );
}

function EditMenu(props) {
  const [titleUpdate, setTitleUpdate] = useState(props.selectedThumbnail.title);
  const [descUpdate, setDescUpdate] = useState();
  const [tagsUpdate, setTagsUpdate] = useState()
  function saveClicked() {
    // Update title in the selectedThumnail index of photoData
    const photoDataCopy = props.photoData.slice();
    let index = photoDataCopy.findIndex(
      (x) => x.id === props.selectedThumbnail.id
    );
    // Shallow copy of selected object.
    let selectedThumbnailCopy = photoDataCopy[index];
    selectedThumbnailCopy.title = titleUpdate;
    selectedThumbnailCopy.description = descUpdate;
    selectedThumbnailCopy.tagobj = JSON.stringify(tagsUpdate);
    console.log(selectedThumbnailCopy);
    

    fetch("http://localhost:8000/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(selectedThumbnailCopy),
    }).then(props.setPhotoAPICallState(!props.photoAPICallState))
  }
  function handleTitleChange(value) {
    setTitleUpdate(value);
  }
  function handleDescChange(value) {
    setDescUpdate(value);
  }
  function handleTagsChange(value){
    // Use regex to convert string to object/array here 
    const splitTags = value.split(' ')
    console.log(splitTags)
    setTagsUpdate(splitTags)
  }
  return (
    <div className="editmenu_container">
      <form>
        <label id="nameLabel">Title:</label>
        <FormInput
          photoAttributeValue={props.selectedThumbnail.title}
          onInputchange={handleTitleChange}
        />
        <label>Description: </label>
        <FormInput
          photoAttributeValue={props.selectedThumbnail.description}
          onInputchange={handleDescChange}
        ></FormInput>
        <label>Tags: </label>
        <FormInput
          photoAttributeValue={props.selectedThumbnail.tagobj} 
          // The above needs to be converted to a real string. Currently JSON. 
          onInputchange={handleTagsChange}
        >

        </FormInput>
        <button
          type="button"
          onClick={() => saveClicked()}
          photoAPICallState={props.photoAPICallState}
          setPhotoAPICallState={props.setPhotoAPICallState}
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default EditMenu;
