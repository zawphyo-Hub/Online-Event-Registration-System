import TemplateA from "./TemplateA";

function TestingTemplate() {
  const template = {
    template_name: "Elegant Purple",
    primary_color: "#024b24",
    secondary_color: "#000000",
    background_color: "#FFFFFF",
    font_family: "Poppins, sans-serif",
    template_layout: "LAYOUT_A",
  };

  return <TemplateA template={template} />;
}

export default TestingTemplate;

// [
//     {
//     "template_name": "Basic-Normal Style",
//     "template_description": "Clean, neutral layout focused on clarity and readability — a reliable default template for any event.",
//     "primary_color": "#000000",
//     "secondary_color": "#000000",
//     "background_color": "#FFFFFF",
//     "font_family": "Poppins, sans-serif",
//     "template_layout": "LAYOUT_A",
//     "template_img_url": null
//   },
  
//   {
//     "template_name": "Birthday Party",
//     "template_description": "Bright, friendly design with bold headings and fun accents — excellent for birthday parties and casual events.",
//     "primary_color": "#0c82ad",
//     "secondary_color": "#000000",
//     "background_color": "#FFFFFF",
//     "font_family": "Poppins, sans-serif",
//     "template_layout": "LAYOUT_B",
//     "template_img_url": "https://res.cloudinary.com/dlj9ags4d/image/upload/v1770759260/birthday_template_imjtlm.jpg"
//   },
//   {
//     "template_name": "Game Party",
//     "template_description": "High-energy, modern look with neon accents on a darker canvas — great for gaming nights and e-sports meetups.",
//     "primary_color": "#00E5FF",
//     "secondary_color": "#000000",
//     "background_color": "#FFFFFF",
//     "font_family": "Poppins, sans-serif",
//     "template_layout": "LAYOUT_C",
//     "template_img_url": "https://res.cloudinary.com/dlj9ags4d/image/upload/v1770759446/game_template_ekr7ae.jpg"
//   },
//   {
//     "template_name": "Reunion/Gathering",
//     "template_description": "Warm, approachable styling with comfortable typography — ideal for reunions, family gatherings, and socials.",
//     "primary_color": "#024b24",
//     "secondary_color": "#000000",
//     "background_color": "#FFFFFF",
//     "font_family": "Poppins, sans-serif",
//     "template_layout": "LAYOUT_D",
//     "template_img_url": "https://res.cloudinary.com/dlj9ags4d/image/upload/v1770759961/gathering_nestty.jpg"
//   },
//   {
//     "template_name": "Private/Indoor party",
//     "template_description": "Sleek, upscale aesthetic with dark backgrounds and gold accents — suited for invite-only or VIP events.",
//     "primary_color": "#024b24",
//     "secondary_color": "#000000",
//     "background_color": "#FFFFFF",
//     "font_family": "Poppins, sans-serif",
//     "template_layout": "LAYOUT_E",
//     "template_img_url": "https://res.cloudinary.com/dlj9ags4d/image/upload/v1770759960/private_indoor_zoi9lo.jpg"
//   },
//   {
//     "template_name": "Wedding Party",
//     "template_description": "A romantic, airy layout with elegant typography — perfect for weddings and formal gatherings.",
//     "primary_color": "#000000",
//     "secondary_color": "#000000",
//     "background_color": "#FFFFFF",
//     "font_family": "Poppins, sans-serif",
//     "template_layout": "LAYOUT_F",
//     "template_img_url": "https://res.cloudinary.com/dlj9ags4d/image/upload/v1770758979/wedding_template_s6dpfe.jpg"
//   }
  
// ]