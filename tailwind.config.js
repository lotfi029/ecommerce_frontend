/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4f46e5', // indigo-600
        success: '#10b981', // green-500
        danger: '#ef4444',  // red-500
        warning: '#fbbf24', // amber-400
      }
    },
  },
  plugins: [],
}
