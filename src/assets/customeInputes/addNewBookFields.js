export const bookFormFields = [
    {
        label: "Title *",
        type: "text",
        required: true,
        placeholder: "Enter Book Title",
        name: "title",
    },
    {
        label: "Author *",
        type: "text",
        required: true,
        placeholder: "Enter Author's Name",
        name: "author",
    },
    {
        label: "ISBN *",
        type: "number",
        required: true,
        placeholder: "Enter 13-digit ISBN",
        name: "isbn",
        min: 1,
        max: 999999999999999, // allows up to 15 digits
    },
    {
        label: "Category *",
        type: "textarea",
        required: true,
        placeholder: "e.g., Programming",
        name: "category",
    },
    {
        label: "Description",
        type: "text",
        required: false,
        placeholder: "Enter Book Description",
        name: "description",
    },
    {
        label: "Total Quantity *",
        type: "number",
        required: true,
        placeholder: "Enter total quantity",
        name: "quantity",
    },
    {
        label: "Available Quantity *",
        type: "number",
        required: true,
        placeholder: "Enter available quantity",
        name: "available",
    },
    {
        label: "Cover Image File Name",
        type: "text",
        required: false,
        placeholder: "e.g., cover.jpg",
        name: "coverImage",
    }
];
