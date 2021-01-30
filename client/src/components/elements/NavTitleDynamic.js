import React, {useEffect, useState, useRef} from "react";

const NavTitleDynamic = () => {

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

  const [loadInitialStyles] = useState(null);

  const handleScroll = () => {
    const scrollTop = window.scrollY
    const newPadding = Math.max(0, initialPaddingRef.current - scrollTop)

    const fontSizeDifference = initialFontSizeRef.current - targetFontSizeRef.current
    const sizeRatio = newPadding / initialPaddingRef.current
    const newFontSize = Math.floor(sizeRatio * fontSizeDifference) + targetFontSizeRef.current

    requestAnimationFrame(() => {
      const navTitleElement = navTitleRef.current
      navTitleElement.style.paddingTop = `${newPadding}px`;
      navTitleElement.style.fontSize = `${newFontSize}px`
    })
  }

  useEffect(() => {
    const navTitleElement = navTitleRef.current
    const navTitleStyle = getComputedStyle(navTitleElement) 
    const navBarStyle = getComputedStyle(navTitleElement.parentElement.parentElement.parentElement)

    setTargetFontSize(parseInt(navBarStyle.fontSize, 10))
    setInitialPadding(parseInt(navTitleStyle.paddingTop, 10))
    setInitialFontSize(parseInt(navTitleStyle.fontSize, 10))

    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [loadInitialStyles])

  return (
    <div className="nav-item dynamic">
      <div className="nav-title nav-title-homepage" ref={navTitleRef}>
        bujj.it
      </div>
    </div>
  )
}

export default NavTitleDynamic;