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
import AddTeamMember from "../modules/TeamMember/components/AddTeamMember";
import UpdateNews from "../modules/News/components/UpdateNewsItem";
import UpdateTeamMember from "../modules/TeamMember/components/UpdateTeamMember";
import UpdateEvent from "../modules/Events/components/UpdateEvent";
import AddMembership from "../modules/Membership/components/AddMembership";
import UpdateMembership from "../modules/Membership/components/UpdateMembership";
import AddMatch from "../modules/Match/components/AddMatch";
import UpdateMatch from "../modules/Match/components/UpdateMatch";
import AddInvestment from "../modules/Investment/components/AddInvestment";
import UpdateInvestment from "../modules/Investment/components/UpdateInvestment";

//dashboard

const AppRoutingSetup = () => {
  return (
    <Routes>
      {/* <Route element={<RequireAuth />}> */}
      <Route element={<Demo6Layout />}>
        <Route path="/" element={<DefaultPage />} />
        <Route path="/all-news" element={<NewsList />} />
        <Route path="/add-news" element={<AddNews />} />{" "}
        <Route path="/update-news/:id" element={<UpdateNews />} />
        <Route path="/all-contact" element={<ContactList />} />
        <Route path="/all-matches" element={<MatchList />} />
        <Route path="/add-match" element={<AddMatch />} />
        <Route path="/update-match/:id" element={<UpdateMatch />} />
        <Route path="/all-team" element={<TeamList />} />
        <Route path="/all-teamMember" element={<TeamMemberList />} />
        <Route path="/add-membership" element={<AddMembership />} />
        <Route path="/update-membership/:id" element={<UpdateMembership />} />
        <Route path="/add-teamMember" element={<AddTeamMember />} />{" "}
        <Route path="/update-teamMember/:id" element={<UpdateTeamMember />} />
        <Route path="/all-membership" element={<MembershipList />} />
        <Route path="/all-event" element={<EventList />} />
        <Route path="/add-event" element={<AddEvent />} />{" "}
        <Route path="/update-event/:id" element={<UpdateEvent />} />
        <Route path="/all-investment" element={<InvestmentList />} />
        <Route path="/add-investment" element={<AddInvestment />} />
        <Route path="/update-investment/:id" element={<UpdateInvestment />} />
      </Route>
      <Route path="error/*" element={<ErrorsRouting />} />
      <Route path="auth/*" element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/error/404" />} />
    </Routes>
  );
};
export { AppRoutingSetup };
