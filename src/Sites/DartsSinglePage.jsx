import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react"
import axios from 'axios'

export const DartSinglePage = () =>{

    const [GetDarts,SetGetDarts] = useState([]);
    const [GetHiba,SetHiba] = useState([]);
    const Params = useParams();
    const id = Params.DartsId;
    const [isFetchPending,setFetchPending] = useState(false);

    useEffect(() =>{
        setFetchPending(true)
        axios.get(`https://darts.sulla.hu/darts/${id}`)
        .then((res) => SetGetDarts(res.data))
        .catch(error => {
            SetHiba(error)
            console.error(error)
        })
        .finally(() => setFetchPending(false))
    },[id])

    return(
        <>
        <div className='p-5 m-auto text-center content bg-invory'>
            {isFetchPending ? <div className='spinner-border text-warning'></div> : 
                <div>
                        <div>
                            <div className="card col-md-3 d-inline-block p-2 m-1">
                                <img className="img img-thumbnail" src={GetDarts.image_url} alt={GetDarts.name} title={GetDarts.name}/>
                                <h5 className="text-dark">GetDartsozó Neve: <strong>{GetDarts.name}</strong></h5>
                                <h6 className="text-dark">Datsozó Születési Éve: <strong>{GetDarts.birth_date}</strong></h6>
                                <h5 className="text-dark">Nyert Bajnokságok: <strong>{GetDarts.world_ch_won}</strong></h5>
                                <Link className="text-decoration-none text-warning" to={GetDarts.profile_url} target="_blank"><strong>Profile Link</strong></Link>
                                <Link to={"/darts/" + GetDarts.id}>
                                </Link> <br />
                                <Link to={"/"}><i className='bi bi-arrow-return-left p-2 text-warning'/></Link>
                                <Link to={"/mod-darts/" + GetDarts.id}><i className='bi bi-pencil p-2 text-warning'/></Link>
                                <Link to={"/del-darts/" + GetDarts.id}><i className='bi bi-trash3 p-2 text-warning'/></Link>
                            </div>  
                        </div>
                </div>}
        </div>
        </>
    )
}