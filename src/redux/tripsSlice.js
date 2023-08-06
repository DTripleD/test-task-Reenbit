import { createSlice, nanoid } from "@reduxjs/toolkit";

import staticData from "../data/data.json";

const initialState = [
  {
    name: "Athens",
    imageUrl:
      "https://res.cloudinary.com/dj6mkr2e6/image/upload/v1690896299/athens_vmn2zj.webp",
    id: nanoid(),
    startTime: 1698145454550,
    endTime: 1698545554550,
  },
];

const tripsSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    addContact: {
      reducer: (state, { payload }) => {
        return [...state, payload];
      },
      prepare: (data) => {
        return {
          payload: {
            ...data,
            name: data.city,
            id: nanoid(),
            imageUrl: staticData.find((c) => c.name === data.city).imageUrl,
            startTime: new Date(data.startDate).getTime(),
            endTime: new Date(data.endDate).getTime(),
          },
        };
      },
    },
    deleteContact: (state, { payload }) =>
      state.filter((contact) => contact.id !== payload),
  },
});

export const { addContact, deleteContact } = tripsSlice.actions;
export default tripsSlice.reducer;
