import {Box, Typography, Button, Stack, Divider, TextField} from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../assets/logo2.png";
import Googlelogo from "../../assets/google.png";

function Login() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to top, #20002c, #cbb4d4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        
      }}
    >
      
      <Box
        sx={{
          bgcolor: "#fff",
          width: "100%",
          maxWidth: "370px",
          borderRadius: 3,
          
          p: 4,
        }}
      >
        
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Box
            component="img"
            src={logo}
            alt="Platform logo"
            sx={{ height: 32 }}
          />
        </Box>


        {/* Form */}
        <Stack spacing={2}>
          <TextField
            label="Email"
            placeholder="example@gmail.com"
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            placeholder="Enter your password"
            fullWidth
          />
        </Stack>

        {/* Forgot password */}
        <Box sx={{ textAlign: "right", mt: 1 }}>
          <Typography
            component={Link}
            to="/forgot-password"
            sx={{
              fontSize: 14,
              color: "black",
              
            }}
          >
            Forgot your password?
          </Typography>
        </Box>

        {/* Sign in button */}
        <Button
          variant="contained"
          
          fullWidth
          sx={{
            mt: 3,
            py: 1.2,
            fontSize: "14px",
            
            bgcolor: "#572c67"
          }}
        >
          Sign in
        </Button>

        
        <Divider sx={{ my: 2, fontFamily: "sans-serif" }}>Or</Divider>

        
        <Button
          variant="outlined"
          fullWidth
          sx={{color: "black", fontSize: "14px", borderColor: "#572c67"}}
          startIcon={
            <Box
              component="img"
              src={Googlelogo}
              
              sx={{ height: 17,  }}
            />
          }
        >
          Sign in with Google
        </Button>

        
        <Typography
          sx={{ textAlign: "center", mt: 3, fontSize: 14 }}
        >
          Don't have an account?
          <Typography
            component={Link}
            to="/signup"
            sx={{
              fontSize: 14,
              color: "black",
              pl: "3px"
            }}
          >
            Sign up
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
}

export default Login;