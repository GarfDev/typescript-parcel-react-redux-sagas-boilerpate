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
const Button = styled.button`
  padding: 20px;
  border: 1px solid grey;
  box-shadow: 1px 1px 2px black;
  background-color: white;
  border-bottom: 4px solid black;
  border-right: 4px solid black;
  font-size: 20px;
  font-weight: 500;
  border-radius: 4px;
  &:active {
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    border-top: 4px solid transparent;
    border-left: 4px solid transparent;
  }
`

export default function App() {
  const dispatch = useDispatch();
  return (
    <AppWrapper>
      <Button onClick={() => dispatch(loadSession())}>This is a magic button</Button>
    </AppWrapper>
  )
}