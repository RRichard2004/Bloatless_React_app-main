import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/Main.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import valtozo from '../valtozo';


export default function SinglePage() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const path = new URL(window.location.href).pathname;

    useEffect(() => {
        setLoading(true);
        axios.get("https://nodejs.sulla.hu/data" + path)
          .then((response) => {
            setData(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error occurred:", error);
            setLoading(false);
          });
    }, []);
    const deleteButton = (e, id) => {
        e.preventDefault();
        axios.delete("https://nodejs.sulla.hu/data/" + id)
    }
    return (
      <div className="App">
        {loading ? (
          <p>Loading...</p>
        ):
        
        <div className="card" key={data.id}>
            <div className="card-header bg-primary text-white">
            <h5 className="card-title mb-0">{data.hostname}</h5>
            </div>
            <div className="card-body">
            <p className="card-title">
                <strong>City:</strong> {data.location}
            </p>
            <p className="card-title">
                <strong>Minimum Nights:</strong> {data.minimum_nights}
            </p>
            <p className="card-title">
                <strong>Price:</strong> {data.price}$
            </p>
            {valtozo.admin ?
            <div className="buttons">
                <Link to={`/edit/${data.id}`} className="btn btn-warning">
                    Edit
                </Link>

                <button
                onClick={(e) => {
                    deleteButton(e, data.id);
                }}
                className="btn btn-danger"
                >
                delete
                </button>
            </div>
            : null}
        </div>
    </div>
    }
            
      </div>
    );
}
