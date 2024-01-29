import React from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import ChatInput from "./ChatInput";

const ChatInterface = () => {
  return (
    <Box
      flexGrow={1}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h4" align="center" gutterBottom>
        Vanguard AI Helper
      </Typography>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={6} lg={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Examples
              </Typography>
              {/* List your examples here */}
              <Typography variant="body2" color="textSecondary" component="p">
                How to transfer money into Vanguard
              </Typography>
              {/* Add more examples as needed */}
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Capabilities
              </Typography>
              {/* List your capabilities here */}
              <Typography variant="body2" color="textSecondary" component="p">
                Remembers what user said earlier in the conversation
              </Typography>
              {/* Add more capabilities as needed */}
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Box width="1000px" display="flex" justifyContent="center" p={4} mt={30}>
        <ChatInput />
      </Box>
    </Box>
  );
};

export default ChatInterface;
