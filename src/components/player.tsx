import React, { useEffect, useRef, useReducer, useLayoutEffect } from "react";
import { SyntheticEvent, MutableRefObject } from "react";
import { State } from "./type";

import text from "../text.json";

// MUI Components
import { Box, Stack } from "@mui/material";

// Local Components
import DisplayText from "./components/Text";
import InputBox from "./components/TextArea";

// CSS
import "./Home.css";

const initialState: State = {
  curInputIndex: 0,
  inputValue: "",
  errorNode: [],
  cursor: 0,
};

const reducer = (state: State, updatedState: any) => ({ ...state, ...updatedState });

function Home(): JSX.Element {
  const mytext: string = text[0].text;
  const [state, setState] = useReducer(reducer, initialState); // state
  const rawValue: string[] = mytext.split(""); // text as an array
  const cursorRef = useRef<HTMLHeadingElement>(null); // cursor reference for input
  const { curInputIndex, errorNode, inputValue } = state; // destructuring state

  const handleChange = (e: SyntheticEvent) => {
    setState({
      inputValue: (e.target as HTMLInputElement).value,
      curInputIndex: (e.target as HTMLInputElement).value.length,
      cursor: (e.target as HTMLInputElement).selectionStart,
    });
  };

  // creating object reference to prevent looping
  const errorNodeRef: MutableRefObject<string[]> = useRef(errorNode);

  // synchronous update
  useLayoutEffect(() => {
    (cursorRef.current as HTMLElement).focus();
  }, [cursorRef]);

  useEffect(() => {
    if (inputValue) {
      const localState: string[] = [...errorNodeRef.current];
      // managing local state since we cannot have updated state access through loop running
      for (const [i] of inputValue.split("").entries()) {
        if (i > inputValue.length) {
          // not to loop through the unwritten text
          return;
        }
        if (mytext.charAt(i) !== inputValue.charAt(i)) {
          if (!localState.includes(i)) {
            localState.push(i);
            setState({
              get errorNode(): string[] {
                // getter
                return localState;
              },
            });
          }
        } else {
          setState({
            get errorNode(): string[] {
              // getter
              const getIndex: number = localState.indexOf(i);
              if (getIndex !== -1) {
                localState.splice(getIndex, 1); // removing node if text got updated in middle
                return localState;
              }
              return localState;
            },
          });
        }
      }
    } else {
      setState(initialState);
    }
  }, [inputValue, mytext, errorNodeRef]);

  return (
    <Box>
      <DisplayText errorNode={errorNode} curInputIndex={curInputIndex} rawValue={rawValue} />
      <Stack direction='row' justifyContent='center' alignItems='center'>
        <InputBox handleChange={handleChange} inputValue={inputValue} ref={cursorRef} />
      </Stack>
    </Box>
  );
}

export default Home;
