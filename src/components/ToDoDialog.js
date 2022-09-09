import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

export default function ToDoDialog({ day, setUpdateCal, db }) {
    const [open, setOpen] = useState(false);

    const [valueDate, setValueDate] = useState();
    const [valueTime, setValueTime] = useState(moment());
    const [valueTitle, setValueTitle] = useState('');
    const [valueDescription, setValueDescription] = useState('');

    useEffect(() => {
        setValueDate(day)
    }, [day]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSave = () => {

        let array = []

        array = JSON.parse(localStorage.getItem('ideas'))

        array.push({
            id: uuidv4(),
            title: valueTitle,
            description: valueDescription,
            date: moment(valueDate).format(),
            time: moment(valueTime).format()
        })

        localStorage.setItem('ideas', JSON.stringify([...array]));
        setUpdateCal(uuidv4())
        setOpen(false);

    };

    const handleValueTitle = (e) => {
        setValueTitle(e.target.value)
    };

    const handleValueDescription = (e) => {
        setValueDescription(e.target.value)
    };
    const handleDatePicker = (e) => {
        setValueDate(e)
    };

    const handleTimePicker = (e) => {
        setValueTime(e)
    };


    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <IconButton onClick={handleClickOpen} color="primary" aria-label="new event">
                <AddCircleOutlineIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add new idea item</DialogTitle>
                <DialogContent>
                    <DialogContent>
                        <TextField
                            required
                            id="standard-required"
                            label="Required"
                            variant="standard"
                            onChange={handleValueTitle}
                            defaultValue={valueTitle}
                        />
                    </DialogContent>
                    <DialogContent>

                        <TextField
                            id="standard-multiline-static"
                            multiline
                            rows={4}
                            label="Description"
                            placeholder="Description"
                            defaultValue={valueDescription}
                            variant="standard"
                            onChange={handleValueDescription}
                        />

                    </DialogContent>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DialogContent>

                            <DatePicker
                                value={valueDate}
                                onChange={handleDatePicker}
                                renderInput={(params) => <TextField {...params} />}
                            />

                        </DialogContent>
                        <DialogContent>

                            <TimePicker
                                value={valueTime}
                                ampm={false}
                                onChange={handleTimePicker}
                                renderInput={(params) => <TextField {...params} />}
                            />

                        </DialogContent>
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Button disabled={!valueTitle} onClick={handleSave}>Save</Button>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}