import React, { Component } from "react";
import ReactModal from "react-modal";
import "./modal.scss";
import anime from "animejs";

let title = 'Transit.fetch( )';

const Span = React.forwardRef((props, ref) => (
  <span className="letter" ref={ref}>
    {props.children}
  </span>
))


export default class Modal extends Component {
  anime = () => {
    anime.timeline({loop: false})
  .add({
    targets: [...this.inputRefs],
    scale: [4,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 950,
    delay: (el, i) => 70*i
  }).add({
    targets: this.title,
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 20000
  });
  };

  componentDidUpdate() {
    // setTimeout(this.anime(), 1000)
    // anime will not work without crashing, despite settimeout/ no loop, this is because the set state refreshes the page and the refs gets refreshed?
    console.log(typeof this.inputRefs);
  }

  inputRefs = [];
  setRef = (ref) => {
    this.inputRefs.push(ref);
  };

  render() {
    return (
      <ReactModal
        isOpen={this.props.modalSwitch}
        className="modal"
        overlayClassName="modal__overlay"
      >
        <div className="modal__container">
          <h1 className="modal__title" ref={title => (this.title = title)}>
            {title.split("").map((letter, i) => (
              <Span
                ref={this.setRef}
                key={letter}
              >
                {letter}
              </Span>)
            )}
            {/* <span class="letter" ref={letter =>(this.t = letter)}>T</span>
            <span class="letter" ref={letter =>(this.r = letter)}>r</span>
            <span class="letter" ref={letter =>(this.a = letter)}>a</span>
            <span class="letter" ref={letter =>(this.n = letter)}>n</span>
            <span class="letter" ref={letter =>(this.s = letter)}>s</span>
            <span class="letter" ref={letter =>(this.i = letter)}>i</span>
            <span class="letter" ref={letter =>(this.t2 = letter)}>t</span>
            <span class="letter" ref={letter =>(this.dot = letter)}>.</span>
            <span class="letter" ref={letter =>(this.f = letter)}>f</span>
            <span class="letter" ref={letter =>(this.e = letter)}>e</span>
            <span class="letter" ref={letter =>(this.t3 = letter)}>t</span>
            <span class="letter" ref={letter =>(this.c = letter)}>c</span>
            <span class="letter" ref={letter =>(this.h = letter)}>h</span>
            <span class="letter" ref={letter =>(this.open = letter)}>(</span>
            <span class="letter" ref={letter =>(this.close = letter)}>)</span> */}
          </h1>
          <p className="modal__intro">
            a real time transit map for Torontonians
          </p>
          <p className="modal__intro">
            escape to your happy place
          </p>
          <div className="modal__buttons">
            <button
              type="button"
              className="modal__close"
              onClick={this.props.modalHandle}
            >
              Show me the buses!
            </button>
            <button
              type="button"
              className="modal__tour"
              onClick={this.props.tourHandle}
            >
              Give me a tour!
            </button>
          </div>
        </div>
      </ReactModal>
    );
  }
}
