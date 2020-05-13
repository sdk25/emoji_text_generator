import React, {useEffect, useState} from "react"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import {charTable} from "constants/charTable"
import Card from "@material-ui/core/Card"
import CardContent from '@material-ui/core/CardContent'
import makeStyles from "@material-ui/core/styles/makeStyles"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import _ from "lodash"
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    card: {
        maxWidth: 800,
        backgroundColor: "#f0ffef"
    },
    popover: {
        padding: 30,
    },
})

export default function Application() {

    const [withBorder, setWithBorder] = useState(true)
    const [innerChar, setInnerChar] = useState("█")
    const [outerChar, setOuterChar] = useState("░")
    const [inputText, setInputText] = useState("жесть")
    const [outputText, setOutputText] = useState("")

    const [popoverTarget, setPopoverTarget] = useState(null);

    const classes = useStyles();

    const outputTextClickHandler = event => {
        event.target.select()
        document.execCommand("Copy")
        setPopoverTarget(event.currentTarget);
    }

    useEffect(() => {
        const arrayOfCharsArrays = inputText
            .toLowerCase()
            .split("")
            .map(char => _.get(charTable, char, []))

        const rowArrayToString = rowArray => rowArray.map(flag => flag ? innerChar : outerChar).join("")

        const rows = _.zip(...arrayOfCharsArrays)
            .map(rowArrays => rowArrays.map(rowArrayToString).join(outerChar))

        const newOutputText = (
            withBorder ? rows.map(row => outerChar + row + outerChar) : rows
        ).join("\n")

        setOutputText(newOutputText)
    }, [withBorder, innerChar, outerChar, inputText])

    return (
        <Card variant="outlined" className={classes.card}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="output"
                            fullWidth
                            multiline
                            rows={7}
                            variant="outlined"
                            value={outputText}
                            onClick={outputTextClickHandler}
                        />
                        <Popover
                            open={Boolean(popoverTarget)}
                            anchorEl={popoverTarget}
                            onClose={() => setPopoverTarget(null)}
                            anchorOrigin={{
                                vertical: 'center',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'center',
                                horizontal: 'center',
                            }}
                        >
                            <Typography className={classes.popover}>Copied!</Typography>
                        </Popover>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            label="input"
                            fullWidth
                            value={inputText}
                            onChange={event => setInputText(event.target.value)}
                        />
                        <FormControlLabel
                            label="use border"
                            control={
                                <Checkbox
                                    color="primary"
                                    checked={withBorder}
                                    onChange={event => setWithBorder(event.target.checked)}
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="inner"
                            fullWidth
                            value={innerChar}
                            onChange={event => setInnerChar(event.target.value)}
                        />
                        <TextField
                            label="outer"
                            fullWidth
                            value={outerChar}
                            onChange={event => setOuterChar(event.target.value)}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
