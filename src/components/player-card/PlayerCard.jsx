import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: "70%",
    flexDirection: "row",
    display: "flex",
  },
  button: {
    width: "100%",
    display:"flex",
    justifyItems:"space-between"
  },
  media: {
    height: 140,
  },
  action: {
    width:"100%",
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
  },
});

export default function PlayerCard({
  name,
  location,
  distance,
  style,
  image,
  onClick,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.root} style={style}>
      <CardActions className={classes.action}>
        <Button onClick={onClick} className={classes.button}>
          <CardActionArea className={classes.action}>
            <img
              className={classes.media}
              src={image}
              title="Contemplative Reptile"
            />

            <CardContent>
              <Typography gutterBottom variant="body2" component="p">
                {name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {location}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {distance}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Button>
      </CardActions>
    </Card>
  );
}
