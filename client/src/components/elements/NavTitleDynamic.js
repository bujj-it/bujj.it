import React, {useEffect, useState, useRef} from "react";
import { connect } from 'react-redux';
import {isInitialSectionSelector} from 'selectors/budgetFlowSelectors'

const mapStateToProps = state => {
  return {
    isInitalSection: isInitialSectionSelector(state)
  };
}

const NavTitleDynamic = props => {

  const navTitleRef = useRef(null)

  const [targetFontSize, _setTargetFontSize] = useState(null);
  const targetFontSizeRef = React.useRef(targetFontSize);
  const setTargetFontSize = data => {
    targetFontSizeRef.current = data;
    _setTargetFontSize(data);
  };

  const [initialPadding, _setInitialPadding] = useState(null);
  const initialPaddingRef = React.useRef(initialPadding);
  const setInitialPadding = data => {
    initialPaddingRef.current = data;
    _setInitialPadding(data);
  };

  const [initialFontSize, _setInitialFontSize] = useState(null);
  const initialFontSizeRef = React.useRef(initialFontSize);
  const setInitialFontSize = data => {
    initialFontSizeRef.current = data;
    _setInitialFontSize(data);
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY
    const newPadding = Math.max(0, initialPaddingRef.current - (scrollTop / 3))

    const sizeRatio = newPadding / initialPaddingRef.current
    const fontSizeDifference = initialFontSizeRef.current - targetFontSizeRef.current
    const newFontSize = Math.trunc(sizeRatio * fontSizeDifference) + targetFontSizeRef.current
    const navTitleElement = navTitleRef.current

    window.requestAnimationFrame(() => {
      navTitleElement.style.paddingTop = `${newPadding}px`;
      navTitleElement.style.paddingBottom = `${newPadding}px`;
      navTitleElement.style.fontSize = `${newFontSize}px`
    })
  }

  useEffect(() => {
    const navTitleElement = navTitleRef.current
    const navTitleStyle = getComputedStyle(navTitleElement) 
    const navBarStyle = getComputedStyle(navTitleElement.parentElement)

    setTargetFontSize(parseInt(navBarStyle.fontSize, 10))
    setInitialPadding(parseInt(navTitleStyle.paddingTop, 10))
    setInitialFontSize(parseInt(navTitleStyle.fontSize, 10))    

    if (props.isInitalSection) {
      handleScroll()
      window.addEventListener('scroll', handleScroll)
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [props.isInitalSection])


  let minimizeHeaderClass
  if (!props.isInitalSection) {
    window.removeEventListener('scroll', handleScroll)
    const navTitleElement = navTitleRef.current
    window.requestAnimationFrame(() => {
      navTitleElement.style.paddingTop = null;
      navTitleElement.style.paddingBottom = null;
      navTitleElement.style.fontSize = null
    })
    
    minimizeHeaderClass = 'minimized'
  }

  return (
    <div className="nav-item nav-title dynamic">
      <div className={`nav-title nav-title-homepage ${minimizeHeaderClass}`} ref={navTitleRef}>
        bujj.it
      </div>
    </div>
  )
}


export default  connect(mapStateToProps)(NavTitleDynamic);