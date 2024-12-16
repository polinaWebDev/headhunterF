import { createMemoryRouter} from "react-router-dom";
import {IndexLayout} from "./index_layout/index_layout";
import {HomeScreen} from "./home/HomeScreen.tsx";
import {LoginPage} from "./Login/LoginPage.tsx";
import {ProfilePage} from "./Profile/ProfilePage.tsx";
import {RegisterPage} from "./Register/RegisterPage.tsx";
import ResumeEditorPage from "./CreateResume/ResumePage.tsx";
import MyCompanies from "./Company/My-companies.tsx";
import CreateCompanyPage from "./Company/CreateCompanyPage.tsx";
import CompanyDetailsPage from "./Company/Details/CompanyDetailsPage.tsx";
import ChatPage from "./Chats/ChatPage.tsx";
import ChatPageCompany from "./Chats/ChatPageCompany.tsx";

export const appRouter = createMemoryRouter([
    {
        path: "/",
        element: <IndexLayout/>,
        children: [
            {
                path: "/",
                index: true,
                element: <HomeScreen/>
            },
            {
                path: "/login",
                element: <LoginPage/>
            },
            {
                path: "/register",
                element: <RegisterPage/>
            },
            {
                path: "/profile",
                element: <ProfilePage/>
            },
            {
                path: "/my-companies",
                element: <MyCompanies/>
            },
            {
              path: "/companies/create",
              element: <CreateCompanyPage/>
            },
            {
                path: "/chats",
                element: <ChatPage/>
            },
            {
                path: "chats/:companyId",
                element: <ChatPageCompany/>
            },
            {
                path: "/company/:companyId",
                element: <CompanyDetailsPage/>
            },
            {
                path: "/resume/:userId",
                element: <ResumeEditorPage/>
            }
        ]
    }
])
