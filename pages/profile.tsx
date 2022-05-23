import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import * as yup from 'yup';
import {useFormik} from "formik";
import {connect} from "react-redux";
import {acSetWallet} from "../src/store/actionsCreators/acWallet";
import {acUser} from "../src/store/actionsCreators/acUser";

const validationSchema = yup.object({
    name: yup
        .string(),
    email: yup
        .string()
        .email('Enter a valid email'),
    wallet: yup
        .string()
        .required('Wallet is required'),
});

const Profile = ({wallet, user, userReducer}: any) => {
    let userData;
    const formik = useFormik({
        initialValues: {
            name:user.name,
            email: user.email,
            wallet: wallet.walletAccount,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            await fetch('/api/update-user-profile-data', {
                    method: 'PUT',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/text'
                    },

                    body: JSON.stringify(values)
                }
            ).then(resp=>resp.json()).then(data=>userData=data)
            userReducer(userData)
        },
    });

    return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <form onSubmit={formik.handleSubmit}>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Profile
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="wallet"
                                    name="wallet"
                                    label="Wallet"
                                    defaultValue={formik.values.wallet}
                                    onChange={formik.handleChange}
                                    error={formik.touched.wallet && Boolean(formik.errors.wallet)}
                                    // @ts-ignore
                                    helperText={formik.touched.wallet && formik.errors.wallet}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="name"
                                    name="name"
                                    label="Name"
                                    defaultValue={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    // @ts-ignore
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label="Email"
                                    defaultValue={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    // @ts-ignore
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Save Profiles Data
                        </Button>
                    </Box>
                </Box>
                </form>
            </Container>
    );
}

const walletStateToProps = function(state:any) {
    return {
        wallet: state.wallet,
        user:state.user
    }
}

const walletReducer = {
    userReducer:(value:any) => (acUser(value))
}

export default connect(walletStateToProps,walletReducer)(Profile);
