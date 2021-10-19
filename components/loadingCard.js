import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import { createTheme, ThemeProvider, } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
    },
});

const LoadingCard = () => {
    return (
        <ThemeProvider theme={theme}>
            <Stack spacing={1}>
                <Skeleton sx={{ bgcolor: 'grey.500' }} variant="rectangular" width="100%" height={120} />
                <Skeleton sx={{ bgcolor: 'grey.500' }} variant="text" />
                <Skeleton sx={{ bgcolor: 'grey.500' }} variant="text" />
                <Skeleton sx={{ bgcolor: 'grey.500' }} variant="text" width="60%" />
            </Stack>
        </ThemeProvider>
    );
}

export default LoadingCard;
