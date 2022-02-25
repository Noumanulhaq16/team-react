import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
// form

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import Iconify from '../../../components/Iconify';
// Hook
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import useAuth from '../../../hooks/useAuth';


// ----------------------------------------------------------------------

export default function VerifyCodeForm() {
  const navigate = useNavigate();
  const { verifypassword, message, ChangePath } = useAuth();
  useEffect(() => { ChangePath() }, [window.location.pathname])
  console.log(useAuth())
  const { enqueueSnackbar } = useSnackbar();

  const [showPassword, setShowPassword] = useState(false);

  const ChangePasswordSchema = Yup.object().shape({
    token: Yup.string().required('Password is required'),
    password: Yup.string().required('Password is required'),
    confirmpassword: Yup.string().required('Confirm Password is required'),
  });

  const defaultValues = {
    token: '',
    password: '',
    confirmpassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await verifypassword(data.token, data.password, data.confirmpassword);
      // console.log('code:', Object.values(data).join(''));
      enqueueSnackbar('Password Change');
      // navigate(PATH_CUSTOMER_AUTH.root, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="token" label="Verify Code" />
      </Stack>
      <Stack direction="row" spacing={2} sx={{ mt: 3 }} justifyContent="center">
        <RHFTextField
          name="password"
          label="New Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <RHFTextField
          name="confirmpassword"
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{ mt: 3 }}
      >
        Change Password
      </LoadingButton>
    </FormProvider>
  );
}
