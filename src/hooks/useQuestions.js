import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useQuestions(videoID) {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    async function fetchQuestions() {
      const db = getDatabase();
      const questionRef = ref(db, "quiz/" + videoID + "/questions");
      const questionQuery = query(questionRef, orderByKey());

      try {
        setError(false);
        setLoading(true);
        const snapshot = await get(questionQuery);
        setLoading(false);
        if (snapshot.exists()) {
          setQuestions((prevQuestions) => {
            return [...prevQuestions, ...Object.values(snapshot.val())];
          });
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    }

    fetchQuestions();
  }, [videoID]);

  return {
    loading,
    error,
    questions,
  };
}
