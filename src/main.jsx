import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/style.css'
import GeneralInfo from './Components/General'
import EducationalInfo from './Components/Education'
import Experience from './Components/Experience'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GeneralInfo  />
    <EducationalInfo />
    <Experience />
  </StrictMode>,
)
