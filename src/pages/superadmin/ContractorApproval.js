import { Container } from '@mui/material';
import Page from '../../components/Page';
import useSettings from '../../hooks/useSettings';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { PATH_ADMIN } from '../../routes/paths';
import ConApproval from '../../sections/@SuperAdmin/ConApproval';

export default function Customerapproval() {
    const { themeStretch } = useSettings();
    return (
        <Page title="Admin: Contractor Approval">
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <HeaderBreadcrumbs
                    heading="Contractor Approval"
                    links={[
                        { name: 'Dashboard', href: PATH_ADMIN.root },
                        { name: 'Contractor Approval' },
                    ]}
                />
                <ConApproval />
            </Container>
        </Page>
    );
}