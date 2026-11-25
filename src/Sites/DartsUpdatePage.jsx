import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

export const DartsUpdatePage = () => {
    const [ShowModal, SetShowmodal] = useState(false);
    const params = useParams();
    const id = params.DartsId;
    const navigate = useNavigate();
    const [GetDarts, SetDarts] = useState({
        name: '',
        birth_date: '',
        world_ch_won: '',
        profile_url: '',
        image_url: ''
    });

    useEffect(() => {
        const FetchDartsData = async () => {
            try {
                const response = await axios.get(`https://darts.sulla.hu/darts/${id}`);
                SetDarts(response.data);
            } catch (error) {
                console.error("Hiba az adatok betöltésénél: ", error);
            }
        };
        FetchDartsData();
    }, [id]);

    const HandleSubmit = event => {
        event.preventDefault();
        axios.put(`https://darts.sulla.hu/darts/${id}`, GetDarts)
            .then(() => {
                SetShowmodal(true);
            })
            .catch((error) => {
                console.error("Hiba történt a módosítás során", error);
            });
    };

    const InputOnchange = event => {
        const { name, value } = event.target;
        SetDarts(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="container py-5">
            {/* Sikeres módosítás Modal */}
            {ShowModal && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header bg-success text-white">
                                <h5 className="modal-title">Sikeres módosítás!</h5>
                            </div>
                            <div className="modal-body">
                                A Darts játékos adatait sikeresen módosítottuk!
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success" onClick={() => navigate("/")}>
                                    Rendben
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white text-center fw-bold">
                            Darts játékos adatainak módosítása
                        </div>
                        <div className="card-body p-4">
                            {GetDarts.image_url && (
                                <div className="text-center mb-4">
                                    <img
                                        src={GetDarts.image_url}
                                        alt={GetDarts.name}
                                        className="rounded shadow-sm"
                                        style={{ maxHeight: "140px", objectFit: "cover" }}
                                    />
                                </div>
                            )}

                            <form onSubmit={HandleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Darts játékos neve</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        onChange={InputOnchange}
                                        value={GetDarts.name}
                                        required
                                    />
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-semibold">Születési dátum</label>
                                        <input
                                            type="date"
                                            name="birth_date"
                                            className="form-control"
                                            onChange={InputOnchange}
                                            value={GetDarts.birth_date}
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-semibold">Nyert világbajnokságok</label>
                                        <input
                                            type="number"
                                            name="world_ch_won"
                                            className="form-control"
                                            min="0"
                                            onChange={InputOnchange}
                                            value={GetDarts.world_ch_won}
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Profil URL</label>
                                    <input
                                        type="url"
                                        name="profile_url"
                                        className="form-control"
                                        onChange={InputOnchange}
                                        value={GetDarts.profile_url}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-semibold">Kép URL</label>
                                    <input
                                        type="text"
                                        name="image_url"
                                        className="form-control"
                                        onChange={InputOnchange}
                                        value={GetDarts.image_url}
                                    />
                                </div>

                                <div className="d-flex justify-content-end gap-2">
                                    <Link to="/" className="btn btn-secondary">
                                        Vissza
                                    </Link>
                                    <button type="submit" className="btn btn-success">
                                        Mentés
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};