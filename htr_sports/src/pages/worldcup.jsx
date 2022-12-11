import { MainLayout } from "./mainLayout";
import React, { useState, useEffect } from 'react';
import wcimg from '../WorldCupImages/wc_logo.png';
import flagsImg from '../WorldCupImages/flagsListTra.png';
import mlBanner from '../WorldCupImages/MLBanner.jpeg';


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
            Even if you're not a football fan, you might still find it fun and interesting. It is where 32 different countries from around the 
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
            is Random Forests. And of course the algorithm will require meaningful football data of each country.
          </p>
        </div>

        <div style={wcInnerTitle.title_div}>
          <h1 style={wcInnerTitle.title}>ML Random Forests</h1>
        </div>

        <div className="paragraph" style={wcPredictionSection.paragraph}>
          <p className="testStyle" style={wcPredictionSection.textStyle}>

          </p>
        </div>




      </div>
    </MainLayout>

  </div>
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
  },
  textStyle: {
    color:" rgba(27,32,49,0.8)",
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