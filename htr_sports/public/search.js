import React, {UseState} from 'react';

<input type = "text" onChange ={SearchType} value = {Title} />//creates the text field where the search is conducted
//button here

const [Title, SetTitle] = UseState("");//declare variables

//reference firebase database

const SearchType = (event) => {event.preventDefault(); 
    SetTitle(event.target.value);////this reads changes made in the search bar
};

//still working on loop

if(Title.length > 0){//database name = db
    db.filter(("./Posts_News") =>{
    return db.title.match(Title);//returns the name typed in search box after filtering through firebase database
});
}

