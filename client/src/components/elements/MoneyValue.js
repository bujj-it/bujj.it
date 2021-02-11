import React from "react";

export const MoneyValue = props => {

  let sign
  let warningClass
  if (props.value < 0) {
    sign = '-'
    warningClass = 'warning'
  }

  const poundsValue = Math.abs(props.value / 100)
  let value
  if (props.value % 100 === 0 ) {
    value = poundsValue.toString()
  } else {
    value = poundsValue.toFixed(2).toString()
  }

  return (
    <span className={warningClass}>
      {sign}£{value}
    </span>
  )
}