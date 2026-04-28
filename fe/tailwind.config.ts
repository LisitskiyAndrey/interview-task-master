import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}', './node_modules/flowbite-react/dist/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      spacing: {
        header: '80px',
        'sidebar-left': '320px',
      },

      width: {
        'sidebar-left': '320px',
        'sidebar-info': '400px',
      },

      zIndex: {
        sidebar: '190',
        header: '200',
        toast: '1000',
      },

      boxShadow: {
        panel: '-2px 0 12px rgba(0, 0, 0, 0.15)',
      },

      colors: {
        brand: {
          primary: '#2563eb',
          'primary-light': '#3b82f6',
          'primary-dark': '#1d4ed8',
          secondary: '#4f46e5',
          'secondary-light': '#6366f1',
          'secondary-dark': '#3730a3',
        },

        success: '#16a34a',
        warning: '#ca8a04',
        danger: '#dc2626',
        info: '#0284c7',

        neutral: {
          0: '#ffffff',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },

        background: 'rgb(var(--background) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        app: 'rgb(var(--app) / <alpha-value>)',
        'sidebar-nav': 'rgb(var(--sidebar-nav) / <alpha-value>)',

        overlay: 'rgb(var(--overlay) / 0.45)',
        'overlay-ghost': 'rgb(var(--overlay-ghost) / 0.45)',

        'nav-active': 'rgb(var(--nav-active) / 0.35)',
        'nav-hover': 'rgb(var(--nav-hover) / 0.35)',

        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        'muted-foreground': 'rgb(var(--muted-foreground) / <alpha-value>)',
        'foreground-inverse': 'rgb(var(--foreground-inverse) / <alpha-value>)',
        'foreground-disabled': 'rgb(var(--foreground-disabled) / <alpha-value>)',
        'modal-surface': 'rgb(var(--modal-surface) / <alpha-value>)',
        'modal-foreground': 'rgb(var(--modal-foreground) / <alpha-value>)',

        border: 'rgb(var(--border) / <alpha-value>)',
        'border-strong': 'rgb(var(--border-strong) / <alpha-value>)',

        asset: {
          btc: 'rgb(var(--asset-btc) / <alpha-value>)',
          'btc-bg': 'rgb(var(--asset-btc-bg) / <alpha-value>)',
          eth: 'rgb(var(--asset-eth) / <alpha-value>)',
          'eth-bg': 'rgb(var(--asset-eth-bg) / <alpha-value>)',
          usdt: 'rgb(var(--asset-usdt) / <alpha-value>)',
          'usdt-bg': 'rgb(var(--asset-usdt-bg) / <alpha-value>)',
          'usdt-icon': 'rgb(var(--asset-usdt-icon) / <alpha-value>)',
          usdc: 'rgb(var(--asset-usdc) / <alpha-value>)',
          'usdc-bg': 'rgb(var(--asset-usdc-bg) / <alpha-value>)',
        },

        status: {
          pending: {
            bg: 'rgb(var(--status-pending-bg) / <alpha-value>)',
            fg: 'rgb(var(--status-pending-fg) / <alpha-value>)',
          },
          processing: {
            bg: 'rgb(var(--status-processing-bg) / <alpha-value>)',
            fg: 'rgb(var(--status-processing-fg) / <alpha-value>)',
          },
          completed: {
            bg: 'rgb(var(--status-completed-bg) / <alpha-value>)',
            fg: 'rgb(var(--status-completed-fg) / <alpha-value>)',
          },
          failed: {
            bg: 'rgb(var(--status-failed-bg) / <alpha-value>)',
            fg: 'rgb(var(--status-failed-fg) / <alpha-value>)',
          },
        },
      },
    },
  },
  plugins: [],
}

export default config
