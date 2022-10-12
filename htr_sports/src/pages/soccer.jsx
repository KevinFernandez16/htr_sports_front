// const Soccer = () => {
//     return <div className="page">SOCCER</div>
// }

// export default Soccer;

import useFetch from "../components/useFetch";
import { MainLayout } from "./mainLayout";




const Soccer = () => {

    // const {data, loading, error} = useFetch("https://www.scorebat.com/video-api/v3/feed/?token=Mjc4MDdfMTY2NDE0ODQ1OF80NjgyMGI2MzE1YmFlN2IyZmE2ZmNkNzAxMTg2Y2VjMGI4MTIxZjNi%22");

    // console.log(data?.response);
    // if(loading) return <h1>Loading...</h1>

    // if(error) console.log(error);

    return <div className="page">
        <MainLayout>
            <div>
                {/* <div> 
                <iframe src={data?.response[23].matchviewUrl} width="500" height="300"></iframe>
    
            </div> */}
            </div>
        </MainLayout>

    </div>
}

export default Soccer;