import { faBoltLightning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Summary(props) {
    return (
      <div>
        <div className="max-w-2xl p-4 mx-auto">
  
            <div className="bg-amber-200 text-white p-4 rounded-md mt-1 flex items-start mx-3">
                <FontAwesomeIcon icon={faBoltLightning} className="w-7 h-7 mr-2" />
                <span className="ml-1 text-2xl">Summary</span>
            </div>
            <div className= "p-4 rounded-md mt-2 flex items-start mx-5">
                  <h1 className="font-regular  ml-2">{props.content}</h1>
            </div>
        </div>
      </div>
    );
  }
  