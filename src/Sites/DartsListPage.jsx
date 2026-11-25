import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

export const DartsListPage = () => {

    const [GetDarts, SetDarts] = useState([]);
    const [GetHiba, SetHiba] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);

    useEffect(() => {
        setFetchPending(true);
        axios.get("https://darts.sulla.hu/darts")
            .then((res) => SetDarts(res.data))
            .catch(error => {
                SetHiba(error);
                console.error(error);
            })
            .finally(() => setFetchPending(false));
    }, []);

    return (
        <div className='container p-5 m-auto text-center content bg-ivory'>
            {isFetchPending ? (
                <div className='spinner-border text-warning'></div>
            ) : (
                <div className="row g-4">
                    {GetDarts.map((darts, index) => (
                        <div className="col-12 col-md-6 col-lg-4" key={darts.id || index}>
                            <div className="card h-100 p-3 shadow-sm">
                                <img 
                                    className="img img-thumbnail mb-3" 
                                    src={darts.image_url} 
                                    alt={darts.name} 
                                    title={darts.name} 
                                    style={{ height: "250px", objectFit: "cover" }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="text-dark">Dartsozó Neve: <strong>{darts.name}</strong></h5>
                                    <h6 className="text-dark">Dartsozó Születési Éve: <strong>{darts.birth_date}</strong></h6>
                                    <h5 className="text-dark">Nyert Bajnokságok: <strong>{darts.world_ch_won}</strong></h5>
                                    
                                    <div className="mt-auto pt-3">
                                        <a 
                                            className="text-decoration-none text-warning d-block mb-2" 
                                            href={darts.profile_url} 
                                            target="_blank" 
                                            rel="noreferrer"
                                        >
                                            <strong>Profile Link</strong>
                                        </a>
                                        <Link to={"/darts/" + darts.id}><i className='bi bi-eye p-2 text-warning fs-5' /></Link>
                                        <Link to={"/mod-darts/" + darts.id}><i className='bi bi-pencil p-2 text-warning fs-5' /></Link>
                                        <Link to={"/del-darts/" + darts.id}><i className='bi bi-trash3 p-2 text-warning fs-5' /></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};