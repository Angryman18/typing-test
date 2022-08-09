import { Card } from "@mui/material";
import { FunctionComponent } from "react";

interface Props {
  rawValue: string[];
  errorNode: string[];
  curInputIndex: number;
}

const DisplayText: FunctionComponent<Props> = ({
  rawValue,
  errorNode,
  curInputIndex,
}: Props): JSX.Element => {
  return (
    <Card className='m-8 p-4 flex justify-center items-center flex-col'>
      <p className='text-lg'>
        {rawValue.map((item: string, idx: number) => {
          if (idx === curInputIndex) {
            return (
              <span
                dangerouslySetInnerHTML={{ __html: item }}
                className='bg-green text-2xl font-bold underline text-white'
                key={idx}
              ></span>
            );
          }
          if (errorNode.includes(String(idx))) {
            // if its an error
            return (
              <span
                dangerouslySetInnerHTML={{ __html: item }}
                className='bg-red-500 text-2xl text-white'
                key={idx}
              ></span>
            );
          }
          return (
            <span className='text-2xl' key={idx}>
              {item}
            </span>
          );
        })}
      </p>
    </Card>
  );
};

export default DisplayText;
