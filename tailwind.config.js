/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				brand: {
					DEFAULT: "#e11d48",
					dark: "#9f1239",
					light: "#fb7185",
				},
			},
			fontFamily: {
				display: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
			},
			backgroundImage: {
				"hero-ribbon": "radial-gradient(1200px_600px at 60% 40%, rgba(225,29,72,0.35), rgba(0,0,0,0)), radial-gradient(900px_500px at 20% 20%, rgba(255,255,255,0.05), rgba(0,0,0,0))",
			},
		},
	},
	plugins: [],
};
