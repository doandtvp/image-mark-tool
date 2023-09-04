import React, { useState } from 'react'
import UploadImage from './component/UploadImage/UploadImage'
import Preview from './component/Preview/Preview'
import { MyContext } from './ContextProvider'

function App({ defaultProps }) {
  const imgurl = defaultProps.element ? defaultProps.element.src : ''
  const listMark = defaultProps.element.dataset.lists ? JSON.parse(defaultProps.element.dataset.lists) : []
  const [toggleTabs, setToggleTab] = useState(true)
  const [listDataMap, setListDataMap] = useState(listMark)
  const [file, setFile] = useState(imgurl);

  return (
    <MyContext.Provider value={{ listDataMap, setListDataMap, file, setFile, defaultProps }}>
      <div className='container'>
        {toggleTabs ? <UploadImage setToggleTab={setToggleTab}/> : <Preview setToggleTab={setToggleTab}/>}
      </div>
    </MyContext.Provider>
  )
}

export default App
