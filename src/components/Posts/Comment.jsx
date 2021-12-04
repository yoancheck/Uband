import { useState } from "react";
import { get, ref, getDatabase } from "@firebase/database";
import { getAuth } from "@firebase/auth";

export function Comment({ comment, deleteComment }) {
  const [userName, setUserName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const user = getAuth().currentUser;

  get(ref(getDatabase(), "users/" + comment.user + "/nickname")).then((name) =>
    setUserName(name.val())
  );
  get(ref(getDatabase(), "users/" + comment.user + "/photoURL")).then((name) =>
    setPhotoURL(name.val())
  );

  const isMyComment = () => {
    return user && comment.user === user.uid;
  };

  return (
    <div
      key={comment.date}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: 5,
        backgroundColor: "#eeeeee",
        margin: 10,
        padding: 5,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "80%",
        }}
      >
        <div style={{ marginRight: 25, display: "flex", alignItems: "center" }}>
          <img style={{ margin: 5 }} width={25} src={photoURL} />
          <b>{userName}</b>
        </div>
        <div>{new Date(comment.date).toLocaleString()}</div>
        {isMyComment() && (
          <div style={{ cursor: "pointer" }} onClick={deleteComment}>
            <img
              src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-delete-miscellaneous-kiranshastry-lineal-kiranshastry.png"
              width="25px"
            />
          </div>
        )}
      </div>
      <div style={{ width: "80%", display: "flex", marginLeft: 70 }}>
        {comment.comment}
      </div>
    </div>
  );
}
