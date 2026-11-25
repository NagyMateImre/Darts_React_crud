import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

export const DartsDeletePage = () => {
    const params = useParams();
    const id = params.DartsId;
    const navigate = useNavigate();
    const [GetDarts, SetDarts] = useState({});
    const [isPendig, SetPending] = useState(false);
    const [showModal, SetModal] = useState(false);

    useEffect(() => {
        SetPending(true);
        (async () => {
            try {
                const res = await axios.get(`https://darts.sulla.hu/darts/${id}`);
                SetDarts(res.data);
            } catch (error) {
                console.error("Hiba: ", error);
            } finally {
                SetPending(false);
            }
        })();
    }, [id]);

    const handleDelete = (event) => {
        event.preventDefault();
        axios.delete(`https://darts.sulla.hu/darts/${id}`)
            .then(() => SetModal(true))
            .catch(error => console.error("Hiba: ", error));
    };

    return (
        <div className="container py-5">
            {/* Egyszerű Modal */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header bg-success text-white">
                                <h5 className="modal-title">Sikeres törlés!</h5>
                            </div>
                            <div className="modal-body">
                                A Darts játékos adatait sikeresen töröltük!
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

            {isPendig || !GetDarts.id ? (
                <div className="text-center my-5">
                    <div className="spinner-border text-danger" role="status"></div>
                </div>
            ) : (
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="card shadow-sm border-danger text-center">
                            <div className="card-header bg-danger text-white fw-bold">
                                Biztosan törlöd ezt a játékost?
                            </div>
                            <div className="card-body">
                                <img
                                    src={GetDarts.image_url || "https://placehold.co/300x300"}
                                    alt={GetDarts.name}
                                    className="img-fluid rounded mb-3"
                                    style={{ maxHeight: "200px", objectFit: "cover" }}
                                />
                                <h4 className="card-title mb-3">{GetDarts.name}</h4>
                                <p className="mb-1 text-muted">
                                    <strong>Születési éve:</strong> {GetDarts.birth_date}
                                </p>
                                <p className="mb-3 text-muted">
                                    <strong>Világbajnokságok:</strong> {GetDarts.world_ch_won} db
                                </p>
                                {GetDarts.profile_url && (
                                    <div className="mb-4">
                                        <a href={GetDarts.profile_url} target="_blank" rel="noreferrer" className="link-primary text-decoration-none text-danger">
                                            Profil megtekintése
                                        </a>
                                    </div>
                                )}
                                <form onSubmit={handleDelete} className="d-flex justify-content-center gap-2">
                                    <Link to="/" className="btn btn-secondary">
                                        Mégse
                                    </Link>
                                    <button type="submit" className="btn btn-danger">
                                        Törlés
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};