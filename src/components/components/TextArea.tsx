import React, { forwardRef } from "react";

interface Props {
  inputValue: string;
  handleChange: (e: React.SyntheticEvent) => void;
}

const InputBox = (props: Props, ref: any): JSX.Element => {
  return (
    <textarea
      autoFocus={true}
      ref={ref}
      className='input-box cursor-auto shadow rounded-md p-4 outline-none border-none'
      value={props.inputValue}
      onChange={props.handleChange}
      onBlur={() => ref.current?.focus()} // this works as click away listener
      placeholder='Start Typing...'
    />
  );
};

export default forwardRef(InputBox);
