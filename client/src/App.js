import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { boolean } from "./redux/appSelectors";
import appActions from "./redux/appActions";
import styles from "./App.module.css";
import { io } from "socket.io-client";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";

function App() {
  const [value, setValue] = useState([]);
  const socket = io.connect("http://localhost:4000");

  const dispatch = useDispatch();
  const bool = useSelector(boolean);

  const onToggleGettingData = () => {
    // So this part of course should be made using React Hook useState, in this particular case,
    //i`ve tried to make a flag for socket disconnection, and to show knowledge of redux, redux is
    //working but something went wrong. cannot understand how to handle this.

    dispatch(appActions.toggler());
    if (bool) {
      socket.disconnect();
    }
  };

  useEffect(() => {
    socket.emit("start");
    socket.on("ticker", (res) => {
      setValue(res);
    });

    console.log("socket conect");

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography
          variant="h2"
          component="h2"
          align="center"
          className={styles.title}
          gutterBottom
        >
          World Financial Information
        </Typography>
      </Grid>
      <Grid
        container
        item
        xs={12}
        direction="column"
        justify="center"
        alignItems="center"
        spacing={4}
      >
        {value.map((item) => (
          <Grid
            container
            item
            xs={9}
            md={6}
            lg={8}
            justify="center"
            alignItems="center"
            key={item.ticker}
          >
            <Card className={styles.item}>
              <Typography className={styles.ticker}> {item.ticker}</Typography>
              <Typography className={styles.exchange}>
                {item.exchange}
              </Typography>
              <Typography className={styles.spacing}>{item.price}</Typography>
              <Typography className={styles.spacing}>{item.change}</Typography>
              <Box className={styles.percent}>
                <Typography className={styles.percent}>
                  {item.change_percent}
                </Typography>
              </Box>
              <Typography>{item.dividend}</Typography>
              <Typography>{item.yield}</Typography>
              <Typography>{item.last_trade_time}</Typography>
            </Card>
          </Grid>
        ))}
        <button
          type="button"
          onClick={onToggleGettingData}
          className={styles.btn}
        >
          START/STOP
        </button>
      </Grid>
    </Grid>
  );
}

export default App;
