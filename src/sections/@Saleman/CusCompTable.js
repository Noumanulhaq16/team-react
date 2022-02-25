import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';

// @mui
import { useTheme } from '@mui/material/styles';
import {
    Card,
    Table,
    Avatar,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination,
    Grid
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

// routes
import PATH_DASHBOARD from '../../routes/paths';
// hooks
import { baseurl } from '../../Helper/Base_url';
import { getApi, postApi } from '../../Helper/Api_helper';
import useSettings from '../../hooks/useSettings';
// _mock_
import { _userList } from '../../_mock';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { UserListHead, UserListToolbar, UserMoreMenu } from '../@dashboard/user/list';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'companyname', label: 'Company Name', alignRight: false },
    { id: 'streetaddress', label: 'Street Adrees', alignRight: false },
    { id: 'suitenumber', label: 'Suite Number', alignRight: false },
    { id: 'city', label: 'City', alignRight: false },
    { id: 'zipcode', label: 'ZipCode', alignRight: false },
    { id: 'state', label: 'State', alignRight: false },
    { id: 'phone', label: 'Phone', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'website', label: 'Website', alignRight: false },
    { id: 'fax', label: 'Fax', alignRight: false },
    { id: 'contractorid', label: 'Contractor', alignRight: false },
    { id: 'notes', label: 'Notes', alignRight: false },
    

];

// ----------------------------------------------------------------------

export default function CusCompanyTable() {
    const theme = useTheme();
    const { themeStretch } = useSettings();
    const { enqueueSnackbar } = useSnackbar();
    const [userList, setUserList] = useState(_userList);
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('companyname');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const id = localStorage.getItem('userID');
    // Api fetch
    useEffect(() => {
        ContractorCompany();
    }, []);
    const ContractorCompany = () => {
        getApi(`${baseurl}/superadmin/customer/companies/contractorwise/${id}`).then(({ data }) => {
            const CompanyList = data.supercompany;
            // console.log("Comapny", CompanyList.map((x) => x))
            setUserList(CompanyList)
        })
    }
    const SendToContractor = (id) => {

        postApi(`${baseurl}/superadmin/approvecompany/${id}`).then(({ data }) => {
            console.log('data', data);
            ContractorCompany();
            enqueueSnackbar('Successfully Send');
        })
    }
    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (checked) => {
        if (checked) {
            const newSelecteds = userList.map((n) => n.companyname);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (companyname) => {
        const selectedIndex = selected.indexOf(companyname);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, companyname);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterByName = (filterName) => {
        setFilterName(filterName);
        setPage(0);
    };

    const handleDeleteUser = (userId) => {
        const deleteUser = userList.filter((user) => user.id !== userId);
        setSelected([]);
        setUserList(deleteUser);
    };

    const handleDeleteMultiUser = (selected) => {
        const deleteUsers = userList.filter((user) => !selected.includes(user.companyname));
        setSelected([]);
        setUserList(deleteUsers);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

    const filteredUsers = applySortFilter(userList, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredUsers.length && Boolean(filterName);

    return (
        <Page title="Company List">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <Grid>
                    {/* <HeaderBreadcrumbs
                    heading="Company List"
                    links={[
                        { name: 'CustomerDashboard', href: PATH_DASHBOARD.root },
                        { name: 'Company', href: PATH_DASHBOARD.user.root },
                        { name: 'List' },
                    ]}
                    action={
                        <Button
                            variant="contained"
                            component={RouterLink}
                            to={PATH_CUSTOMERDASHBOARD.general.Addcustomercompany}
                            startIcon={<Iconify icon={'eva:plus-fill'} />}
                        >
                            Add Company
                        </Button>
                    }
                /> */}

                    <Card>
                        {/* <UserListToolbar
                            numSelected={selected.length}
                            filterName={filterName}
                            onFilterName={handleFilterByName}
                            onDeleteUsers={() => handleDeleteMultiUser(selected)}
                        /> */}

                        <Scrollbar>
                            <TableContainer sx={{ minWidth: 1000 }}>
                                <Table>
                                    <UserListHead
                                        order={order}
                                        orderBy={orderBy}
                                        headLabel={TABLE_HEAD}
                                        rowCount={userList.length}
                                        numSelected={selected.length}
                                        onRequestSort={handleRequestSort}
                                        onSelectAllClick={handleSelectAllClick}
                                    />
                                    <TableBody>
                                        {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                            const { id, companyname, streetaddress, suitenumber, city, zipcode, state, phone, email, website, fax, contractorname, notes, status } = row;
                                            const isItemSelected = selected.indexOf(companyname) !== -1;

                                            return (
                                                <>
                                                    <TableRow
                                                        hover
                                                        key={id}
                                                        tabIndex={-1}
                                                        role="checkbox"
                                                        selected={isItemSelected}
                                                        aria-checked={isItemSelected}
                                                    >
                                                        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <Typography variant="subtitle2" noWrap>
                                                                {companyname}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell align="left">{streetaddress}</TableCell>
                                                        <TableCell align="left">{suitenumber}</TableCell>
                                                        <TableCell align="left">{city}</TableCell>
                                                        <TableCell align="left">{zipcode}</TableCell>
                                                        <TableCell align="left">{state}</TableCell>
                                                        <TableCell align="left">{phone}</TableCell>
                                                        <TableCell align="left">{email}</TableCell>
                                                        <TableCell align="left">{website}</TableCell>
                                                        <TableCell align="left">{fax}</TableCell>
                                                        <TableCell align="left">{contractorname}</TableCell>
                                                        <TableCell align="left">{notes}</TableCell>
                                                        
                                                    </TableRow>
                                                </>
                                            );
                                        })}
                                        {emptyRows > 0 && (
                                            <TableRow style={{ height: 53 * emptyRows }}>
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                    {isNotFound && (
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                                    <SearchNotFound searchQuery={filterName} />
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    )}
                                </Table>
                            </TableContainer>
                        </Scrollbar>

                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={userList.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={(e, page) => setPage(page)}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Card>
                </Grid>
            </Container>
        </Page>
    );
}

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return array.filter((_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}
