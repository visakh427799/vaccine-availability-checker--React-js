import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  section1: {
    margin: theme.spacing(3, 2),
  },
  section2: {
    margin: theme.spacing(2),
  },
  section3: {
    margin: theme.spacing(3, 1, 1),
  },
}));

export default function Infocard({ dose1, dose2, session, vaccine, age }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Divider variant="middle" />
      <div className={classes.section2}>
        <Typography gutterBottom variant="body1">
          <Button color="secondary">Session :{session}</Button>
          {vaccine} <Button color="secondary">{age}+</Button>
        </Typography>
        <div>
          <Chip
            className={classes.chip}
            color="primary"
            label={"Dose 1 💉- " + dose1}
          />
          <Chip
            className={classes.chip}
            color="primary"
            label={"Dose2 💉- " + dose2}
          />
        </div>
      </div>
      <div className={classes.section3}></div>
    </div>
  );
}
