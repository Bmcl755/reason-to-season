import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Modal,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "../../contexts/AppContextProvider";

interface PopupProps {
  open: boolean;
  onClose: () => void;
}

const AxialTiltReview: React.FC<PopupProps> = ({ open, onClose }) => {
  const { commentMessage, createCommentMessage, userName } =
    useContext(AppContext);
  const theme = useTheme();
  const [input, setInput] = useState("");

  // TODO use this method to add comment in the discussion, remove this after
  const handleSendMessage = () => {
    if (input.trim()) {
      createCommentMessage(input);
      setInput("");
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        maxWidth: 700,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <Card
        sx={{
          maxWidth: 700,
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#333333",
                marginBottom: "20px",
                marginTop: "20px",
                fontWeight: "bold",
              }}
            >
              Leave a comment for others!
            </Typography>
            <hr style={{ width: "100%" }}></hr>
            <Typography
              variant="h6"
              sx={{ color: "#333333", marginBottom: "10px" }}
            >
              What would happen if the Earth was knocked on to a different tilt?
            </Typography>
            <TextField
              value={input}
              onChange={(e) => setInput(e.target.value)}
              fullWidth
              placeholder="Type a message..."
              sx={{
                marginY: "15px",
                mr: 1,
                backgroundColor: "white",
                borderRadius: "5px",
                "& .MuiInputBase-input": {
                  color: "black",
                },
              }}
            />
            <Button
              onClick={handleSendMessage}
              variant="contained"
              sx={{
                marginTop: "10px",
                marginBottom: "20px",
                backgroundColor: theme.palette.primary.main,
                color: "white",
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              Send
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default AxialTiltReview;
