const FormLanguages = {
    Labels: {
        Title: {
            EN: "Login",
            HE: "התחברות"
        },
        Main: {
            EN: "Personal Details",
            HE: "פרטים אישיים"
        },
        Fields: {
            EN: [
                { message: "Email" },
                { message: "Password" }
            ],
            HE: [
                { message: "אימייל" },
                { message: "סיסמה" }
            ]
        },
        Submit: {
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
}

export default FormLanguages;