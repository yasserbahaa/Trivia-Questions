import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect(props) {
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    props.setVariable(event.target.value);
  };

  const choices = props.values.map((elem) => {
    return (
      <MenuItem key={elem} value={elem}>
        {elem}
      </MenuItem>
    );
  });

  return (
    <Box sx={{ minWidth: 110 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{props.variable}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={props.variable}
          onChange={handleChange}
        >
          {/* <MenuItem value={"Easy"}>Easy</MenuItem>
          <MenuItem value={"Medium"}>Medium</MenuItem>
          <MenuItem value={"Hard"}>Hard</MenuItem> */}
          {choices}
        </Select>
      </FormControl>
    </Box>
  );
}
