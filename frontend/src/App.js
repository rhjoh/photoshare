import Sidebar from './components/sidebar.js';
import ThumbsList from './components/thumbs_list.js';
import UploadContainer from './components/upload_container.js';
import { useEffect, useState } from 'react';



function App() {
  
  const [addPhotoState, setAddPhotoState] = useState(false);
  
  useEffect(() => {
    console.log("sidebar clicked")
  }, [addPhotoState])
  return (
    <body>
    <Sidebar addPhotoState={addPhotoState} setAddPhotoState={setAddPhotoState}/>
    <ThumbsList />
    {/* {addPhotoState ? <UploadContainer /> : null } */}
    </body>
  );
}

export default App;
