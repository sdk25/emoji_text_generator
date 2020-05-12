import React from "react"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid";

const defaults = {
    innerChar: "█",
    outerChar: "░",
    text: "жесть",
    textFormatted:
        "░░░░░░░░░░░░░░░░░░░░░░░░░\n" +
        "░█░█░█░███░████░███░█░░░░\n" +
        "░█████░█░░░█░░█░░█░░█░░░░\n" +
        "░░███░░███░█░░░░░█░░████░\n" +
        "░█████░█░░░█░░█░░█░░█░░█░\n" +
        "░█░█░█░███░████░░█░░████░\n" +
        "░░░░░░░░░░░░░░░░░░░░░░░░░"
}


export default function Application() {

    return (
        <Grid container spacing={3} style={{maxWidth: 800}}>
            <Grid item xs={12}>
                <TextField
                    label="output"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={7}
                    defaultValue={defaults.textFormatted}
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={8}>
                <TextField
                    label="input"
                    fullWidth
                    margin="normal"
                    defaultValue={defaults.text}
                />
            </Grid>
            <Grid item xs={4}>
                <Grid item xs={12}>
                    <TextField
                        label="inner"
                        fullWidth
                        margin="normal"
                        defaultValue={defaults.innerChar}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="outer"
                        fullWidth
                        margin="normal"
                        defaultValue={defaults.outerChar}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}
