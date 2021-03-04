import React from "react";

const DurationValue = props => {

  let months
  if (props.duration.months) {
    const noun = `month${ props.duration.days !== 1 ? 's' : ''}`
    months = `${props.duration.months} ${noun}`
  }

  let days
  if (props.duration.days || props.duration.months === 0) {
    const noun = `day${ props.duration.days !== 1 ? 's' : ''}`
    days = `${props.duration.days} ${noun}`
  }

  return (
    <span>
      {months} {days}
    </span>
  )
}

export default DurationValue
