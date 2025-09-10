import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';



const initialState = {
    isAuthenticated: false,
    user: null,
    isInitialized: false
  };

  export const initializeUser = createAsyncThunk(
    'user/initialize',
    async (_, { dispatch }) => {
      const token = localStorage.getItem('admintoken');
      const user = localStorage.getItem("adminuser");
      
      // const userResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/edit-profile`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      // const user = userResponse.data;
      // console.log('Fetching user' , user);
      
      const parsedUser = JSON.parse(user); 
      
  
      if (token && user) {
        dispatch(setLogin({ token, user: parsedUser }));
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
        // localStorage.removeItem('admintoken')
        // localStorage.removeItem('adminrole')
        localStorage.clear();
        // localStorage.removeItem('adminuser')
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
