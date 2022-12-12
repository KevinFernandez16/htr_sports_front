import { MainLayout } from "./mainLayout";
import React, { useState, useEffect } from 'react';
import wcimg from '../WorldCupImages/wc_logo.png';
import flagsImg from '../WorldCupImages/flagsListTra.png';
import forestImg from '../WorldCupImages/forests.png';
import dataSetImg from '../WorldCupImages/dataset.PNG';
import graphMeans from '../WorldCupImages/graphsmeansNew.png';
import roundof16 from '../WorldCupImages/roundOf16.png';
import roundof8 from '../WorldCupImages/roundOf8.png';
import roundof4 from '../WorldCupImages/roundOf4.png';
import finalWinner from '../WorldCupImages/final.png';
import spainFlag from '../WorldCupImages/spainFlag.png';
import franceFlag from '../WorldCupImages/franceFlag.jpg';
import realistic_semi from '../WorldCupImages/realistic_semi.png';
import realistic_final from '../WorldCupImages/realistic_final.png';

const WorldCup = () => {

  return <div>
    <MainLayout>
      <div style={styles.banner}>
        <img src={wcimg} alt="logo" style={styles.worldCupImg} />
      </div>

      <div style={styles.contendersContainer}>
        <div style={titleStyles.title_div}>
          <h1 style={titleStyles.title}>World Cup Contenders</h1>
        </div>
        <img src={flagsImg} alt="flags" style={styles.countryFlags} />
      </div>

      <div style={styles.wcLiveSection}>
        <iframe title="WC Live Results"
          src="https://www.scorebat.com/embed/league/fifa-world-cup/?token=Mjc4MDdfMTY3MDA0NjkxMF9iNmE3OWUxMmRkZGY4Y2YwMWQ5M2I1ZTJlYjcyZTBlZmNmZmM2NWJl"
          width="100%"
          height="760px"
          frameborder="0"
          overflow="hidden"

        >
        </iframe>
      </div>

      {/* Div for ML Prediction Section */}
      <div style={wcPredictionSection.wcPredictionPage}>
        <div style={titleStyles.title_div}>
          <h1 style={titleStyles.title}>Using ML to Make 2022 Fifa World Cup Prediction</h1>
          <time datetime="2022-15-15" style={titleStyles.titleTime}> December 10, 2022 </time>
        </div>

        <div style={teamStyles.htrTeam}>
          <span class="topic" style={teamStyles.team}> HTR Sports </span>
          <span class="name" style={teamStyles.names}> Junior Tenezaca, Carlos Genis, Kevin Fernandez, Haley Leung, Mariglen Jahaj </span>
        </div>

        <div className="paragraph" style={wcPredictionSection.paragraph}>
          <p className="testStyle" style={wcPredictionSection.textStyle}>
            The World Cup occurs once every four years. France won the last World Cup in 2018 which was held in Russia.
            Even if you're not a football fan, you might still find it fun and interesting. It is a tournament where 32 different countries from around the
            participate to win the World Cup Trophy. Thousands of fans attend the matches traveling from as far as the other side of
            the globe. And with them they bring their cultures into the stadiums which are televised to millions around the world. The roar
            of the crowd cheering their country's team is something everyone should experience in their lifetime.
          </p>
        </div>

        <div className="paragraph" style={wcPredictionSection.paragraph}>
          <p className="testStyle" style={wcPredictionSection.textStyle}>
            The World Cup this year 2022 is being held in Qatar. It starts on November 21st and the final will be held on December 18.
            For our research component, We the HTR Sports group decided to try and predict which out of the 32 participating countries will win the World Cup tournament
            this year.
          </p>
        </div>

        <div className="paragraph" style={wcPredictionSection.paragraph}>
          <p className="testStyle" style={wcPredictionSection.textStyle}>
            Althought we know predicting the World Cup will be something very difficult, we still wanted to try because many of us
            in the group are fans of football and thought it would be fun. For the research component of our project, the goal is to learn
            something new in the field of Computer Science. To make our prediction we decided to study Machine Learning to help us with the
            prediction.
          </p>
        </div>

        <div style={wcInnerTitle.title_div}>
          <h1 style={wcInnerTitle.title}>Machine Learning to predict the World Cup?</h1>
        </div>

        <div className="paragraph" style={wcPredictionSection.paragraph}>
          <p className="testStyle" style={wcPredictionSection.textStyle}>
            Predicting a sports match is never as straight forward as it seems. To make a prediction, one could look at the current
            Fifa rankings and vote for the 1st place country. Currently in the Fifa rankings, Brazil is in first place. Brazil
            has won the World Cup five times, more than any other country. One could make the prediction that Brazil will win. However
            it is not that simple because in sports there are many other variables that can dictate who will win. Sometimes it's key players
            getting injured, red carded or penalty shootouts that that can go for either team.
          </p>
        </div>

        <div className="paragraph" style={wcPredictionSection.paragraph}>
          <p className="testStyle" style={wcPredictionSection.textStyle}>
            To make the prediction we will use Machine Learning. There are many machine learning algorithms but the one we will focus on
            is Random Forests. And of course the algorithm will require meaningful football data for each country.
          </p>
        </div>

        <div style={wcInnerTitle.title_div}>
          <h1 style={wcInnerTitle.title}>ML Random Forests</h1>
        </div>

        <div className="paragraph" style={wcPredictionSection.paragraph}>
          <p className="testStyle" style={wcPredictionSection.textStyle}>
            The algorithm we used to assist us with predicting the World Cup winner was the random forest algorithm. An important part of this
            algorithm is the decision trees. The best way to explain decision trees is that questions are asked along the way to derive a
            conclusion. The random forest algorithm works by building decision trees, each different than the previous one as the algorithm
            selects different subsets of data. Once all decision trees are built, the most likely outcome is selected as our prediction.
          </p>
        </div>

        <div style={styleForestImg.forestDiv} >
          <img src={forestImg} alt="MlForestIMG" style={styleForestImg.forestImgStyle} />
        </div>

        <div style={wcInnerTitle.title_div}>
          <h1 style={wcInnerTitle.title}>Understanding the Data</h1>
        </div>

        <div className="paragraph" style={wcPredictionSection.paragraph}>
          <p className="testStyle" style={wcPredictionSection.textStyle}>
            Before we could feed data to the algorithm, we first had to find a dataset and prepare it for a machine learning algorithm.
            Luckily, we were able to find a dataset containing all international matches from the last 30 years. We decided to only
            use data from the last 4 World Cups meaning the 2006, 2010, 2014, and 2018 editions since the sport is always evolving and
            going any further back could give us an inaccurate prediction.
          </p>
        </div>

        <div className="paragraph" style={wcPredictionSection.paragraph}>
          <p className="testStyle" style={wcPredictionSection.textStyle}>
            We had a dataset containing all World Cup matches from 2006-18. However, we realized that we had no data for some teams,
            Qatar had never been to a World Cup, Canada had not been to one in 30 years, and Wales was finally returning to the
            tournament after a 60-year absence. We decided to add data from their performances in their respective continental
            competitions into our dataset. This additional data was from 2006-present.
          </p>
        </div>

        <div className="paragraph" style={wcPredictionSection.paragraph}>
          <p className="testStyle" style={wcPredictionSection.textStyle}>
            However, our work wasn’t done as this dataset could not be fed to the algorithm in its current state. This is because we had
            some null values in some columns and our data contained strings (for example the name of the countries, competitions, and
            stadium where the matches took place). We decided to take the mean for every column and replace the null values with the
            respective mean of that column. As for replacing the strings, we used the get_dummies python function to convert our strings
            into a bunch of 0 and 1’s. This dataset was now ready to be trained and tested for machine learning.
          </p>
        </div>

        <div style={screenshots.screenshotDiv} >
          <h3 style={{ color: '#1b2031', padding: 10, textAlign: "center", fontWeight: "400" }}>Sample Data</h3>
          <img src={dataSetImg} alt="dataSetImg" style={screenshots.screenshotStyle} />
        </div>
        <div style={screenshots.screenshotDiv} >
          <h3 style={{ color: '#1b2031', padding: 10, textAlign: "center", fontWeight: "400" }}>Data Averages</h3>
          <img src={graphMeans} alt="GraphMeansImg" style={screenshots.screenshotStyle} />
        </div>

        <div style={wcInnerTitle.title_div}>
          <h1 style={wcInnerTitle.title}>Prediction</h1>
        </div>

        <div className="paragraph" style={wcPredictionSection.paragraph}>
          <p className="testStyle" style={wcPredictionSection.textStyle}>
            When it comes to the machine learning model of random forest, there is a concept called decision trees that are heavily involved
            in the random forest model. Decision trees are composed of nodes with each node corresponding to a feature of the input
            (A piece of data that it was fed) and depending on what value that features holds, it will direct our outcome in one of two
            directions (Win or lose in our case).
          </p>
        </div>

        <div className="paragraph" style={wcPredictionSection.paragraph}>
          <p className="testStyle" style={wcPredictionSection.textStyle}>
          To further explain this, one column that we used was  'home_team_goalkeeper_score'  which would hold the FIFA game score of how 
          the goalkeeper performed in a specific match. What random forest will do is pass that value as well as another value that can be 
          considered the starting point. For example, our starting point is score of 75, random forest will pass one of the value that is 
          inside the 'home_team_goalkeeper_score' column and if that value is lower than 75, it will most likely lead towards a direction 
          of a home team loss, while another greater than 75 would lead to a direction of a home team win. With random forest this is done 
          numerous times with numerous columns and at the end of the model, it will take the average or the mean of the decision trees. 
          (Are there more trees that predicted a win?, or are there more trees that predicted a loss? Random forest will display the choice 
          with the higher average/mean).
          </p>
        </div>

        <div className="paragraph" style={wcPredictionSection.paragraph}>
          <p className="testStyle" style={wcPredictionSection.textStyle}>
            During our research into Machine Learing and collecting the necessary date, the world cup matches had
            already begun. In the process of understanding the Random Forests algorithm and properly cleaning the data, the
            round of 32 had already begun. We had to start our simulation on the round of 16.
          </p>
        </div>

        <div style={screenshots.screenshotDiv}>
          <img src={roundof16} alt="roundOf16Img" style={{ display: "block", margin: "auto", width: "55%", height: "auto" }} />
        </div>

        <div style={screenshots.screenshotDiv}>
          <img src={roundof8} alt="QuarterFinalImg" style={{ display: "block", margin: "auto", width: "55%", height: "auto" }} />
        </div>

        <div style={screenshots.screenshotDiv}>
          <img src={roundof4} alt="SemiFinal" style={{ display: "block", margin: "auto", width: "55%", height: "auto" }} />
        </div>

        <div style={screenshots.screenshotDiv}>
          <img src={finalWinner} alt="Final" style={{ display: "block", margin: "auto", width: "55%", height: "auto" }} />
        </div>

        <div >
          <div style={{ borderStyle: " solid", borderColor: "#FEC310", borderWidth: "10px 10px 10px 10px" }}>
            <div style={wcInnerTitle.title_div}>
              <h1 style={wcInnerTitle.title}>Winner Spain</h1>
            </div>
            <div className="paragraph" style={wcPredictionSection.paragraph}>
              <p className="testStyle" style={wcPredictionSection.textStyle}>
                Our Random Forests simulation predicted that the final will be between Spain and Argentina. And
                Spain being the overall winners of the Fifa 2022 World Cup Tournament. Spain having won the tournament
                before in 2010 is a reasonable prediction.
              </p>
            </div>

            <div >
              <div style={screenshots.screenshotDiv}>
                <img src={spainFlag} alt="SpainFlag" style={{ display: "block", margin: "auto", width: "35%", height: "auto" }} />
              </div>
            </div>

          </div>

          <div style={wcInnerTitle.title_div}>
            <h1 style={wcInnerTitle.title}>Spain is out?</h1>
          </div>
          <div className="paragraph" style={wcPredictionSection.paragraph}>
            <p className="testStyle" style={wcPredictionSection.textStyle}>
              Our simulation made a reasonable prediction to have Spain winning the World Cup. However Sports can be very unpredictable.
              Spain was knocked out by Morocco in the round of 16. Based on the players for each team and their country performances in the recent years,
              most would have never thought Fifa Rank 22 Morocco would have knocked out Fifa Rank 7 Spain. It was a shock to the Soccer/Football
              community that shows how unpredictable sports can be.
            </p>
          </div>

          <div className="paragraph" style={wcPredictionSection.paragraph}>
            <p className="testStyle" style={wcPredictionSection.textStyle}>
              As of today December 12 2022, the competition is at the semi-finals with just four countries left (Argentina, Croatia, France, Morocco).
              For fun we decided to run a simulation for the remaining of the competition. The semi-finals and the finals and these are our results.
            </p>
          </div>

          <div style={screenshots.screenshotDiv}>
            <img src={realistic_semi} alt="Final" style={{ display: "block", margin: "auto", width: "55%", height: "auto" }} />
          </div>
          <div style={screenshots.screenshotDiv}>
            <img src={realistic_final} alt="Final" style={{ display: "block", margin: "auto", width: "55%", height: "auto" }} />
          </div>

          <div style={{ borderStyle: " solid", borderColor: "#FEC310", borderWidth: "10px 10px 10px 10px" }}>
            <h3 style={{ color: '#1b2031', paddingBottom: "2rem", paddingTop: "2rem", textAlign: "center", fontWeight: "700", fontSize: "32px" }}>Realistic Prediction Winner</h3>

            <div className="paragraph" style={wcPredictionSection.paragraph}>
              <p className="testStyle" style={wcPredictionSection.textStyle}>
                Running the simulation for the semi-final and the final, it is predicted that France will win the Fifa 2022 World Cup. In the
                semi-finals, Argentina will win their match against Croatia on December 13. France will win their match against Morocco on December 14.
                And France will win the final on December 18 to win the World Cup for their third time.
              </p>
            </div>

            <div style={{ paddingTop: "2rem", paddingBottom: "2rem", }}>
              <div style={screenshots.screenshotDiv}>
                <img src={franceFlag} alt="FranceFlag" style={{ display: "block", margin: "auto", width: "35%", height: "auto" }} />
              </div>
            </div>
          </div>

        </div>

      </div>


      <footer style={{ padding: "5px", backgroundColor: "#56042C", color: "white", margin: "auto", textAlign: "center" }}>
        <p></p>
      </footer>
    </MainLayout>

  </div>
}

