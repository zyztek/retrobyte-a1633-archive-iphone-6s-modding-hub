/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['Inter', 'sans-serif'],
  			display: ['Inter', 'system-ui', 'sans-serif'],
  			mono: ['"VT323"', 'JetBrains Mono', 'Fira Code', 'monospace']
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			'neon-green': '#00ff41',
  			'neon-pink': '#d209fa',
  			'retro-black': '#0a0a0a',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			ring: 'hsl(var(--ring))',
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			}
  		},
  		keyframes: {
  			glitch: {
  				'0%': { transform: 'translate(0)' },
  				'20%': { transform: 'translate(-2px, 2px)' },
  				'40%': { transform: 'translate(-2px, -2px)' },
  				'60%': { transform: 'translate(2px, 2px)' },
  				'80%': { transform: 'translate(2px, -2px)' },
  				'100%': { transform: 'translate(0)' },
  			},
  			'crt-flicker': {
  				'0%': { opacity: '0.97' },
  				'5%': { opacity: '0.9' },
  				'10%': { opacity: '0.98' },
  				'15%': { opacity: '0.85' },
  				'20%': { opacity: '0.99' },
  				'100%': { opacity: '1' },
  			},
  			'scanline': {
  				'0%': { transform: 'translateY(0)' },
  				'100%': { transform: 'translateY(100vh)' }
  			},
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'marquee-vertical': {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-50%)' }
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
  		},
  		animation: {
  			glitch: 'glitch 0.2s ease-in-out infinite',
  			'crt-flicker': 'crt-flicker 0.15s infinite',
  			'scanline': 'scanline 8s linear infinite',
        'marquee': 'marquee 30s linear infinite',
        'marquee-vertical': 'marquee-vertical 20s linear infinite',
        'spin-slow': 'spin-slow 8s linear infinite',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")]
}