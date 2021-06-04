import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Chips from "../components/Chips";
import Chip from "@material-ui/core/Chip";
import Infocard from "../components/Infocard";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function RecipeReviewCard({
  center_id,
  name,
  address,
  state,
  district,
  session,
  fee_type,
  pin,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  let vaccine = 0;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        style={{ color: "primary" }}
        avatar={<Avatar aria-label="recipe">💉</Avatar>}
        title={"🏥 Center Name :" + name}
        subheader={"Pincode :" + pin}
      />
      <Chip className={classes.chip} color="primary" label={fee_type} />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {address}
          {session.map((item, key) => {
            vaccine += item.available_capacity;

            return (
              <Infocard
                dose1={item.available_capacity_dose1}
                dose2={item.available_capacity_dose2}
                session={key + 1}
                vaccine={item.vaccine}
                age={item.min_age_limit}
              />
            );
          })}
          {vaccine > 0 ? (
            <>
              <Link href="https://www.cowin.gov.in/home">
                <Chips
                  color={"primary"}
                  message={"Vaccine is  available"}
                  done={true}
                />
              </Link>
            </>
          ) : (
            <>
              <Link href="https://www.cowin.gov.in/home">
                <Chips
                  color={"secondary"}
                  message={"Vaccine is not available"}
                  done={false}
                />
              </Link>
            </>
          )}
        </Typography>
        {/* <Chip className={classes.chip} label="Dose 1" />
          <Chip className={classes.chip} color="primary" label="Dose2" /> */}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Chip className={classes.chip} color="" label={"State- " + state} />
          <Chip
            className={classes.chip}
            color=""
            label={"District- " + district}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
}
