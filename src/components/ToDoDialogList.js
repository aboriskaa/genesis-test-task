import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import List from '@mui/material/List';
import { isSelectedDay } from '../utils'
import { v4 as uuidv4 } from 'uuid';

import Badge from '@mui/material/Badge';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ToDoDialogEdit from './ToDoDialogEdit';

export default function ToDoDialogList({ day, setLoad, setUpdateCal }) {

    const [open, setOpen] = useState(false);

    let array = []
    array = JSON.parse(localStorage.getItem('ideas'))
    let newBd = [];
    if (array !== null) newBd = array.filter(e => isSelectedDay(e.date, day.clone()));

    newBd.sort((a, b) => a.time - b.time)


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setUpdateCal(uuidv4());
        setOpen(false);
    };

    return (
        <>
            {newBd.length < 1 ?
                <IconButton disabled>
                    <Badge badgeContent={newBd.length} color="primary">
                        <ListAltIcon />
                    </Badge>
                </IconButton>
                :
                <IconButton onClick={handleClickOpen}>
                    <Badge badgeContent={newBd.length} color="primary">
                        <ListAltIcon />
                    </Badge>
                </IconButton>
            }

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Select your item</DialogTitle>
                <DialogContent>
                    {newBd.length < 1 ? <Alert severity="info">There are no new items!</Alert>
                        :
                        <List
                            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                            aria-label="contacts"
                        >
                            {newBd.map((e) => {
                                return (
                                    <ToDoDialogEdit key={uuidv4()} item={e} setLoad={setLoad} setUpdateCal={setUpdateCal} />
                                )
                            })}
                        </List>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}