import React, { useState, useEffect } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace =false) {
    let newHistory = [...history];
    if (replace === true) {
      newHistory.pop();
    }
    newHistory.push(newMode);
    setHistory(newHistory);
    setMode(newMode);
  }

  function back() {
    let newHist = history.slice(0, history.length - 1);
    if (newHist.length >= 1) {
      setHistory(newHist);
      setMode(newHist[newHist.length - 1]);
    }
  }
  return { mode, transition, back };

}