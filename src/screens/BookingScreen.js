import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import Error from "../components/Error";
import moment from "moment";

function Bookingscreen() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [room, setRoom] = useState();

    let { id, fromdate, todate } = useParams();
    const totalDays =
        moment(todate, "DD-MM-YYYY").diff(
            moment(fromdate, "DD-MM-YYYY"),
            "days"
        ) + 1;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = (
                    await axios.post("/api/rooms/getroombyid", { roomid: id })
                ).data;

                setRoom(data);
                setLoading(false);
            } catch (error) {
                setError(true);
                console.log(error);
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    async function bookRoom() {
        const bookingDetails = {
            room,
            roomid: room._id,
            fromdate,
            todate,
            totalamount: totalDays * room.rentperday,
            totaldays: totalDays,
        };
        try {
            const result = await axios.post(
                "/api/bookings/bookroom",
                bookingDetails
            ).data;
            alert(result.data);
        } catch (error) {
            console.log(error);
            alert("Failed to book room. Please try again later.");
        }
    }

    return (
        <div className="m-5">
            {loading ? (
                <Loading />
            ) : error ? (
                <Error />
            ) : (
                <div>
                    {room && (
                        <div className="row justify-content-center mt-5 box">
                            <div className="col-md-6">
                                <h1>{room.name}</h1>
                                <img
                                    src={room.imageurls[0]}
                                    className="bigimg"
                                />
                            </div>
                            <div className="col-md-6">
                                <div style={{ textAlign: "right" }}>
                                    <h1>Booking Details</h1>
                                    <hr />
                                    <b>
                                        <p>Name:</p>
                                        <p>From Date: {fromdate}</p>
                                        <p>To Date: {todate}</p>
                                        <p>Max count: {room.maxcount}</p>
                                    </b>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                    <h1>Amount</h1>
                                    <hr />
                                    <p>Total Days:{totalDays}</p>
                                    <p>Rent per Day: {room.rentperday}</p>
                                    <h1>
                                        Total Amount:
                                        {totalDays * room.rentperday}
                                    </h1>
                                </div>
                                <div style={{ float: "right" }}>
                                    <button
                                        className="btn btn-primary"
                                        onClick={bookRoom}
                                    >
                                        Pay Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Bookingscreen;
