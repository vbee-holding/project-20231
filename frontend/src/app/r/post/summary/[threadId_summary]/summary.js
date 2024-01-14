import { faBoltLightning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Summary(props) {
    return (
      <div>
        <div className="max-w-2xl p-1 mx-auto">
          <div className="bg-amber-200 text-white p-2 rounded-md mt-1 flex items-start mx-1">
            <FontAwesomeIcon icon={faBoltLightning} className="w-5 h-5 " />
            <span className="ml-1 text-xl">Tóm Tắt</span>
          </div>
            <div className= "p-2 rounded-md mt-1 flex items-start mx-1">
                  <h1 className="font-regular  ml-1">{props.summarizedRepliesContent}</h1>
            </div>
        </div>
      </div>
    );
  }
  