const FormLanguages = {
    login: {
        labels: {
            title: {
                EN: "Sign In",
                HE: "התחברות"
            },
            main: {
                EN: "Personal Details",
                HE: "פרטים אישיים"
            },
            fields: {
                EN: [
                    { message: "Email" },
                    { message: "Password" }
                ],
                HE: [
                    { message: "אימייל" },
                    { message: "סיסמה" }
                ]
            },
            submit: {
                EN: "Sign In",
                HE: "התחבר"
            }
        },
        validationErrors: {
            inputs: {
                email: {
                    EN: [
                        { message: "Email can not be empty." },
                        { message: "Email must have atleast 12 letters." },
                        { message: "Email must have '@'." },
                        { message: "Email must have '.com'." },
                        { message: "Email must have only 1 '@'." },
                        { message: ".com' must be at the end of the email." }
                    ],
                    HE: [
                        { message: "אימייל אינו יכול להיות ריק." },
                        { message: "אימייל חייב להכיל לפחות 12 תווים." },
                        { message: "אימייל חייב להכיל '@'." },
                        { message: "אימיי לחייב להכיל '.com'." },
                        { message: "אימייל חייב להכיל רק פעם אחת את '@'." },
                        { message: "אימייל חייב להכיל '.com' בסוף." }
                    ]
                },
                password: {
                    EN: [
                        { message: "Password can not be empty." },
                        { message: "Password must have atleast 6 letters." },
                    ],
                    HE: [
                        { message: "סיסמה אינה יכולה להיות ריקה." },
                        { message: "הסיסמה חייבת להכיל לפחות 6 תווים." },
                    ]
                }
            }
        }
    },
    register: {
        labels: {
            title: {
                EN: "Sign Up",
                HE: "הרשמה"
            },
            main: {
                EN: "Personal Details",
                HE: "פרטים אישיים"
            },
            fields: {
                EN: [
                    { message: "Firstname" },
                    { message: "Lastname" },
                    { message: "Email" },
                    { message: "Password" },
                    { message: "Retype Password" }
                ],
                HE: [
                    { message: "שם פרטי" },
                    { message: "שם משפחה" },
                    { message: "אימייל" },
                    { message: "סיסמה" },
                    { message: "אימות סיסמה" }
                ]
            },
            submit: {
                EN: "Sign Up",
                HE: "הרשם"
            }
        },
        validationErrors: {
            inputs: {
                firstname: {
                    EN: [
                        { message: "Firstname can not be empty." },
                        { message: "Firstname must have atleast 2 letters." },
                        { message: "Firstname can not contain numbers." }
                    ],
                    HE: [
                        { message: "שם פרטי לא יכול להיות ריק." },
                        { message: "שם פרטי חייב להכיל לפחות 2 תווים." },
                        { message: "שם פרטי לא יכול להכיל מספרים." }
                    ]
                },
                lastname: {
                    EN: [
                        { message: "Lastname can not be empty." },
                        { message: "Lastname must have atleast 2 letters." },
                        { message: "Lastname can not contain numbers." }
                    ],
                    HE: [
                        { message: "שם משפחה לא יכול להיות ריק." },
                        { message: "שם משפחה חייב להכיל לפחות 2 תווים." },
                        { message: "שם משפחה לא יכול להכיל מספרים." }
                    ]
                }
                ,
                email: {
                    EN: [
                        { message: "Email can not be empty." },
                        { message: "Email must have atleast 12 letters." },
                        { message: "Email must have '@'." },
                        { message: "Email must have '.com'." },
                        { message: "Email must have only 1 '@'." },
                        { message: ".com' must be at the end of the email." }
                    ],
                    HE: [
                        { message: "אימייל אינו יכול להיות ריק." },
                        { message: "אימייל חייב להכיל לפחות 12 תווים." },
                        { message: "אימייל חייב להכיל '@'." },
                        { message: "אימיי לחייב להכיל '.com'." },
                        { message: "אימייל חייב להכיל רק פעם אחת את '@'." },
                        { message: "אימייל חייב להכיל '.com' בסוף." }
                    ]
                },
                password: {
                    EN: [
                        { message: "Password can not be empty." },
                        { message: "Password must have atleast 6 letters." },
                        { message: "Password must contain numbers." },
                        { message: "Password must contain letters." }
                    ],
                    HE: [
                        { message: "סיסמה אינה יכולה להיות ריקה." },
                        { message: "הסיסמה חייבת להכיל לפחות 6 תווים." },
                        { message: "הסיסמה חייבת להכיל מספרים." },
                        { message: "הסיסמה חייבת להכיל תווים." }
                    ]
                },
                repassword: {
                    EN: [
                        { message: "Repassword can not be empty." },
                        { message: "Repassword must have atleast 6 letters." },
                        { message: "Repassword must contain numbers." },
                        { message: "Repassword must contain letters." },
                        { message: "Repassword must be equal to password." }
                    ],
                    HE: [
                        { message: "אימות הסיסמה אינה יכולה להיות ריקה." },
                        { message: "אימות הסיסמה חייבת להכיל לפחות 6 תווים." },
                        { message: "אימות הסיסמה חייבת להכיל מספרים." },
                        { message: "אימות הסיסמה חייבת להכיל תווים." },
                        { message: "אימות הסיסמה חייבת להיות תואמת לסיסמה" }
                    ]
                }
            }
        }
    }
}

export default FormLanguages;