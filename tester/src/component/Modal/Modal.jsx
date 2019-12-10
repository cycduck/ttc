import React, { Component } from "react";
import ReactModal from "react-modal";
import "./modal.scss";
import ReactDOM from "react-dom";
import anime from "animejs";

let title = 'Transit.fetch( )';

const Span = React.forwardRef((props, ref) => (
  <span className="letter" ref={ref}>
    {props.children}
  </span>
))


export default class Modal extends Component {
  
  inputRefs = [];
  setRef = (ref) => {
    this.inputRefs.push(ref);
    console.log(ref)
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
