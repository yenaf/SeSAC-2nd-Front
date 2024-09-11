import { createSlice } from '@reduxjs/toolkit';

const pageSlice = createSlice({
  name: 'page',
  initialState: {
    limit: 0, // 한 페이지에 보여줄 아이템 갯수
    totalPages: 0, // 총 페이지수
    currentPage: 1, // 현재 페이지
    totalItems: 0, // 총 상품갯수
  },
  reducers: {
    setPages: (state, action) => {
      const { limit, totalPages, currentPage, totalItems } = action.payload;
      state.limit = limit;
      state.totalPages = totalPages;
      state.currentPage = currentPage;
      state.totalItems = totalItems;
    },
  },
});

export const { setPages } = pageSlice.actions;

export default pageSlice.reducer;
