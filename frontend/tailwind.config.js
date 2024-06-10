/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0% ': { top:'50%', fontSize: '100px' },
          '100%': { top:'26%',fontSize: '150px' },
        },
        wiggle2: {
          '0% ': { top:'50%', fontSize: '70px' },
          '100%': { top:'21%',fontSize: '80px' },
        },
        wiggle3: {
          '0% ': { top:'50%', fontSize: '100px' },
          '100%': { top:'22%',fontSize: '140px' },
        },
        moutains: {
          '0% ': {transform:'scale(1)' },
          '100%': { transform:'scale(1.2)'  },
        }
      },
      animation: {
        wiggle: 'wiggle 1.2s ease-out forwards',
        wiggle2: 'wiggle2 1.2s ease-out forwards',
        wiggle3: 'wiggle3 1.2s ease-out forwards',
        moutains: 'moutains 1.3s ease-out forwards',
      },
      fontFamily:{
        'Inter':['Inter'],
        'Poppins':['Poppins'],
      },
    },
  },
  plugins: [],
}

