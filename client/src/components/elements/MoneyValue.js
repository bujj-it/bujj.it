import React from "react";

export const MoneyValue = props => {

  const sign = props.value < 0 ? '-' : ''
  const poundsValue = Math.abs(props.value / 100)
  let value
  if (props.value % 100 === 0 ) {
    value = poundsValue.toString()
  } else {
    value = poundsValue.toFixed(2).toString()
  }

  return (
    <span>
      {sign}£{value}
    </span>
  )
}