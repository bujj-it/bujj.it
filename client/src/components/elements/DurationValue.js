import React from "react";

export const DurationValue = props => {

  let months
  if (props.duration.months) {
    const noun = `month${ props.duration.months > 1 ? 's' : ''}`
    months = `${props.duration.months.toString()} ${noun}`
  }

  let days
  if (props.duration.days) {
    const noun = `day${ props.duration.days > 1 ? 's' : ''}`
    days = `${props.duration.days.toString()} ${noun}`
  }

  return (
    <span>
      {months} {days}
    </span>
  )
}