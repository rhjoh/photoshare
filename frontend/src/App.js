import Sidebar from "./components/sidebar.js";
import MainArea from "./components/main-area.js";
import { useEffect, useState } from "react";

function App() {
  const [addPhotoState, setAddPhotoState] = useState();
  const [photoAPICallState, setPhotoAPICallState] = useState(false);
  const [photoData, setPhotoData] = useState([]);
  const [editPhotoObject, setEditPhotoObject] = useState({});
  const [albumData, setAlbumData] = useState([{albumName: "Album 1", id: 1}, {albumName: "Album 2", id: 2}])

  useEffect(() => {
    console.log("High level useEffect fired.");
    fetch("http://localhost:8000/photos")
      .then((response) => response.json())
      .then((json) => {
        setPhotoData(json);
        // Regex to strip JSON special characters from tagobj string goes here.  
        console.log((json[2].tagobj))
      });
  }, [photoAPICallState]);

  return (
    <body>
      <Sidebar
        addPhotoState={addPhotoState}
        setAddPhotoState={setAddPhotoState}
        photoData={photoData}
        setPhotoData={setPhotoData}
        photoAPICallState={photoAPICallState}
        setPhotoAPICallState={setPhotoAPICallState}
        albumData={albumData}
        setAlbumData={setAlbumData}
      />

      <MainArea
        photoData={photoData}
        setPhotoData={setPhotoData}
        editPhotoObject={editPhotoObject}
        setEditPhotoObject={setEditPhotoObject}
        addPhotoState={addPhotoState}
        photoAPICallState={photoAPICallState}
        setPhotoAPICallState={setPhotoAPICallState}
        albumData={albumData}
      />
    </body>
  );
}

export default App;