const styleForestImg = {
  forestDiv: {
    display: 'block',
    margin: "auto",
    paddingBottom: "20px",
  },
  forestImgStyle: {
    width: "35%",
    height: "auto",
    display: 'block',
    margin: "auto",

  },
}

const screenshots = {
  screenshotDiv: {
    display: 'block',
    margin: "auto",
    paddingTop: "10px",
    paddingBottom: "20px",

  },
  screenshotStyle: {
    width: "55%",
    height: "auto",
    display: 'block',
    margin: "auto",
  },
}

const styles = {
  banner: {
    backgroundColor: "#56042C",
    width: "100%",
  },
  worldCupImg: {
    display: 'block',
    margin: "auto",
    width: "40%",
    height: "50%",
    padding: "60px",
  },
  countryFlags: {
    width: "100%",
  },
  contendersContainer: {
    backgroundColor: "#F5EEEC",
    paddingBottom: "50px",
  },
  wcLiveSection: {
    backgroundColor: "#56042C",
    padding: "50px",
    paddingTop: "80px",
  },


};


// World Cup Section
const wcPredictionSection = {
  wcPredictionPage: {
    width: "100%",
    height: "100%",
    paddingBottom: "6rem",
  },
  paragraph: {
    display: "block",
    margin: "auto",
    width: "58%",
    height: "100%",
    fontFamily: "Helvetica",
  },
  textStyle: {
    color: " rgba(27,32,49,0.8)",
    fontWeight: "400",
    fontSize: "18px",
    lineHeight: "24px",
    paddingBottom: "2rem",
  }
};

