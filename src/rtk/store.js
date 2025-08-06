import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
// api import
import { authApi } from "./AuthApi/authApi";
import { NewsApi } from "./newsApi/newsApi";
import { ContactApi } from "./ContactApi/contactApi";
import { InvsetmentApi } from "./investmentApi/invesmetntApi";
import { MatchApi } from "./matchApi/matchApi";
import { MembershipApi } from "./membershipApi/membershipApi";
import { TeamMemberApi } from "./teamMemberApi/teamMemberApi";
import { TeamApi } from "./teamApi/teamApi";
import { EventApi } from "./eventApi/eventApi";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [NewsApi.reducerPath]: NewsApi.reducer,
    [EventApi.reducerPath]: EventApi.reducer,

    [InvsetmentApi.reducerPath]: InvsetmentApi.reducer,
    [MatchApi.reducerPath]: MatchApi.reducer,
    [MembershipApi.reducerPath]: MembershipApi.reducer,
    [TeamMemberApi.reducerPath]: TeamMemberApi.reducer,
    [TeamApi.reducerPath]: TeamApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(NewsApi.middleware)
      .concat(EventApi.middleware)
      .concat(ContactApi.middleware)
      .concat(InvsetmentApi.middleware)
      .concat(MatchApi.middleware)
      .concat(MembershipApi.middleware)
      .concat(TeamMemberApi.middleware)
      .concat(TeamApi.middleware),
});
setupListeners(store.dispatch);
export default store;
