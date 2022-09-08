import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ContextAPI from "./ContextAPI";

const Details = () => {
  let navigate = useNavigate();
  const params = useParams();
  const { isToApprove, setToApprove } = useContext(ContextAPI);
  const [isData, setData] = useState([]);

  useEffect(() => {
    isToApprove.filter((data) => {
      return data.id === params.id ? setData([...isData, data]) : undefined;
    });
  }, [isToApprove, params]);

  const calcuQTY = isData.map((data) => {
    return data.data;
  });

  const qtyAmount = calcuQTY.map((data) => {
    return data.reduce((accumulator, object) => {
      return (accumulator += parseInt(object.qty));
    }, 0);
  });

  const calcuAmount = isData.map((data) => {
    return data.data;
  });

  const totalAmount = calcuAmount.map((data) => {
    return data.reduce((accumulator, object) => {
      return (accumulator += parseInt(object.qty) * parseInt(object.unit));
    }, 0);
  });

  const updateApprove = () => {
    const tempData = isToApprove.map((obj) =>
      obj.id === params.id ? { ...obj, approve: true } : obj
    );
    setToApprove(tempData);
    navigate("../approve", { replace: true });
  };

  return (
    <div className="details-con">
      <div className="wrap-btn">
        <Link to="/approve">
          <div className="btn back">Back</div>
        </Link>
        {isData.map((data, index) => {
          return !data.approve ? (
            <div
              key={index}
              className="btn approve"
              onClick={() => updateApprove()}
            >
              Approve
            </div>
          ) : undefined;
        })}
      </div>
      <div className="data-wrapper">
        {isData.map((data, index) => {
          return (
            <div className="con1" key={index}>
              <div className="title">
                <span>Consignee</span>
                <input type="text" disabled value={data.consignee} />
              </div>
              <div className="title">
                <span>Truck No.</span>
                <input type="text" disabled value={data.truckno} />
              </div>
              <div className="title">
                <span>Invoice No.</span>
                <input type="text" disabled value={data.invoiceno} />
              </div>
            </div>
          );
        })}
        <div className="con2">
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Part No.</th>
                <th>Model / Description</th>
                <th>QTY</th>
                <th>Unit Price</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {isData.map((data) => {
                return data.data.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{data.customer}</td>
                      <td>{data.partno}</td>
                      <td>{data.model}</td>
                      <td>{data.qty}</td>
                      <td>{data.unit}</td>
                      <td>{data.qty * data.unit}</td>
                    </tr>
                  );
                });
              })}
            </tbody>
          </table>
        </div>
        <div className="con3">
          <div className="output">
            <span>Total Quantity:</span>
            <div className="result">{qtyAmount}</div>
            <span>PHP</span>
            <div className="result">{totalAmount}</div>
          </div>
        </div>
        <div className="con4">
          <div className="outer-details">
            <div className="wrap-od">
              <div className="od-title">FREIGHT DETAILS REASON</div>
              {isData.map((data, index) => {
                return (
                  <div key={index} className="chck-container">
                    <div className="wrap-chckbx">
                      <input
                        type="checkbox"
                        disabled
                        checked={data.option.cur !== "" ? true : false}
                      />
                      <span>Custom Urgent Request</span>
                    </div>
                    <div className="wrap-chckbx">
                      <input
                        type="checkbox"
                        disabled
                        checked={data.option.oaoe !== "" ? true : false}
                      />
                      <span>Original Air Order Entry</span>
                    </div>
                    <div className="wrap-chckbx">
                      <input
                        type="checkbox"
                        disabled
                        checked={data.option.ao !== "" ? true : false}
                      />
                      <span>Additional Order</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="wrap-od">
              <div className="od-title">FREIGHT DETAILS MODE</div>
              {isData.map((data, index) => {
                return (
                  <div key={index} className="chck-container">
                    <div className="wrap-chckbx">
                      <input
                        type="checkbox"
                        disabled
                        checked={data.option.nf !== "" ? true : false}
                      />
                      <span>Normal Flight</span>
                    </div>
                    <div className="wrap-chckbx">
                      <input
                        type="checkbox"
                        disabled
                        checked={data.option.ess !== "" ? true : false}
                      />
                      <span>Express Service SwiftRider</span>
                    </div>
                    <div className="wrap-chckbx">
                      <input
                        type="checkbox"
                        disabled
                        checked={data.option.hc !== "" ? true : false}
                      />
                      <span>Hand Carry</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
