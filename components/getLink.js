import { useState } from 'react';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import Tooltip from './tooltip';

const GetLink = ({ link }) => {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(true);
        navigator.clipboard.writeText(link)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    return (
        <div className="get-link">
            <Tooltip title="分享" type="default">
                <button onClick={handleClick} className="share-btn" >
                    <img src="images/icons/share.svg" alt="share" />
                </button>
            </Tooltip>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} type="dark" severity="success" sx={{ width: '100%' }}>
                    成功複製鏈接您的排庫網址
                </Alert>
            </Snackbar>
        </div>
    )
}

export default GetLink;