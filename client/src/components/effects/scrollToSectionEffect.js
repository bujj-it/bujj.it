import {useEffect} from "react";

export default (sectionRef, isCurrentSection) => {

  useEffect(() => {
    if (isCurrentSection) {
      const sectionTop = sectionRef.current.getBoundingClientRect().top
      const currentScrollPosition = window.scrollY
      const nextSectionScrollHeight = sectionTop + currentScrollPosition
      window.scroll({
        top: nextSectionScrollHeight,
        left: 0, 
        behavior: 'smooth'
      });
    }
  })
}