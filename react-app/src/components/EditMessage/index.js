// import React, { useEffect, useState } from "react";
// import { useHistory, Redirect, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// // import { updateMessage } from "../../store/messages";
// import "./EditMessage.css";

// const EditMessage = () => {
//   // const history = useHistory();
//   const dispatch = useDispatch();
//   const { channelId, messageId, serverId } = useParams();
//   channelId = Number(channelId);
//   messageId = Number(messageId);

//   useEffect(() => {
//     const errors = [];
//     if (!content.length) errors.push("Message must not be empty.");
//     setErrors(errors);
//   }, [content]);

//   useEffect(() => {
//     dispatch(getMessages(messageId));
//   }, [dispatch, messageId]);

//   const message = useSelector((state) => state.messages[messageId]);
//   const userId = useSelector((state) => state.session.user?.id);
//   if (userId !== message?.user_id) return <Redirect to={`/servers/${serverId}/channels/${channelId}/messages`}></Redirect>;

//   const [content, setContent] = useState(message?.content || "");
//   const [errors, setErrors] = useState([]);

//   const resetContent = () => {
//     setContent("");
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const updatedMessage = {
//       messageId,
//       content,
//       userId,
//       channelId,
//     };

//     dispatch(createMessage(updatedMessage));
//     resetContent();
//   };

//   return (
//     <div className="CU_msg">
//       <form onSubmit={handleSubmit} className="add_msg">
        
//         {/* Errors */}
//         {errors.length > 0 && (
//           <ul className="errors">
//             {errors.map((error) => (
//               <li key={error}>{error}</li>
//             ))}
//           </ul>
//         )}

//         {/* Message Input */}
//         <textarea
//           placeholder="Send a message..."
//           type="text"
//           name="content"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />

//         {/* Submit */}
//         <button type="submit" disabled={errors.length > 0} className="add_btn">
//           <i class="fas fa-plus"></i>
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditMessage;
