import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useState, useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel } from '@mui/material';
// utils
import { fData } from '../../utils/formatNumber';
import useAuth from '../../hooks/useAuth';
// routes
import { PATH_CONTRACTOR } from '../../routes/paths';
// _mock
import { countries } from '../../_mock';
// components
import Label from '../../components/Label';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar } from '../../components/hook-form';
// API
import { baseurl } from '../../Helper/Base_url';
import { getApi, postApi } from '../../Helper/Api_helper';

// ----------------------------------------------------------------------

// Form.propTypes = {
//   isEdit: PropTypes.bool,
//   currentUser: PropTypes.object,
// };


export default function Form({ isEdit, currentUser }) {
    const navigate = useNavigate();
    const { companyregister, customercompany, user, company, message, error } = useAuth();
    const customeId = localStorage.getItem('userID');
    const { enqueueSnackbar } = useSnackbar();



    const NewUserSchema = Yup.object().shape({
        customerid: Yup.string(customeId),
        companyname: Yup.string().required('companyname is required'),
        streetaddress: Yup.string().required('StreetAddress is required'),
        suitenumber: Yup.string().required('suitenumber is required'),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        zipcode: Yup.string().required('zipcode Number is required'),
        phone: Yup.string().required('Phone number is required'),
        website: Yup.string().required('website is required'),
        email: Yup.string().required('Email is required').email(),
        fax: Yup.string().required('fax is required'),
        notes: Yup.string().required('notes is required'),
        logo: Yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
    });
    const [customlogo, SetCustomlog] = useState(null)
    const defaultValues = useMemo(
        () => ({
            customerid: customeId,
            companyname: company[0]?.companyname,
            streetaddress: company[0]?.streetaddress,
            suitenumber: company[0]?.suitenumber,
            city: company[0]?.city,
            state: company[0]?.state,
            zipcode: company[0]?.zipcode,
            phone: company[0]?.phone,
            website: company[0]?.website,
            email: company[0]?.email,
            fax: company[0]?.fax,
            notes: company[0]?.notes,
            logo: company[0]?.logo,

        }),

    );


    const methods = useForm({
        resolver: yupResolver(NewUserSchema),
        defaultValues
    });

    const {
        reset,
        watch,
        control,
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;
    const values = watch();


    const onSubmit = async (data) => {
        // console.log("jiiiiiiiiiiiii")
        if (company.length === 0) {
            try {
                await companyregister(data.customerid, data.contractorid, data.companyname, data.streetaddress, data.city, data.state, data.suitenumber, data.zipcode, data.website, data.email, data.phone, data.fax, data.notes);
                reset();
                enqueueSnackbar('Successfully Register');
                if (error) {
                    if (error.customerid) {
                        enqueueSnackbar(error?.customerid, { variant: 'error' });
                    }
                    if (error.email) {
                        enqueueSnackbar(error?.email, { variant: 'error' });
                    }
                }
                // navigate(PATH_DASHBOARD.user.list);
            } catch (error) {
                console.error(error);
            }
        } else {
            console.log("jiiiiiiiiiiiii")
        }
    };

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            if (file) {
                SetCustomlog(file);
                setValue(
                    'logo',
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                );
            }
        },
        [setValue]
    );

    return (

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Card sx={{ py: 10, px: 3 }}>


                        <Box sx={{ mb: 5 }}>
                            <RHFUploadAvatar
                                name="logo"
                                accept="image/*"
                                maxSize={3145728}
                                onDrop={handleDrop}
                                helperText={
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            mt: 2,
                                            mx: 'auto',
                                            display: 'block',
                                            textAlign: 'center',
                                            color: 'text.secondary',
                                        }}
                                    >
                                        Allowed *.jpeg, *.jpg, *.png, *.gif
                                        <br /> max size of {fData(3145728)}
                                    </Typography>
                                }
                            />
                        </Box>
                    </Card>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Card sx={{ p: 3 }}>
                        <Box
                            sx={{
                                display: 'grid',
                                columnGap: 2,
                                rowGap: 3,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                            }}
                        >
                            <RHFTextField name="companyname" label="Comapny Name" />
                            <RHFTextField name="streetaddress" label="Street Address" />
                            <RHFTextField name="suitenumber" label="Suite Number" />
                            <RHFTextField name="city" label="City" />
                            <RHFTextField name="state" label="State/Region" />
                            <RHFTextField name="zipcode" label="Zip/Code" />
                            <RHFTextField name="website" label="Website" />
                            <RHFTextField name="email" label="Email Address" />
                            <RHFTextField name="phone" label="Phone Number" />
                            <RHFTextField name="fax" label="Fax" />
                            <RHFTextField name="notes" label="Notes" />




                        </Box>

                        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                            {company.length === 0 ? <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                Create Company
                            </LoadingButton> : <LoadingButton type="button" variant="contained" loading={isSubmitting}>
                                Update Company
                            </LoadingButton>}

                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>


    );


}
