import React, { useState } from "react";
import { getQuestions } from "../api";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { FormControl, InputLabel, NativeSelect } from "@mui/material";


const TestIndexPage = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(10);

  return (
    <div className="container pt-3">
    <div className="test">
      <FormControl className="test__form">
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Number of questions
        </InputLabel>
        <NativeSelect
          className="test__input"
          onChange={(e) => setCount(e.target.value)}
        >
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
          <option value={25}>25</option>
          <option value={30}>30</option>
        </NativeSelect>
      </FormControl>
      <FormControl className="test__form">
        <InputLabel variant="standard" htmlFor="category">
          Select Category
        </InputLabel>
        <NativeSelect
          className="test__input"
        >
          <option value="sport">Sport</option>
        </NativeSelect>
      </FormControl>
        <Button onClick={() => getQuestions(count, navigate)} className="test__btn" color="success" variant="contained">
          Start
        </Button>
    </div>
  </div>
   
  );
};

export default TestIndexPage;