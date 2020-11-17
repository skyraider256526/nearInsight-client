import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import quotes from "./data";

import "./style.scss";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // maxWidth: "100%",
    },
  })
);

export default function QuotesComponent() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const classes = useStyles();

  function changeCurrentQuote() {
    if (currentQuoteIndex === quotes.length - 1) setCurrentQuoteIndex(0);
    else setCurrentQuoteIndex(s => s + 1);
  }

  useEffect(() => {
    // console.log("use");
    // the timer is 10s and transition in 2s
    const loop = setTimeout(changeCurrentQuote, 10000);
    return () => clearTimeout(loop);
  });

  return (
    <SwitchTransition>
      <CSSTransition
        key={quotes[currentQuoteIndex]._id}
        timeout={2000}
        classNames="fade"
      >
        <Card className={classes.root}>
          <CardContent>
            <figure>
              <blockquote>
                <Typography>{quotes[currentQuoteIndex].quote}</Typography>
              </blockquote>
              <figcaption>
                &mdash; <cite>{quotes[currentQuoteIndex].cite}</cite>
              </figcaption>
            </figure>
          </CardContent>
        </Card>
      </CSSTransition>
    </SwitchTransition>
  );
}
