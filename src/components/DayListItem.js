import React from "react";
import "components/DayListItem.scss";
import classname from "classnames";


export default function DayListItem(props) {
  const formatSpots = spot => {
    if (spot > 1) {
      return `${spot} spots remaining`
    }
    else if (spot >0) {
      return `${spot} spot remaining`
    }
    else {
      return `no spots remaining`
    }
  }
  const spotsLeft = formatSpots(props.spots);

  const dayClass = classname(
    "day-list__item",
    { "day-list__item--selected": props.selected },
    { "day-list__item--full": props.spots === 0 }
  )

  return (
    <li className={dayClass} data-testid="day"
      onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{spotsLeft}</h3>
    </li>
  );
}

