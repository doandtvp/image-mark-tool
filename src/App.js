import React from 'react'
import UploadImage from './component/UploadImage'
import Preview from './component/Preview'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className='container'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UploadImage/>} />
          <Route path="/preview" element={<Preview/>} />
          <Route path="*" element={<p>Sorry, nothing here</p>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
