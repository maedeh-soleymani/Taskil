import { Alert, Box, Button, useTheme } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useContext, useState } from "react";
import { TaskContext } from "../../context/TaskContext";
// import loadingGif from "../assets/Thinking Think GIF by The official GIPHY Page for Davis Schulz.gif";

// curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent" \
//   -H 'Content-Type: application/json' \
//   -H 'X-goog-api-key: AIzaSyDSN_vnc6aNqA90Y9Qa3N4YfQXoT3NmMlI' \
//   -X POST \
//   -d '{
//     "contents": [
//       {
//         "parts": [
//           {
//             "text": "Explain how AI works in a few words"
//           }
//         ]
//       }
//     ]
//   }'

const SuggestTaskAI = () => {
  const { tasks, loading, setLoading, AllTaskDoneFlag } =
    useContext(TaskContext);
  const theme = useTheme();
  const [ShowAIResponse, setShowAIResponse] = useState(false);
  const [AIResponse, setAIResponse] = useState("");

  // ------------------- AI Function Start -------------------------------
  const sendToAI = async () => {
    console.log("SuggestTaskAI", AllTaskDoneFlag);

    if (AllTaskDoneFlag) {
      setAIResponse(
        "Awesome! You’ve finished all your tasks. now take a break, you deserve it!",
      );
      setShowAIResponse(true);
      return;
    }
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    const prompt = `
You are a productivity assistant.

I will give you a list of tasks. Each task has:
- title
- description
- due_date
- created_at
- priority (low, medium, high)
- state (0,1) : 0 means todo and 1 means Done

Your job:
Choose the BEST task to do RIGHT NOW based on:
- urgency (due_date)
- priority
- how recent it is
- task state
- logical importance

you shouldnt suggest task with state 1 (because its already done)

Return ONLY a JSON like this:
{
  "title": "...",
  "reason": "short explanation"
}

Tasks:
${JSON.stringify(tasks)}`;
    setShowAIResponse(true);
    setLoading(true);
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      },
    );

    const data = await res.json();
    console.log(data);
    const response = JSON.parse(
      data.candidates?.[0]?.content?.parts?.[0]?.text,
    );
    console.log(response);

    setAIResponse(`Go for -${response.title}- because -${response.reason}-`);
    setLoading(false);
    // setShowAIResponse(true);
    // return data.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log(data.candidates?.[0]?.content?.parts?.[0]?.text);
  };

  // ------------------- AI Function End -------------------------------

  return (
    <>
      <Button
        disabled={loading}
        startIcon={<AutoAwesomeIcon />}
        color={theme.custom.gradients.primary}
        sx={(theme) => ({
          background: theme.custom.gradients.primary,
          color: "#fff",

          "&:hover": {
            background: theme.custom.gradients.secondary,
          },
        })}
        onClick={() => sendToAI()}
      >
        What should I do right now?
      </Button>
      {ShowAIResponse ? (
        <Alert
          icon={
            <AutoAwesomeIcon
              sx={{ color: theme.palette.secondary.main }}
              fontSize="inherit"
            />
          }
          severity="success"
          sx={{
            background: theme.custom.background.secondary,
            color: theme.palette.secondary.main,
            fontWeight: "400",
          }}
          onClose={() => {
            setShowAIResponse(false);
          }}
        >
          {loading ? (
            <Box sx={{ flex: "1" }}>
              {/* <h3>Thinking ...</h3> */}
              Thinking ...
              {/* <img src={loadingGif} alt="loading gif" width={"300px"} /> */}
            </Box>
          ) : (
            AIResponse
          )}
        </Alert>
      ) : (
        ""
      )}
      {/* using theme */}
      {/* <Box
        sx={(theme) => ({
          background: theme.custom.gradients.primary,
          color: "#fff",
          padding: 2,
        })}
      >
        hi
      </Box> */}
    </>
  );
};

export default SuggestTaskAI;
