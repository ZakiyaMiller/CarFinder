import { createTheme } from '@mui/material';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light mode
          primary: {
            main: '#8B2500',
            light: '#B33000',
            dark: '#661A00',
          },
          secondary: {
            main: '#A0522D',
            light: '#CD853F',
            dark: '#8B4513',
          },
          background: {
            default: '#F9F9F9',
            paper: '#FFFFFF',
          },
          text: {
            primary: '#1E1E1E',
            secondary: '#555555',
          },
          divider: '#E0E0E0',
        }
      : {
          // Dark mode
          primary: {
            main: '#A52A2A',
            light: '#CD5C5C',
            dark: '#800000',
          },
          secondary: {
            main: '#8B4513',
            light: '#A0522D',
            dark: '#6B3E26',
          },
          background: {
            default: '#0F0F0F',
            paper: '#1A1A1A',
          },
          text: {
            primary: '#FFFFFF',
            secondary: '#B0B0B0',
          },
          divider: '#2E2E2E',
        }),
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'scale(1.1)',
            '& .MuiSvgIcon-root': {
              transform: 'scale(1.1)',
              color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main
            }
          },
          '&:active': {
            transform: 'scale(0.95)'
          },
          '& .MuiSvgIcon-root': {
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }
        })
      }
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          borderRadius: '12px',
          transition: 'all 0.3s ease',
          ...(theme.palette.mode === 'dark' 
            ? {
                background: 'linear-gradient(to bottom, #1a1a1a, #0f0f0f)',
                '&:hover': {
                  boxShadow: '0 0 10px #FF4500',
                  transform: 'translateY(-4px)',
                }
              }
            : {
                boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                '&:hover': {
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  transform: 'translateY(-4px)',
                }
              })
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: '8px',
          textTransform: 'none',
          transition: 'all 0.3s ease',
          ...(theme.palette.mode === 'dark'
            ? {
                background: 'linear-gradient(45deg, #A52A2A, #8B4513)',
                '&:hover': {
                  boxShadow: '0 0 15px rgba(255, 69, 0, 0.5)',
                  transform: 'translateY(-2px)',
                }
              }
            : {
                background: 'linear-gradient(45deg, #8B2500, #A0522D)',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(230, 81, 0, 0.3)',
                  transform: 'translateY(-2px)',
                }
              })
        }),
      },
    },
  },
});

export { getDesignTokens };
export const theme = (mode) => createTheme(getDesignTokens(mode));