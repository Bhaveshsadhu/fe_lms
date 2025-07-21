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
        type: "text",
        required: true,
        placeholder: "Enter 13-digit ISBN",
        name: "isbn",
        pattern: "^\\d{13}$",
        title: "ISBN must be exactly 13 digits",
        maxLength: 13,
        minLength: 13
    },
    {
        label: "Category *",
        type: "text",
        required: true,
        placeholder: "e.g., Programming",
        name: "category",
    },
    {
        label: "Description",
        type: "textarea",
        required: false,
        placeholder: "Enter Book Description",
        name: "description",
        rows: 10,
        cols: 10
    },

    // {
    //     label: "Total Quantity *",
    //     type: "number",
    //     required: true,
    //     placeholder: "Enter total quantity",
    //     name: "quantity",
    //     min: 0,
    //     max: 50
    // },
    {
        label: "Available Quantity *",
        type: "number",
        required: true,
        placeholder: "Enter available quantity",
        name: "availableQuantity",
        min: 0,
        max: 50
    },
    {
        label: "Expected Date Available *",
        type: "date",
        required: true,
        placeholder: "Expected Date Available",
        name: "ExpectedDateAvailable",
        min: new Date().toISOString().split("T")[0]  // sets min to today's date
    },
    {
        label: "Publication Date *",
        type: "date",
        required: true,
        placeholder: "Publication Date",
        name: "pubDate",
        max: new Date().toISOString().split("T")[0]
    },
    // {
    //     label: "Cover Image File Name",
    //     type: "text",
    //     required: false,
    //     placeholder: "e.g., cover.jpg",
    //     name: "coverImage",
    // }
];
