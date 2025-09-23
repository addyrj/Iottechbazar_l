export const quilToolbarOption = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],

    // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
];

export const generalSettingItem = [
    {
        id: 1,
        title: "General setting"
    },
    {
        id: 2,
        title: "Social Link"
    },
    {
        id: 3,
        title: "Coupon"
    },
    {
        id: 4,
        title: "Theme Color"
    },
    {
        id: 5,
        title: "Country"
    },
    {
        id: 6,
        title: "States"
    },
    {
        id: 7,
        title: "City"
    },
    {
        id: 8,
        title: "Pin"
    },
    {
        id: 9,
        title: "Websites Theme"
    }
]