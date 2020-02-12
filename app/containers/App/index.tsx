import React from "react";
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import { loadSession } from "./actions";

const AppWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`


export default function App() {
  const dispatch = useDispatch();
  return (
    <AppWrapper>
      <button onClick={() => dispatch(loadSession())}>This is a magic button</button>
    </AppWrapper>
  )
}