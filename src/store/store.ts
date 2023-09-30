// import { configureStore } from '@reduxjs/toolkit';
// import saveReducer from './saveSlice';

// const store = configureStore({
//   reducer: {
//     saveReducer,
//   },
// });

// export default store;
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
});

export default store;
