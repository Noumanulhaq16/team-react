import { createContext, useEffect, useState, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';
import useAuth from '../hooks/useAuth';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  message: null,
  error: null,
  // Customer States
  company: null,
  contact: null,
  location: null,
  service: null,
  jobentery: null,
  elevator: null,
  keylogs: null,
  firedep: null
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
    };
  },
  // Global Methoed
  LOGIN: (state, action) => {
    console.log('payload received Login->', action.payload);
    const { user, message, error } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
      message,
      error
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    message: null,
    error: null,
    // Customer States
    company: null,
    contact: null,
    location: null,
    service: null,
    jobentery: null,
    elevator: null,
    keylogs: null,
    firedep: null,
  }),
  REGISTER: (state, action) => {
    const { user, message, error } = action.payload;

    return {
      ...state,
      isAuthenticated: false,
      user,
      message,
      error
    };
  },
  RESETPASSWORD: (state, action) => {
    // console.log('payload received ->', action.payload);
    const { message } = action.payload;
    return {
      ...state,
      message
    };
  },
  VERIFYPASSWORD: (state, action) => {
    // console.log('payload received ->', action.payload);
    const { message } = action.payload;
    return {
      ...state,
      message
    };

  },
  // SuperAdmin Methods


  // Customer Method
  COMPANYREGISTER: (state, action) => {
    console.log('payload received ->', action.payload);
    const { company, message, error } = action.payload;
    return {
      ...state,
      company,
      message,
      error
    };
  },
  COMPANYCONTACT: (state, action) => {
    console.log('payload received ->', action.payload);
    const { contact, message, error } = action.payload;
    return {
      ...state,
      contact,
      message,
      error
    };
  },
  COMPANYLOCATION: (state, action) => {
    console.log('payload received ->', action.payload);
    const { location, message, error } = action.payload;
    return {
      ...state,
      location,
      message,
      error
    };
  },
  COMPANYSERVICE: (state, action) => {
    console.log('payload received ->', action.payload);
    const { service, message, error } = action.payload;
    return {
      ...state,
      service,
      message,
      error
    };
  },
  COMPANYJOB: (state, action) => {
    console.log('payload received ->', action.payload);
    const { jobentery, message, error } = action.payload;
    return {
      ...state,
      jobentery,
      message,
      error
    };
  },
  COMPANYELEVATOR: (state, action) => {
    console.log('payload received ->', action.payload);
    const { elevator, message, error } = action.payload;
    return {
      ...state,
      elevator,
      message,
      error
    };
  },
  COMPANYKEYLOGS: (state, action) => {
    console.log('payload received ->', action.payload);
    const { keylogs, message, error } = action.payload;
    return {
      ...state,
      keylogs,
      message,
      error
    };
  },
  COMPANYFIREDEP: (state, action) => {
    console.log('payload received ->', action.payload);
    const { firedep, message, error } = action.payload;
    return {
      ...state,
      firedep,
      message,
      error
    };
  },
  COMPANYDATA: (state, action) => {
    // console.log('payload received ->', action.payload);
    const { company, contact, location, service, jobentery, elevator, keylogs, firedep } = action.payload;
    return {
      ...state,
      company,
      contact,
      location,
      service,
      jobentery,
      elevator,
      keylogs,
      firedep
    };
  },
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  // Global Api
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  ChangePath: () => Promise.resolve(),
  resetpassword: () => Promise.resolve(),
  verifypassword: () => Promise.resolve(),
  // Super Admin Api

  // Coustomer Api
  companyregister: () => Promise.resolve(),
  customercompany: () => Promise.resolve(),
  companycontact: () => Promise.resolve(),
  companylocation: () => Promise.resolve(),
  companyservice: () => Promise.resolve(),
  companyjob: () => Promise.resolve(),
  companyelevator: () => Promise.resolve(),
  companykeylogs: () => Promise.resolve(),
  companyfiredep: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [pathname, setPathName] = useState('')
  const ChangePath = () => {
    setPathName(window.location.pathname)
    console.log(pathname, "Its Current Path")
  }
  useEffect(() => { ChangePath() }, [window.location.pathname])

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await axios.get(`api/customer/data`);
          const { user } = response.data;

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user: null,

            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  // Global Apis
  const login = async (email, password) => {
    // console.log(pathname)
    if (pathname === '/superadmin/login') {
      // console.log('i Am SuperAdmin')
      const response = await axios.post('/api/superadmin/login', {
        email,
        password,
      });
      const { accessToken, user, status, error } = response.data;

      if (status === 'success') {
        // console.log('data==>', accessToken, user, status)
        setSession(accessToken);
        dispatch({
          type: 'LOGIN',
          payload: {
            user,
            error
          },
        });
      }
    }
    if (pathname === '/admin/login') {
      // console.log('i Am Admin')
      const response = await axios.post('/api/admin/login', {
        email,
        password,
      });
      const { accessToken, user, status, error } = response.data;

      if (status === 'success') {
        // console.log('data==>', accessToken, user, status)
        setSession(accessToken);
        dispatch({
          type: 'LOGIN',
          payload: {
            user,
            error
          },
        });
      }
    }
    if (pathname === '/agent/login') {
      // console.log('i Am Customer')
      const response = await axios.post('/api/customer/login', {
        email,
        password,
      });
      const { accessToken, user, status, error, message } = response.data;
      console.log(' response.data', response.data);
      // console.log('user', user);
      if (status === 'success') {
        localStorage.setItem('userID', user.id);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userRole', user.role);
        setSession(accessToken);
        customercompany(user.id);
        dispatch({
          type: 'LOGIN',
          payload: {
            user,
            message,
            error
          },
        });
      }
      if (status === 'failed') {
        dispatch({
          type: 'LOGIN',
          payload: {
            message,
            error
          },
        });
      }
    }
    if (pathname === '/salesman/login') {
      // console.log('i Am contractor')
      const response = await axios.post('/api/contractor/login', {
        email,
        password,
      });
      const { accessToken, user, status, message, error } = response.data;

      console.log('user', user);
      if (status === 'success') {
        localStorage.setItem('userID', user.id);
        setSession(accessToken);
        // customercompany(user.id);
        dispatch({
          type: 'LOGIN',
          payload: {
            user,
            message,
            error
          },
        });
      }
      if (status === 'failed') {
        dispatch({
          type: 'LOGIN',
          payload: {
            message,
            error
          },
        });
      }
    }
    if (pathname === '/technician/login') {
      // console.log('i Am technician')
      const response = await axios.post('/api/technician/login', {
        email,
        password,
      });
      const { accessToken, user, status, error } = response.data;
      if (status === 'success') {
        // console.log(' response.data', response.data);
        // console.log('data==>', accessToken, user, status)
        setSession(accessToken);
        dispatch({
          type: 'LOGIN',
          payload: {
            user,
            error
          },
        });
      }
    }
  };

  const register = async (email, password, firstname, lastname) => {
    if (pathname === '/agent/register') {
      const response = await axios.post('/api/contractor/register', {
        email,
        password,
        firstname,
        lastname,
      });
      const { user, message, error } = response.data;
      // console.log(' response.data', response.data);  
      // window.localStorage.setItem('accessToken', accessToken);
      dispatch({
        type: 'REGISTER',
        payload: {
          user,
          message,
          error
        },
      });
    }
    if (pathname === '/salesman/register') {
      const response = await axios.post('/api/customer/register', {
        email,
        password,
        firstname,
        lastname,
      });
      const { user, message, error } = response.data;
      // console.log(' response.data', response.data);  
      // window.localStorage.setItem('accessToken', accessToken);
      dispatch({
        type: 'REGISTER',
        payload: {
          user,
          message,
          error
        },
      });
    }

  };

  const logout = async () => {
    setSession(null);
    localStorage.clear();
    dispatch({ type: 'LOGOUT' });
  };

  const resetpassword = async (email) => {
    if (pathname === '/customer/reset-password') {
      const response = await axios.post(`api/customer/forgotpassword`, { email });
      const { message, error } = response.data;
      dispatch({
        type: 'RESETPASSWORD',
        payload: {
          message,
          error
        },
      });
    };
    if (pathname === '/contractor/reset-password') {
      const response = await axios.post(`api/contractor/forgotpassword`, { email });
      const { message, error } = response.data;
      dispatch({
        type: 'RESETPASSWORD',
        payload: {
          message,
          error
        },
      });
    };
  }

  const verifypassword = async (token, password, confirmpassword) => {
    if (pathname === '/customer/verify') {
      const response = await axios.post(`api/customer/resetpassword`, { token, password, confirmpassword });
      const { message, error } = response.data;
      dispatch({
        type: 'VERIFYPASSWORD',
        payload: {
          message,
          error
        },
      });
    }
    if (pathname === '/contractor/verify') {
      const response = await axios.post(`api/contractor/resetpassword`, { token, password, confirmpassword });
      const { message, error } = response.data;
      dispatch({
        type: 'VERIFYPASSWORD',
        payload: {
          message,
          error
        },
      });
    }
  }

  // Super Admin Api

  // Customer APIS
  const companyregister = async (customerid, contractorid, companyname, streetaddress, city, state, suitenumber, zipcode, website, email, phone, fax, notes, logo) => {
    console.log(logo);
    const formData = new FormData();
    formData.append("customerid", customerid)
    formData.append("contractorid", contractorid)
    formData.append("companyname", companyname)
    formData.append("streetaddress", streetaddress)
    formData.append("city", city)
    formData.append("state", state)
    formData.append("suitenumber", suitenumber)
    formData.append("zipcode", zipcode)
    formData.append("website", website)
    formData.append("email", email)
    formData.append("phone", phone)
    formData.append("fax", fax)
    formData.append("notes", notes)
    formData.append("logo", logo)

    // return;

    const response = await axios.post('api/customer/addcompany', formData);
    // console.log('response after api hit ->', response.data)
    const { company, error, message } = response.data;
    localStorage.setItem('companyID', company.id);
    dispatch({
      type: 'COMPANYREGISTER',
      payload: {
        company,
        message,
        error
      },
    });
  };

  const companycontact = async (customerid, firstname, lastname, email, phonecell, officephone, role, notes) => {
    const response = await axios.post('api/customer/adduserinfo', { customerid, firstname, lastname, email, phonecell, officephone, role, notes });
    const { contact, error, message } = response.data;
    // console.log('response after api hit ->',)
    localStorage.setItem('contactID', contact.id);
    dispatch({
      type: 'COMPANYCONTACT',
      payload: {
        contact,
        message,
        error
      },
    });
  };

  const companylocation = async (customerid, name, address, city, country, state, zip, floors, floorscount, elevator, elevatorcount, resdentialunit, resdentialunitcount, firedepartmentconnection, accessnotes, locationkeyquantity, locationnotes, image) => {
    const formData = new FormData();
    formData.append("customerid", customerid)
    formData.append("name", name)
    formData.append("address", address)
    formData.append("city", city)
    formData.append("country", country)
    formData.append("state", state)
    formData.append("zip", zip)
    formData.append("floors", floors)
    formData.append("floorscount", floorscount)
    formData.append("elevator", elevator)
    formData.append("elevatorcount", elevatorcount)
    formData.append("resdentialunit", resdentialunit)
    formData.append("resdentialunitcount", resdentialunitcount)
    formData.append("firedepartmentconnection", firedepartmentconnection)
    formData.append("accessnotes", accessnotes)
    formData.append("locationkeyquantity", locationkeyquantity)
    formData.append("locationnotes", locationnotes)
    formData.append("image", image)

    const response = await axios.post('api/customer/addcompanylocation', formData);
    // console.log('response after api hit ->', response.data)
    const { location, error, message } = response.data;
    localStorage.setItem('locationID', location.id);
    dispatch({
      type: 'COMPANYLOCATION',
      payload: {
        location,
        message,
        error
      },
    });
  };

  const companyservice = async (customerid, assettype, servicetype, servicefrequency, servicedescription, servicewindow, servicedate, nextscheduledservicedate) => {
    const response = await axios.post('api/customer/addserviceentry', {
      customerid,
      assettype,
      servicetype,
      servicefrequency,
      servicedescription,
      servicewindow,
      servicedate,
      nextscheduledservicedate
    });
    const { service, error, message } = response.data;
    // console.log('response after api hit ->',)
    localStorage.setItem('serviceID', service.id);
    dispatch({
      type: 'COMPANYSERVICE',
      payload: {
        service,
        message,
        error
      },
    });
  };

  const companyjob = async (customerid, locationname, locationservices, jobtype, jobdescription, jobscheduleddate, jobscheduledstarttime, startingwindow, contractorcompany, scheduledtechnician, technicianphone, clockintime, techniciancountonsite, partsused, distancefromhomeoffice, anyissues, servicelistcomplete, clockouttime) => {
    const response = await axios.post('api/customer/addjobentry', {
      customerid,
      locationname,
      locationservices,
      jobtype,
      jobdescription,
      jobscheduleddate,
      jobscheduledstarttime,
      startingwindow,
      contractorcompany,
      scheduledtechnician,
      technicianphone,
      clockintime,
      techniciancountonsite,
      partsused,
      distancefromhomeoffice,
      anyissues,
      servicelistcomplete,
      clockouttime,
    });
    const { jobentery, error, message } = response.data;
    // console.log('response after api hit ->',)
    localStorage.setItem('jobenteryID', jobentery.id);
    dispatch({
      type: 'COMPANYJOB',
      payload: {
        jobentery,
        message,
        error
      },
    });
  };
  const companyelevator = async (customerid, locationname, elevatornumber, elevatorlocation, assetmodel, assetserialnumber, assetbornondate, installingcontractor, servicecontractor, distributorcompany, assetahj, assetcondition, floorserviced, primaryrecallfloor, secondaryrecallfloor, schematicprovided, firerecall, servicedate, nextscheduled) => {
    const response = await axios.post('api/customer/addelevatordetail', {
      customerid,
      locationname,
      elevatornumber,
      elevatorlocation,
      assetmodel,
      assetserialnumber,
      assetbornondate,
      installingcontractor,
      servicecontractor,
      distributorcompany,
      assetahj,
      assetcondition,
      floorserviced,
      primaryrecallfloor,
      secondaryrecallfloor,
      schematicprovided,
      firerecall,
      servicedate,
      nextscheduled
    });
    const { elevator, error, message } = response.data;
    // console.log('response after api hit ->',)
    localStorage.setItem('elevatorID', elevator.id);
    dispatch({
      type: 'COMPANYELEVATOR',
      payload: {
        elevator,
        message,
        error
      },
    });
  };
  const companykeylogs = async (customerid, keyidnumber, locationname, keytype, OFPMhavecopy, onsitelocation, onsitelockboxcode, manufacturer, stampcode, notes) => {
    const response = await axios.post('api/customer/addkeylog', { customerid, keyidnumber, locationname, keytype, OFPMhavecopy, onsitelocation, onsitelockboxcode, manufacturer, stampcode, notes });
    const { keylogs, error, message } = response.data;
    // console.log('response after api hit ->',)
    localStorage.setItem('keylogsID', keylogs.id);
    dispatch({
      type: 'COMPANYKEYLOGS',
      payload: {
        keylogs,
        message,
        error
      },
    });
  };
  const companyfiredep = async (customerid, fdcshared, fdcsharesaddress, fdcrisers, fdclocation, fdcsize, connectiontype, valveconnection, valvetype, servicedate, nextscheduled) => {
    const response = await axios.post('api/customer/addconnectiondetail', { customerid, fdcshared, fdcsharesaddress, fdcrisers, fdclocation, fdcsize, connectiontype, valveconnection, valvetype, servicedate, nextscheduled });
    const { firedep, error, message } = response.data;
    // // console.log('response after api hit ->',)
    // localStorage.setItem('firedepID', firedep.id);
    dispatch({
      type: 'COMPANYFIREDEP',
      payload: {
        firedep,
        message,
        error
      },
    });
  };
  const customercompany = async (id) => {
    const response = await axios.get(`api/customer/companies/${id}`);
    const { company, contact, location, service, jobentery, elevator, keylogs, firedep } = response.data;
    // console.data(response.data)
    dispatch({
      type: 'COMPANYDATA',
      payload: {
        company,
        contact,
        location,
        service,
        jobentery,
        elevator,
        keylogs,
        firedep
      },
    });
    // console.log('hi')
  };


  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        // Global Methods Call
        login,
        register,
        logout,
        ChangePath,
        resetpassword,
        verifypassword,
        // Super Admin Methods Call

        // Customer Methods Call
        companyregister,
        customercompany,
        companycontact,
        companylocation,
        companyservice,
        companyjob,
        companyelevator,
        companykeylogs,
        companyfiredep
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
