/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["selector"],
    mode: "jit",
    content: [
        './app/**/*.{ts,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Geist Sans', 'sans-serif'],
            }
        },
    },
    plugins: [],
}

