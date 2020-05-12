import React, {useEffect, useState} from "react"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import {charTable} from "constants/charTable"
import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    rootCard: {
        maxWidth: 800,
        backgroundColor: "#f0ffef"
    }
})

export default function Application() {

    const [innerChar, setInnerChar] = useState("█")
    const [outerChar, setOuterChar] = useState("░")
    const [inputText, setInputText] = useState("жесть")
    const [outputText, setOutputText] = useState("")

    const classes = useStyles();

    useEffect(() => {
        const newOutputText = inputText
            .toLowerCase()
            .split("")
            .map(char => charTable[char] || [])
            .reduce((rows, charArray) => { // TODO make it pure
                charArray.forEach((rowPart, rowIndex) => {
                    let row = rows[rowIndex] || []
                    rows[rowIndex] = row.concat(rowPart)
                })
                return rows
            }, [])
            .map(row => row.map(flag => flag ? innerChar : outerChar).join(""))
            .join("\n")

        setOutputText(newOutputText)
    }, [innerChar, outerChar, inputText])

    return (
        <Card variant="outlined" className={classes.rootCard}>
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
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            label="input"
                            fullWidth
                            value={inputText}
                            onChange={event => setInputText(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Grid item xs={12}>
                            <TextField
                                label="inner"
                                fullWidth
                                value={innerChar}
                                onChange={event => setInnerChar(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="outer"
                                fullWidth
                                value={outerChar}
                                onChange={event => setOuterChar(event.target.value)}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
