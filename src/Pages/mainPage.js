import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/Main.css';
import { Link } from 'react-router-dom';
import valtozo from '../valtozo';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function MainPage() {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("https://nodejs.sulla.hu/data")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("Error occurred:", error);
            });
    }, []);


    const handleDelete = (e, id) => {
        e.preventDefault();
        axios.delete(`https://nodejs.sulla.hu/data/${id}`);
        window.location.reload();
    };

    return (
        <div className="App">
            {data.map((item) => (
                <Link className="card" to={`/${item.id}`} key={item.id}>
                    <div className="card-header bg-primary text-white">
                        <h5 className="card-title mb-0">{item.hostname}</h5>
                    </div>
                    <div className="card-body">
                        <p className="card-title">
                            <strong>City:</strong> {item.location}
                        </p>
                        <p className="card-title">
                            <strong>Minimum Nights:</strong> {item.minimum_nights}
                        </p>
                        <p className="card-title">
                            <strong>Price:</strong> {item.price}$
                        </p>
                        {valtozo.admin ? 
                            <div className="buttons">
                            <Link to={`/edit/${item.id}`} className="btn btn-warning">
                            <FontAwesomeIcon icon={faPen} />
                            </Link>
                            <button
                                onClick={(e) => handleDelete(e, item.id)}
                                className="btn btn-danger"
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div> : null
                        }
                        
                    </div>
                </Link>
            ))}
        </div>
    );
}
