import { MainLayout } from "./mainLayout";
import Carousel from "../components/Carousel";
import "./Pages.css";
const Home = () => {
    return <div className="page"> 
        <MainLayout>
            <div className="page">
                <Carousel/>
            </div>
        </MainLayout> 

    </div>
}

export default Home;