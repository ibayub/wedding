module.exports = {
    content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
    theme: {
        extend: {
            backgroundImage: {
                'custom-image': "url('/image.jpg')",
                'gradient-blue-purple': 'linear-gradient(to right, #3b82f6, #9333ea)', // blue to purple gradient

            },
            backgroundColor: ['disabled'],
            cursor: ['disabled'], 
        },
    },
    plugins: [],
}