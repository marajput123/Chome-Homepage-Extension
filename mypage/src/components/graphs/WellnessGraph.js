import React from "react";
import {
  Paper,
  useMediaQuery,
  Typography,
  makeStyles,
} from "@material-ui/core";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Devices } from "@material-ui/icons/";

const useStyles = makeStyles({
  root: {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  rootPaper: {
    minHeight: "400px",
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "90%",
    marginBottom: "20px",
    borderRadius: "20px",
    maxWidth: "1000px",
  },
});

const WellnessGraph = (props) => {
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:725px)");

  const parseData = () => {
    return props.wellnessData.map((dataPoint) => {
      return {
        Exercise: dataPoint.exercise,
        Happiness: dataPoint.moodScore,
        date: dataPoint.date.split("-").splice(1).join(" "),
      };
    });
  };

  const renderGraph = () => {
    return (
      <>
        <Typography style={{ marginBottom: "10px" }} variant={"h4"}>
          Daily Fitness Log
        </Typography>
        <div style={{ display: "flex" }}>
          <LineChart
            width={500}
            height={300}
            data={parseData()}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" hide />
            <YAxis yAxisId="left" interval="preserveStartEnd" unit=" Min" />
            <YAxis
              yAxisId="right"
              orientation="right"
              type="number"
              domain={[0, 5]}
              interval="preserveStartEnd"
              label={<p>testing</p>}
            />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Exercise"
              stroke="#8884d8"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Happiness"
              stroke="#82ca9d"
              activeDot={{ r: 8 }}
            />
          </LineChart>
          <div>
            <Typography>Happines Key:</Typography>

            <Typography variant="subtitle2">5: Awsome</Typography>
            <Typography variant="subtitle2">4: Happy</Typography>
            <Typography variant="subtitle2">3: So So</Typography>
            <Typography variant="subtitle2">2: Sad</Typography>
            <Typography variant="subtitle2">1: Very Sad</Typography>
          </div>
        </div>
      </>
    );
  };

  const renderError = () => {
    return (
      <>
        <Devices style={{ fontSize: 80 }} />
        <Typography variant={"h4"} style={{ textAlign: "center" }}>
          Sorry, please view it in a larger device.
        </Typography>
      </>
    );
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.rootPaper} elevation={6}>
        {isMobile ? renderError() : renderGraph()}
      </Paper>
    </div>
  );
};

export default WellnessGraph;
