import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import './LibraryNav.css'

export default function LibraryNav() {

  return (
    <div className="libraryNavigation">
      <div className='firstLine'>
        <span>
          <NavLink to="">
            <span className='fa-solid'><i className="fa-solid fa-lines-leaning"></i></span>
            <span className='yourLibrary'> Your Library</span>
          </NavLink>
        </span>
        <span>
          <NavLink to=""><span className='fa-solid circle'><i className="fa-solid fa-plus"></i></span></NavLink>
          <NavLink to=""><span className='fa-solid circle'><i className="fa-solid fa-arrow-right"></i></span></NavLink>
        </span>
      </div>
    </div>
  )
}