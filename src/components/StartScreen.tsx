// import "./startscreen.css";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";

interface Props {
  getTimerInfo: (e: any) => void;
}

const StartScreen: React.FunctionComponent<Props> = ({ getTimerInfo }: Props): JSX.Element => {

  const [timer, setTimer] = React.useState<number>(0);

  const handleChange = (e: any): void => {
    setTimer(+(e.target as HTMLSelectElement).value)
  }

  const handleClick = (e: React.SyntheticEvent) : void => {
    getTimerInfo(timer)
  }

  return (
    <Box className='h-full w-full flex flex-col items-center'>
      <Box className='mt-20 font-bold text-5xl text-center text-blue drop-shadow-sm'>
        Welcome to{" "}
        <Box component='span' className='text-red-500 drop-shadow-sm'>
          Typing Master Lite
        </Box>{" "}
        Edition
      </Box>
      <Box className='mt-20 flex flex-col gap-y-4 text-black-light'>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Duration</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={1}
              label='Duration'
              onChange={handleChange}
            >
              <MenuItem value={1}>1 Minutes</MenuItem>
              <MenuItem value={2}>2 Minutes</MenuItem>
              <MenuItem value={5}>5 Minutes</MenuItem>
            </Select>
            <Button onClick={handleClick} variant='outlined'>Start Typing...</Button>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

export default StartScreen;
