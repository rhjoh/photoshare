import Sidebar from "./components/sidebar.js";
import MainArea from "./components/main-area.js";
import { useEffect, useState } from "react";

function App() {
  const [addPhotoState, setAddPhotoState] = useState();
  const [photoAPICallState, setPhotoAPICallState] = useState(false);
  const [photoData, setPhotoData] = useState([]);
  const [editPhotoObject, setEditPhotoObject] = useState({});

  useEffect(() => {
    console.log('High level useEffect fired.')
    fetch("http://localhost:8000/photos")
      .then((response) => response.json())
      .then((json) => {
        setPhotoData(json);
      });
  }, [photoAPICallState]);

  useEffect(() => {
    console.log("sidebar clicked");
  }, [addPhotoState]);
  return (
    <body>
      <Sidebar
        addPhotoState={addPhotoState}
        setAddPhotoState={setAddPhotoState}
      />

      <MainArea
        photoData={photoData}
        editPhotoObject={editPhotoObject}
        setEditPhotoObject={setEditPhotoObject}
        addPhotoState={addPhotoState}
        photoAPICallState={photoAPICallState}
        setPhotoAPICallState={setPhotoAPICallState}
      />
    </body>
  );
}

export default App;
