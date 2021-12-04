import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { get, ref, getDatabase } from "@firebase/database";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { getAuth } from "@firebase/auth";
import { app } from "../../config/config";
import { doc, getFirestore, deleteDoc, setDoc } from "firebase/firestore";
import { CommentSection } from "./CommentSection";

const useStyles = makeStyles({
  root: {
    width: "70%",
    flexDirection: "row",
    display: "flex",
  },
  button: {
    width: "100%",
    display: "flex",
    justifyItems: "space-between",
  },
  media: {
    height: 140,
  },
  action: {
    width: "100%",
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
  },
});

export default function Post({ data, showButtons, remove }) {
  const {
    text,
    title,
    instruments,
    userId,
    city,
    experience,
    phone,
    genre,
    likes,
    comments,
    date,
  } = data;
  const classes = useStyles();
  const [name, setName] = useState("");
  const [userLikes, setUserLikes] = useState([]);
  const [photoURL, setPhotoURL] = useState("");
  const [showPhone, setShowPhone] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    get(ref(getDatabase(), "users/" + userId + "/nickname")).then((name) =>
      setName(name.val())
    );
    get(ref(getDatabase(), "users/" + userId + "/photoURL")).then((name) =>
      setPhotoURL(name.val())
    );
  }, []);

  useEffect(() => {
    setUserLikes(likes);
  }, []);

  const isDeletable = user && user.uid == userId;

  const isLikedByMe = () => {
    return user && userLikes ? userLikes.includes(user.uid) : null;
  };

  const like = () => {
    const db = getFirestore(app);
    if (isLikedByMe()) {
      setDoc(
        doc(db, "posts", data.id),
        {
          likes: userLikes.filter((like) => like != user.uid),
        },
        { merge: true }
      );
      setUserLikes((prev) => [...prev].filter((like) => like != user.uid));
    } else {
      setUserLikes((prev) => [...prev, user.uid]);
      setDoc(
        doc(db, "posts", data.id),
        { likes: [...userLikes, user.uid] },
        { merge: true }
      );
    }
  };

  const deletePost = () => {
    const db = getFirestore(app);
    deleteDoc(doc(db, "posts", data.id));
    remove();
  };

  return (
    <Card className={classes.root} style={{ marginTop: 10 }}>
      <CardActions className={classes.action}>
        <img
          className={classes.media}
          style={{ alignSelf: "flex-start", marginTop: 70 }}
          width="30%"
          maxHeight="30%"
          src={photoURL}
          title="Contemplative Reptile"
        />

        <CardContent style={{ width: "100%" }}>
          <Typography gutterBottom variant="h5" component="p">
            {name}
          </Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Typography gutterBottom variant="h6" component="p">
              {title}
            </Typography>
          </div>
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography variant="body2" color="textSecondary" component="p">
                {text}
              </Typography>
              <Typography gutterBottom variant="body2" component="p">
                <b>From:</b> {city}
              </Typography>
              <Typography gutterBottom variant="body2" component="p">
                <b>Experience:</b> {experience}
              </Typography>
              <Typography gutterBottom variant="body2" component="p">
                <b>Genre:</b> {genre}
              </Typography>
              <Typography gutterBottom variant="body2" component="p">
                <b>Plays:</b>
                {instruments ? instruments.join(",") : ""}
              </Typography>
            </div>
            {showButtons && (
              <div style={{ marginLeft: "auto" }}>
                {isDeletable && (
                  <div
                    style={{ marginBottom: 10, cursor: "pointer" }}
                    onClick={() => deletePost()}
                  >
                    <img
                      src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-delete-miscellaneous-kiranshastry-lineal-kiranshastry.png"
                      width="35px"
                    />
                  </div>
                )}
                <Typography variant="body2" color="body2" component="p">
                  {new Date(date).toLocaleString()}
                </Typography>
                <br />
                <Button
                  onClick={() => {
                    if (showPhone) {
                      window.open(
                        `https://api.whatsapp.com/send?phone=${phone}&text=Hi, I got the number from Uband.`,
                        "_blank"
                      );
                    } else {
                      setShowPhone(true);
                    }
                  }}
                >
                  {!showPhone ? (
                    "Show Contact"
                  ) : (
                    <div>
                      <img src="https://img.icons8.com/office/30/000000/whatsapp--v2.png" />
                    </div>
                  )}
                </Button>
                {showPhone && <div>{phone}</div>}
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {user ? (
              <div
                onClick={() => like()}
                style={{
                  padding: 5,
                  backgroundColor: isLikedByMe() ? "#a2bae4" : "#dddddd",
                  borderRadius: 10,
                  marginRight: 15,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  style={{ marginRight: 5 }}
                  width="35px"
                  src="https://img.icons8.com/external-sbts2018-blue-sbts2018/58/000000/external-like-social-media-basic-1-sbts2018-blue-sbts2018.png"
                />
                <b>{userLikes ? userLikes.length : ""}</b>
              </div>
            ) : (
              ""
            )}
            <div
              onClick={() => setShowComments((prev) => !prev)}
              style={{
                padding: 5,
                backgroundColor: "#dddddd",
                borderRadius: 10,
                marginRight: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                style={{ marginRight: 5 }}
                width="35px"
                src="https://img.icons8.com/external-sbts2018-mixed-sbts2018/58/000000/external-comment-social-media-basic-1-sbts2018-mixed-sbts2018.png"
              />
              <b>{comments.length}</b>
            </div>
          </div>
          <div>
            {showComments && <CommentSection comments={comments} data={data} />}
          </div>
        </CardContent>
      </CardActions>
    </Card>
  );
}
