const cardFormFields = [
  { name: "title", label: "Title", required: true },
  { name: "subtitle", label: "Subtitle", required: true },
  { name: "description", label: "Description", multiline: true, rows: 3 },
  { name: "phone", label: "Phone", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "web", label: "Website" },
  { name: "image", label: "Image URL", required: true },
  { name: "alt", label: "Image Alt" },
  { name: "city", label: "City", required: true },
  { name: "street", label: "Street", required: true },
  { name: "houseNumber", label: "House Number", required: true },
];

export default cardFormFields;


