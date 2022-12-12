import React from "react";
import { useEffect, useState } from "react";
import { MainLayout } from "../mainLayout";
import { NavLink } from "react-router-dom";
import { Link } from "@material-ui/core";

import "../css/soccerCss/SoccerNews.css";

const SoccerNews = () => {

    const [SoccerNews, setSoccerNews] = useState({});
    useEffect(() => {
        const options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
            'X-RapidAPI-Host': 'livescore-football.p.rapidapi.com'
        },
        };
    
        if ([]) {
            fetch('https://livescore-football.p.rapidapi.com/soccer/news-list?page=1', options)
            .then((response) => response.json())
            .then((data) => {
              setSoccerNews(data.data);
            });
          console.log(SoccerNews);
          console.log("Working");
        }
      }, []);

  return (
    <div className="SoccerNews" style={{ backgroundColor: "#171717" }}>
    <MainLayout>
    <div style={{ backgroundColor: "#171717" }}>
        <h4 style={{fontSize:'xxx-large',color: '#ec6a00'}}>Recent Soccer News Around the World</h4>
    </div>
    <div >
    <table style={{fontSize:'x-large', backgroundColor: '#171717'}} className="SoccerNewsTable">
                  <tr>
                    <th style={{fontSize:'xxx-large'}}>Image</th>
                    <th style={{fontSize:'xxx-large'}}>Title</th>
                    <th style={{fontSize:'xxx-large'}}>Caption</th>
                    <th style={{fontSize:'xxx-large'}}>Link to Article</th>
                  </tr>
                  {SoccerNews.length > 0 &&
                    SoccerNews.map((news) => {
                      return (
                        <tr key={news.id}>
                          
                          <td>
                            <img
                              src={news.thumbnail_1}
                              alt="League Logo"
                              style={{
                                width: 750,
                                height: 550,
                              }}
                            />
                          </td>
                         <td style={{fontSize:'xxx-large'}}>{news.title}</td>
                          <td style={{fontSize:'xxx-large'}}>{news.caption}</td>
                          <td style={{fontSize:'xxx-large'}}><a href={news.url} style={{color:'#ec6a00', textDecoration:'None'}}>Link to the article </a></td>
                        </tr>
                      );
                    })}
                </table >
    </div>
    </MainLayout>
    </div>
  );
};

export default SoccerNews;
