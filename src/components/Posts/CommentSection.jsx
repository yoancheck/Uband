import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { getAuth } from "@firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "../../config/config";
import { Comment } from "./Comment";

export function CommentSection({ comments, data, isSale = false }) {
  const [userComments, setUserComments] = useState([]);
  const [commentEdit, setCommentEdit] = useState("");

  const user = getAuth().currentUser;

  const uploadComment = () => {
    const db = getFirestore(app);
    setDoc(
      doc(db, isSale ? "sales" : "posts", data.id),
      {
        comments: [
          ...userComments,
          {
            date: Date.now(),
            user: user.uid,
            comment: commentEdit,
          },
        ],
      },
      { merge: true }
    );
    setUserComments((prev) => [
      {
        date: Date.now(),
        user: user.uid,
        comment: commentEdit,
      },
      ...prev,
    ]);
    setCommentEdit("");
  };

  const deleteComment = (date) => {
    const db = getFirestore(app);
    setDoc(
      doc(db, isSale ? "sales" : "posts", data.id),
      {
        comments: [...userComments].filter((comment) => comment.date !== date),
      },
      { merge: true }
    );
    setUserComments((prev) =>
      [...prev].filter((comment) => comment.date !== date)
    );
  };

  useEffect(() => {
    setUserComments(comments.sort((a, b) => b.date - a.date));
  }, [comments]);

  return (
    <div
      style={{
        width: "100%",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {user ? (
        <div style={{ width: "80%", marginBottom: 10 }}>
          <br />
          <Form.Control
            value={commentEdit}
            onChange={(e) => setCommentEdit(e.target.value)}
            onKeyPress={(e) => (e.key == "Enter" ? uploadComment() : "")}
          />
          <br />
          <Button variant="primary" onClick={() => uploadComment()}>
            Submit
          </Button>
        </div>
      ) : (
        ""
      )}

      {userComments.map((comment) => (
        <Comment
          key={comment.date}
          comment={comment}
          deleteComment={() => deleteComment(comment.date)}
        />
      ))}
    </div>
  );
}
