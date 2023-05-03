import React, { useEffect, useState } from "react";
import axios from "axios";
import Rooms from "../components/Rooms";
import Loading from "../components/Loading";
import Error from "../components/Error";
import moment from "moment";
import "antd/dist/reset.css";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

const Homesceen = () => {
    const [data, setData] = useState([]);
    const [loading, setloading] = useState();
    const [error, seterror] = useState();
    const [fromdate, setfromdate] = useState();
    const [todate, settodate] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setloading(true);
                const { data: response } = await axios.get(
                    "/api/rooms/getallrooms"
                );
                setData(response);
                setloading(false);
            } catch (error) {
                seterror(true);
                console.log(error);
                setloading(false);
            }
        };

        fetchData();
    }, []);

    function filterByDate(dates) {
        setfromdate(dates[0].format("DD-MM-YYYY"));
        settodate(dates[1].format("DD-MM-YYYY"));
    }

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-md-3">
                    <RangePicker
                        format={"DD-MM-YYYY"}
                        onChange={filterByDate}
                    />
                </div>
            </div>

            <div className="row justify-content-center ml-5 ">
                {loading ? (
                    <Loading />
                ) : error ? (
                    <Error />
                ) : (
                    data.map((room) => {
                        return (
                            <div className="col-md-9 mt-2">
                                <Rooms room={room} fromdate={fromdate} todate={todate} />
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Homesceen;
