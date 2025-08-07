import { Navigate, Route, Routes } from "react-router";
import { DefaultPage } from "@/pages/dashboards";

import { AuthPage } from "@/auth";
import { Demo6Layout } from "@/layouts/demo6";
import { ErrorsRouting } from "@/errors";
import NewsList from "../modules/News/components/NewsList";
import ContactList from "../modules/Contactnfo/components/ContactList";
import EventList from "../modules/Events/components/EventList";
import MatchList from "../modules/Match/components/MatchList";
import MembershipList from "../modules/Membership/components/MembershipList";
import InvestmentList from "../modules/Investment/components/InvestmentList";
import TeamMemberList from "../modules/TeamMember/components/TeamMemberList";
import TeamList from "../modules/Team/components/TeamList";
import AddNews from "../modules/News/components/AddNewsItem";
import AddEvent from "../modules/Events/components/AddEvent";

//dashboard

const AppRoutingSetup = () => {
  return (
    <Routes>
      {/* <Route element={<RequireAuth />}> */}
      <Route element={<Demo6Layout />}>
        <Route path="/" element={<DefaultPage />} />
        <Route path="/all-news" element={<NewsList />} />
        <Route path="/add-news" element={<AddNews />} />
        <Route path="/all-contact" element={<ContactList />} />
        <Route path="/all-matches" element={<MatchList />} />
        <Route path="/all-team" element={<TeamList />} />
        <Route path="/all-teamMember" element={<TeamMemberList />} />{" "}
        <Route path="/add-teamMember" element={<AddTeamMember />} />
        <Route path="/all-membership" element={<MembershipList />} />
        <Route path="/all-event" element={<EventList />} />
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/all-investment" element={<InvestmentList />} />
      </Route>
      <Route path="error/*" element={<ErrorsRouting />} />
      <Route path="auth/*" element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/error/404" />} />
    </Routes>
  );
};
export { AppRoutingSetup };
