import React, {useEffect, useState} from "react"
import * as R from 'ramda'
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import {charTable} from "constants/charTable"
import Card from "@material-ui/core/Card"
import CardContent from '@material-ui/core/CardContent'
import makeStyles from "@material-ui/core/styles/makeStyles"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Popover from "@material-ui/core/Popover"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles({
    card: {
        maxWidth: 800,
        backgroundColor: "#ECEFF1"
    },
    popover: {
        padding: 20,
        backgroundColor: "#CFD8DC"
    },
})

export default function Application() {

    const [withBorder, setWithBorder] = useState(true)
    const [innerChar, setInnerChar] = useState("🟥")
    const [outerChar, setOuterChar] = useState("🤍")
    const [inputText, setInputText] = useState("жесть")
    const [outputText, setOutputText] = useState("")

    const [popoverTarget, setPopoverTarget] = useState(null)

    const classes = useStyles()

    const outputTextClickHandler = event => {
        if (event.target.type === "textarea") {
            event.target.select()
            document.execCommand("Copy")
            setPopoverTarget(event.currentTarget)
        }
    }

    useEffect(() => {
        const charArrays = inputText
            .toLowerCase()
            .split("")
            .map(char => charTable[char])
            .filter(charArray => charArray !== undefined) // ignore unknown chars

        const rows = R.transpose(charArrays).map(R.pipe(R.intersperse([0]), R.flatten))

        const newOutputText = (
            withBorder ? (() => {
                const sideBorderedRows = rows.map(row => Array.of(0).concat(row).concat(0))
                const additionalRow = Array.of(Array.from(Array(sideBorderedRows[0]?.length || 0), () => 0))
                return additionalRow.concat(sideBorderedRows).concat(additionalRow)
            })() : (() => {
                return rows
            })()
        ).map(R.pipe(R.map(flag => flag ? innerChar : outerChar), R.join(""))).join("\n")

        setOutputText(newOutputText)
    }, [withBorder, innerChar, outerChar, inputText])

    return (
        <Card className={classes.card}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="output"
                            fullWidth
                            multiline
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
