import RegistrationUser from "./templates/registrationUser";
import Login from "./templates/login";
import {Route, Routes} from "react-router-dom";
import NotFound from "./templates/notFound";
import OperatorPage from "./templates/operatorPage";
import Header from "./components/Header";
import {UserProvider} from "./context/UserContext";
import User from "./templates/user";
import Home from "./templates/home";
import Profile from "./templates/profile";
import AnalystPage from "./templates/analystPage";
import AdminUsers from "./templates/adminUsers";
import Statistics from "./templates/statistics";
import Article from "./templates/article";
import ArticleChange from "./templates/articleChange";
import Employees from "./templates/employees";
import ThemeApp from "./theme/ThemeApp";
import {ThemeProvider} from "@mui/material";
import HR from "./templates/hr";
import Footer from "./components/Footer";



function App() {
    return (
        <ThemeProvider theme={ThemeApp}>
            <UserProvider>
                <Header/>
                <Routes>
                    <Route path="/hr" element={<HR/>}/>
                    <Route path="/employees" element={<Employees/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/user/:id" element={<User/>}/>
                    <Route path="/article/:id" element={<Article/>}/>
                    <Route path="/registration" element={<RegistrationUser/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/analyst" element={<AnalystPage/>}/>
                    <Route path="/operator" element={<OperatorPage/>}/>
                    <Route path="/statistics" element={<Statistics/>}/>
                    <Route path="/create_users" element={<AdminUsers/>}/>
                    <Route path="/article/:id/change" element={<ArticleChange/>}/>
                    <Route path="/" element={<Home/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
                <Footer/>
            </UserProvider>
        </ThemeProvider>
    );
}

export default App;
