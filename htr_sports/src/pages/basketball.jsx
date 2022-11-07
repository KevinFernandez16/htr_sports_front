import { MainLayout } from "./mainLayout";
import "../pages/css/basketball.css";

const Basketball = () => {
  return (
    <div className="basketball">
      <MainLayout>
        <div>
          <h1 className="Headtitle">Welcome to our Basketball Page</h1>
          <div className="flexbox-container">
            <div className="Basketball-Links">
              <h2 className="Titles">Basketball Links</h2>
              <p className="Texts">
                In this containers, there is links being placed that will take
                us to different sections of our basketball page
              </p>
            </div>
            <div className="Basketball-News">
              <h2 className="Titles">Basketball News</h2>
              <p className="Texts">
                In this containers we can add the basketball news that is pulled
                from Carlos' web scraper
              </p>
            </div>
            <div className="Basketball-Widget">
              <h2 className="Titles">Live Basketball Scores</h2>
              <p className="Texts">
                In this section, we will find a basketball widget to display
                live scores
              </p>
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default Basketball;
