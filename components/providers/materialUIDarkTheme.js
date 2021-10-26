import { createTheme, ThemeProvider, } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
    typography: {
        fontFamily: ['"Roboto Mono"', '"cwTeXKai"', 'serif'].join(',')
    }
});

const MaterialUIDarkTheme = ({ children }) => (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
)

export default MaterialUIDarkTheme;