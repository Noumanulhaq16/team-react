import { Container } from '@mui/material';
import Page from '../../components/Page';
import useSettings from '../../hooks/useSettings';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { PATH_ADMIN } from '../../routes/paths';
import Approval from '../../sections/@SuperAdmin/CusApproval';

export default function Customerapproval() {
    const { themeStretch } = useSettings();
    return (
        <Page title="Admin: Customer Approval">
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <HeaderBreadcrumbs
                    heading="Customer Approval"
                    links={[
                        { name: 'Dashboard', href: PATH_ADMIN.root },
                        { name: 'Customer Approval' },
                    ]}
                />
                <Approval />
            </Container>
        </Page>
    );
}