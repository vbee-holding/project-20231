export default function Replies(props) {


  return (
    <div>
      <div className="max-w-2xl p-4 mx-auto">

        {/* Add comment */}
        <div className="comment-scroll mt-4 mx-4 bg-white rounded-lg p-4 shadow-md">
          <p className="text-gray-800 font-bold text-xl mb-2">{props.user}</p>
          <p className="text-gray-700 leading-7">{props.content}</p>
        </div>
      </div>
    </div>
  );
}