const wcInnerTitle = {
  title_div: {
    width: "60%",
    textAlign: "center",
    margin: "auto",
    paddingTop: "2rem",
    paddingBottom: "2rem",
  },
  title: {
    color: "#1b2031",
    fontSize: "40px",
    fontFamily: "Helvetica",
    fontWeight: "700",
    lineHeight: "40px",
  },

};


// For Section Titles
const titleStyles = {
  title_div: {
    width: "60%",
    textAlign: "center",
    margin: "auto",
    paddingTop: "6rem",
    paddingBottom: "2rem",
  },
  title: {
    color: "#1b2031",
    fontSize: "50px",
    fontFamily: "Helvetica",
    fontWeight: "700",
    lineHeight: "50px",
  },
  titleTime: {
    color: "rgba(27,32,49,0.5)",
    display: "block",
    paddingTop: "30px",

  },

};

const teamStyles = {
  htrTeam: {
    display: "grid",
    justifyContent: "center",
    paddingBottom: "25px",
    paddingBottom: "70px",
  },
  team: {
    color: "rgba(27,32,49,0.8)",
    fontWeight: "600",
    textAlign: "center",
    color: "#A0A0A0",
    padding: "8px",
  },
  names: {
    color: "#A0A0A0",
    fontWeight: "600",
    textAlign: "center",
  }
};



export default WorldCup;

// color: "#56042C"