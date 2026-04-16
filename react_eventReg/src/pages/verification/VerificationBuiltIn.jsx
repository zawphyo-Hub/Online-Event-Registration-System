import { Box, Typography, Button, Card, CardContent, Stack } from "@mui/material";
import { Html5Qrcode } from "html5-qrcode";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { toast } from "react-toastify";
import logo from "../../assets/logo3.png";

function VerificationBuiltIn() {
  const navigate = useNavigate();
  const scannerRef = useRef(null);

  const handleScanResult = async (decodedText) => {
    const secretKey = decodedText.split("/verify-attendee/")[1];
    if (secretKey) {
      if (scannerRef.current) {
        try {
          await scannerRef.current.stop();
        } catch {}
      }
      navigate(`/verify-attendee/${secretKey}`);
    }
  };

  const startScanner = async () => {
    const html5QrCode = new Html5Qrcode("qr-reader");
    scannerRef.current = html5QrCode;

    try {
      await html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        handleScanResult,
        () => {}
      );
    } catch (err) {
      console.error("Camera start failed", err);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const html5QrCode = new Html5Qrcode("qr-reader");

    try {
      const decodedText = await html5QrCode.scanFile(file, false);

      const secretKey = decodedText.split("/verify-attendee/")[1];

      if (secretKey) {
        navigate(`/verify-attendee/${secretKey}`);
      }
    } catch (err) {
      toast.error("Please upload a valid QR code.");
     
    }

    e.target.value = "";
  };

  return (
    <Box >
      <Navbar />
      <Box sx={{ minHeight: "100vh", background:
            "linear-gradient(135deg, #0f172a 0%, #0f3d68 45%, #0b84d8 100%)", }}>

      <Box
        sx={{
          maxWidth: 820,
          mx: "auto",
          px: 2,
          py: { xs: 4, md: 6 },
        }}
      >
        <Card
          elevation={0}
          sx={{
            borderRadius: 4,
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
            overflow: "hidden",
            bgcolor: "white",
          }}
        >
          <Box
            sx={{
              px: { xs: 3, md: 4 },
              py: { xs: 3, md: 4 },
            //   background: "linear-gradient(135deg, rgba(63,162,224,0.10), rgba(70,174,247,0.06))",
              borderBottom: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            {/* <Box
              component="img"
              src={logo}
              alt="Agenda logo"
              sx={{ height: 34, width: "auto", mb: 2 }}
            /> */}

            <Typography
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.5rem", md: "1.8rem" },
                lineHeight: 1.1,
              }}
            >
              Verify Attendee
            </Typography>

            <Typography
              sx={{
                mt: 1,
                color: "text.secondary",
                maxWidth: 620,
                lineHeight: 1.7,
              }}
            >
              Use your device camera to scan a QR code, or upload a screenshot/photo of the QR code to verify attendee check-in.
            </Typography>
          </Box>

          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              sx={{ mb: 3 }}
            >
              <Button
                variant="contained"
                onClick={startScanner}
                sx={{
                  borderRadius: 2.2,
                  fontWeight: 700,
                  px: 3,
                  py: 1.2,
                  bgcolor: "#3a9ad6",
                  "&:hover": { bgcolor: "#3a9ad6", opacity: 0.92 },
                }}
              >
                Start Camera
              </Button>

              <Button
                variant="outlined"
                component="label"
                sx={{
                  borderRadius: 2.2,
                  fontWeight: 700,
                  px: 3,
                  py: 1.2,
                }}
              >
                Upload QR Image
                <input hidden type="file" accept="image/*" onChange={handleFileUpload} />
              </Button>
            </Stack>

            <Box
              id="qr-reader"
              sx={{
                width: "100%",
                minHeight: 320,
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: 3,
                overflow: "hidden",
                backgroundColor: "#fafafa",
              }}
            />

            <Typography
              sx={{
                mt: 2,
                color: "text.secondary",
                fontSize: "0.92rem",
                lineHeight: 1.6,
              }}
            >
              Tip: For faster results, make sure the QR code is fully visible.
            </Typography>
          </CardContent>
        </Card>
      </Box>
      </Box>
    </Box>
  );
}

export default VerificationBuiltIn;