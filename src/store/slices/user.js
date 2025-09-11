import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';



const initialState = {
    isAuthenticated: false,
    user: null,
    isInitialized: false
  };

  export const initializeUser = createAsyncThunk(
    'user/initialize',
    async (_, { dispatch }) => {
      const token = localStorage.getItem('admintoken');
      // const user = localStorage.getItem("adminuser");
      
      if (token ) {
        
      const userResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/profile-edit`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = userResponse.data;
      
      
  
        dispatch(setLogin({ token, user: user.data }));
        // dispatch(setLogin(token));
      } else {
        dispatch(setLogout());
      }
    }
  );


  const slice = createSlice({
    name: 'user',
    initialState,
  
    reducers: {
      setLogin(state, action) {
        const { token, user } = action.payload;
        state.user = user;
        state.isAuthenticated = true;
        localStorage.setItem('admintoken', token)
        localStorage.setItem('adminrole', user.role)
        // localStorage.setItem('adminuser', JSON.stringify(user))
        
      },
      setLogout(state) {
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem('admintoken')
        localStorage.removeItem('adminrole')
        localStorage.removeItem('device_token')
        
        
      },
      updateUser(state, action) {
        state.user = action.payload;
        state.isAuthenticated = true;
      },
    }
});


// Reducer
export default slice.reducer;

// Actions
export const { setLogin, updateUser, setLogout} = slice.actions;
