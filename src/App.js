import React, { useRef, useState } from 'react'
import UploadImage from './component/UploadImage'
import Preview from './component/Preview'

function App() {
  const [listData, setListData] = useState([]);

  return (
    <div className='container'>
      <UploadImage getListData={setListData}/>
      <Preview listData={listData}/>
    </div>
  )
}

export default App
