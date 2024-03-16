import React from "react";
//import useStyles from "./styles";
import styles from "./styles.module.css";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import moment from "moment";
import { MdDelete } from "react-icons/md";
import { FaThumbsUp } from "react-icons/fa";
import { IoEllipsisHorizontal } from "react-icons/io5";
import memories from "../../../images/memories.png";

export default function Post({ post }) {
  var image = memories;
  console.log(post.createdAt);
  var day = moment(post.createdAt);
  var createdAt = moment(day).fromNow();
  if (post.selectedFile !== "") {
    image = post.selectedFile;
  }
  return (
    <Card className={styles.card}>
      <CardMedia
        className={styles.media}
        image={image}
        title={post.title}
      ></CardMedia>
      <div className={styles.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">{createdAt}</Typography>
      </div>
      <div className={styles.overlay2}>
        <Button style={{ color: "white" }} size="small" onClick={() => {}}>
          <IoEllipsisHorizontal fontSize="default" />
        </Button>
      </div>
      <div className={styles.details}>
        <Typography variant="body2">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <CardContent>
        <Typography className={styles.title} variant="h5" gutterBottom>
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={styles.cardActions}>
        <Button size="small" color="primary" onClick={() => {}}>
          <FaThumbsUp fontSize="small" />
          Like
          {post.likeCount}
        </Button>
        <Button size="small" color="primary" onClick={() => {}}>
          <MdDelete fontSize="small" />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
