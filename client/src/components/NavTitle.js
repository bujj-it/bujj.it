import React from "react";

class NavTitle extends React.Component {
  constructor(props) {
    super(props)
    this.divRef = React.createRef()
    this.state = {
      baseTopOffset: null,
      currentTopOffset: null,
      baseFontSize: null,
      currentFontSize: null
    };
  }

  componentDidMount = () => {
    if (this.props.location.pathname == "/") {
      const elementStyle = getComputedStyle(this.divRef.current) // gets all styles for current element 
      const topOffset = parseInt(elementStyle.top, 10)
      const fontSize = parseInt(elementStyle.fontSize, 10)
      this.setState({
        baseTopOffset: topOffset,
        currentTopOffset: topOffset,
        baseFontSize: fontSize,
        currentFontSize: fontSize
      })
      window.addEventListener('scroll', this.handleScroll)
    }
  }
  
  componentWillUnmount = () => {
    if (this.props.location.pathname == "/") {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }

  handleScroll = (event) => {
    const elementStyle = getComputedStyle(this.divRef.current)
    const currentFontSize = parseInt(elementStyle.fontSize, 10)
    // const newFontSize = try make this change size relative to max and min we like (Add data to element? Get from SASS? Get from somewhere?)
    const scrollTop = event.srcElement.documentElement.scrollTop
    const newTopOffset = Math.max(0, this.state.baseTopOffset - scrollTop)
    this.setState({
      currentTopOffset: newTopOffset
    })
  }
  
  render() {
    let titleClass = "navTitle";

    if ( this.props.location.pathname == "/") {
      titleClass += " navTitleHomepage";
    }

    return (  
      <>
        <div className={titleClass} ref={this.divRef} style={{top: this.state.currentTopOffset, fontSize: this.state.currentFontSize}}>
          bujj.it
        </div>
      </>
    );
  }
};

export default NavTitle;