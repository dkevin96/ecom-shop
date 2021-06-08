import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const AppFooter = () => {
    return (
      <div className="bg-blue-100 p-5">
          <div className="m-2 text-center">
            <a href="">
              <span className="p-2">
                  {/* <FontAwesomeIcon icon={faGithub} size="lg"/> */}
              </span>
              {/* <p className="inline text-xl font-mono">Git Repo</p> */}
            </a>
          </div>
          <div className="m-2 text-center">
            <span className="p-2">
              <FontAwesomeIcon icon={faCopyright} size="lg"/>
            </span>
            <p className="inline text-xl font-mono">Coyright: kevin</p>
          </div>
      </div>
    )
  }
  
  export default AppFooter