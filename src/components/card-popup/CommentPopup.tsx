import { TabPanel } from "@mui/lab";
import {
  Box,
  Button,
  LinearProgress,
  Modal,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import CancelIcon from "@mui/icons-material/Cancel";
import { AppContext } from "../../contexts/AppContextProvider";
import {
  MemoryEssence,
  ScientistOne,
  ScientistThree,
  ScientistTwo,
} from "../../assets";
import { Comment } from "../comment/Comment";

type CommentPopupProps = {
  open: boolean;
  onClose: () => void;
};
export const CommentPopup = ({ open, onClose }: CommentPopupProps) => {
  const theme = useTheme();

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80vw",
          p: 4,
          height: "80vh",
          borderRadius: "16px",
          background: "linear-gradient(to right, #f8e7e7, #e7f8f1)",
          display: "flex",
          flexDirection: "column",
          boxShadow: 24,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: 2,
            borderBottom: "2px solid",
            borderColor: theme.palette.grey[500],
          }}
        >
          <Typography
            sx={{
              fontSize: "50px",
              textAlign: "center",
              flexGrow: 1,
              color: theme.palette.primary.dark,
            }}
          >
            Comment
          </Typography>
          <Button onClick={onClose}>
            <CancelIcon
              sx={{ color: theme.palette.grey[500], fontSize: "4rem" }}
            />
          </Button>
        </Box>
        <Comment />
      </Box>
    </Modal>
  );
};
