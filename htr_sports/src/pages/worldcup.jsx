import { MainLayout } from "./mainLayout";
import React, {useState, useEffect} from 'react';
import wcimg from '../WorldCupImages/wc_logo.png';
import flagsImg from '../WorldCupImages/flagsListTra.png';
import mlBanner from '../WorldCupImages/MLBanner.jpeg';
//useeffect for auto display data to screen without button to refresh




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
          <h1 style={titleStyles.title}>World Cup Winner Prediction</h1>
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
  

  
  const wcPredictionSection = {
    wcPredictionPage: {
      width: "100%",
      height: "760px",
      
    },  
  
  };
  
  
  // For Page Title
  const titleStyles = {
    title_div: {
      width: "100%",
      textAlign: "center",
      margin: "auto",
      paddingTop: "3rem",
      paddingBottom: "3rem",
  
    },
    title: {
      color: "#56042C",
      fontSize: "40px",
      fontFamily: "Helvetica",
    },
  };

export default WorldCup;