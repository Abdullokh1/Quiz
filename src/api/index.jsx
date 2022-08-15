import axios from "axios";

const getQuestions = async (count, navigate) => {
  const res = await axios.get(`https://opentdb.com/api.php?amount=${count}&category=21&type=multiple`);
  navigate("/quiz", {
    state: {
      tests: res.data.results,
    },
  });
};

export { getQuestions };