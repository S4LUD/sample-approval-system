import React, { useContext } from "react";
import Header from "./Header";
import ContextAPI from "./ContextAPI";
import { Link } from "react-router-dom";

const Approval = () => {
  const { isToApprove } = useContext(ContextAPI);
  return (
    <>
      <Header />
      <div className="approve-container">
        <div className="approve">
          <div className="title">Not Approve</div>
          <table>
            <thead>
              <tr>
                <th>Consignee</th>
                <th>Truck No.</th>
                <th>Invoice No.</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {isToApprove.map((data, index) => {
                return data.approve === false ? (
                  <tr key={index}>
                    <td>{data.consignee}</td>
                    <td>{data.truckno}</td>
                    <td>{data.invoiceno}</td>
                    <td>
                      <Link to={`/details/${data.id}`}>
                        <div className="view">View</div>
                      </Link>
                    </td>
                  </tr>
                ) : undefined;
              })}
            </tbody>
          </table>
        </div>
        <div className="approve">
          <div className="title">Approve</div>
          <table>
            <thead>
              <tr>
                <th>Consignee</th>
                <th>Truck No.</th>
                <th>Invoice No.</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {isToApprove.map((data, index) => {
                return data.approve === true ? (
                  <tr key={index}>
                    <td>{data.consignee}</td>
                    <td>{data.truckno}</td>
                    <td>{data.invoiceno}</td>
                    <td>
                      <Link to={`/details/${data.id}`}>
                        <div className="view">View</div>
                      </Link>
                    </td>
                  </tr>
                ) : undefined;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Approval;
