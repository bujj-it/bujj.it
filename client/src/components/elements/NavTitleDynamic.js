import React, {useEffect, useState, useRef} from "react";

const NavTitleDynamic = () => {

  const navTitleRef = useRef(null)

  const [loadInitialStyles] = useState(null);

  const [isHeaderMinimised, _setIsHeaderMinimised] = useState(false);
  const isHeaderMinimisedRef = React.useRef(isHeaderMinimised);
  const setIsHeaderMinimised = data => {
    isHeaderMinimisedRef.current = data;
    _setIsHeaderMinimised(data);
  };

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

  useEffect(() => {
    const navTitleElement = navTitleRef.current
    const navTitleStyle = getComputedStyle(navTitleElement) 
    const navBarStyle = getComputedStyle(navTitleElement.parentElement)

    setTargetFontSize(parseInt(navBarStyle.fontSize, 10))
    setInitialPadding(parseInt(navTitleStyle.paddingTop, 10))
    setInitialFontSize(parseInt(navTitleStyle.fontSize, 10))

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const newPadding = Math.max(0, initialPaddingRef.current - (scrollTop / 3))
  
      if (!isHeaderMinimisedRef.current || newPadding) {
        const sizeRatio = newPadding / initialPaddingRef.current
        const fontSizeDifference = initialFontSizeRef.current - targetFontSizeRef.current
        const newFontSize = Math.trunc(sizeRatio * fontSizeDifference) + targetFontSizeRef.current
        const navTitleElement = navTitleRef.current
    
        window.requestAnimationFrame(() => {
          navTitleElement.style.paddingTop = `${newPadding}px`;
          navTitleElement.style.paddingBottom = `${newPadding}px`;
          navTitleElement.style.fontSize = `${newFontSize}px`
        })
        if (newPadding === 0) {
          setIsHeaderMinimised(true)
        }
      }
    }

    handleScroll()

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