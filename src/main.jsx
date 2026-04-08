import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StudyRecordList } from './StudyRecordList.jsx'

import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StudyRecordList />
  </StrictMode>,
)
