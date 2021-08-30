import React from 'react';
import {Link} from 'react-router-dom';
import '../../css/App.scss';


function Home (props){
    return(
        <main>
            <h1 className = "hiddenTitle">Home page</h1>
            <section className = "App-header">
                <h2>Welcome to my Motorcycle Riders Community Web Application!</h2>
                <p>My name is Will Midgette and I am a big motorcycle enthusiast. On my KLR 650, I love exploring Ontario solo. However, it is always nice riding with others and that is why I made this application.</p>
                <p>On this site, riders can check out upcoming group trips, see who is currently signed up, and register if they wish. Being a young guy myself, I've found it difficult to find rides with people my age. That is why one of the features I will be adding is to sort trips by the average age of attendees. Of course there will still be plenty of rides open to everyone!</p>
            </section>
        </main>
    )
}
export default Home;