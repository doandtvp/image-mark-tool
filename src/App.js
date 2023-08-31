import React, { useState } from 'react'
import UploadImage from './component/UploadImage/UploadImage'
import Preview from './component/Preview/Preview'
import { MyContext } from './ContextProvider'

function App({ defaultProps }) {
  const [toggleTabs, setToggleTab] = useState(true)
  const [listDataMap, setListDataMap] = useState(
    JSON.parse(localStorage.getItem("lists")) || [],
  )
  // const [file, setFile] = useState(URL.createObjectURL(defaultProps.element));
  const [file, setFile] = useState('');
  return (
    <MyContext.Provider value={{ listDataMap,setListDataMap, file, setFile  }}>
      <div className='container'>
        {toggleTabs ? <UploadImage setToggleTab={setToggleTab}/> : <Preview setToggleTab={setToggleTab}/>}
      </div>
    </MyContext.Provider>
  )
}

export default App
