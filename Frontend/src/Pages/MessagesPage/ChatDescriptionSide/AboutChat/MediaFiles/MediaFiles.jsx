import React from 'react'
import MediaFile from '../../../../../SVG/MediaFile'
import FileMedia from '../../../../../SVG/FileMedia'

export default function MediaFiles({mediaFiles, setMediaFiles}) {
  return (
    <main className='ChatInfo'>
      <div className='SetChatInfo' onClick={() => {setMediaFiles(!mediaFiles)}}>
      <b>Media & files</b>
      <i className='pi pi-angle-up'></i>
      </div>
      <div className='OpenedChatInfo'>
        <i><MediaFile/></i>
        <p>Media</p>
      </div>
      <div className='OpenedChatInfo'>
        <i> <FileMedia/></i>
        <p>Files</p>
      </div>
    </main>
  )
}
