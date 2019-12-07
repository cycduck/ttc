import React from 'react';

export default function Search(props) {

  return (
    <>
      <label htmlFor="search">Enter bus code or intersection: </label>
      <input onChange={props.busQuery} name="search" placeholder="Enter bus code or intersection" />
    </>
  )
}