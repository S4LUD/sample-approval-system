import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ContextAPI from "./ContextAPI";
import Header from "./Header";

const ApproveData = () => {
  const { ToApprove } = useContext(ContextAPI);
  const [isConsignee, setConsignee] = useState("");
  const [isTruckNo, setTruckNo] = useState("");
  const [isIncvoiceNo, setInvoiceNo] = useState("");
  const [isCUR, setCUR] = useState("");
  const [isOAOE, setOAOE] = useState("");
  const [isNF, setNF] = useState("");
  const [isAO, setAO] = useState("");
  const [isESS, setESS] = useState("");
  const [isHC, setHC] = useState("");

  const [isData, setData] = useState([
    {
      id: uuidv4(),
      customer: "",
      partno: "",
      model: "",
      qty: 0,
      unit: 0,
    },
  ]);

  const tempData = {
    id: uuidv4(),
    consignee: isConsignee,
    truckno: isTruckNo,
    invoiceno: isIncvoiceNo,
    approve: false,
    option: {
      cur: isCUR,
      oaoe: isOAOE,
      nf: isNF,
      ao: isAO,
      ess: isESS,
      hc: isHC,
    },
    data: isData,
  };

  const handleChangeInput = (id, event) => {
    const newInputFields = isData.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });
    setData(newInputFields);
  };

  const handleAddFields = () => {
    setData([
      ...isData,
      {
        id: uuidv4(),
        customer: "",
        partno: "",
        model: "",
        qty: 0,
        unit: 0,
      },
    ]);
  };

  const handleRemoveFields = (id) => {
    if (isData.length === 1) return;
    const data = [...isData];
    data.splice(
      data.findIndex((value) => value.id === id),
      1
    );
    setData(data);
  };

  const qty = isData.reduce((accumulator, object) => {
    return (accumulator += parseInt(object.qty));
  }, 0);

  const amount = isData.reduce((accumulator, object) => {
    return (accumulator += parseInt(object.qty) * parseInt(object.unit));
  }, 0);

  const getCHK = (event) => {
    setCUR("");
    if (event.target.checked) return setCUR(event.target.value);
  };

  const getOAOE = (event) => {
    setOAOE("");
    if (event.target.checked) return setOAOE(event.target.value);
  };

  const getNF = (event) => {
    setNF("");
    if (event.target.checked) return setNF(event.target.value);
  };

  const getAO = (event) => {
    setAO("");
    if (event.target.checked) return setAO(event.target.value);
  };

  const getESS = (event) => {
    setESS("");
    if (event.target.checked) return setESS(event.target.value);
  };

  const getHC = (event) => {
    setHC("");
    if (event.target.checked) return setHC(event.target.value);
  };

  const submit = () => {
    ToApprove(tempData);
    setConsignee("");
    setTruckNo("");
    setInvoiceNo("");
    setCUR("");
    setOAOE("");
    setNF("");
    setAO("");
    setESS("");
    setHC("");
    setData([
      {
        id: uuidv4(),
        customer: "",
        partno: "",
        model: "",
        qty: 0,
        unit: 0,
      },
    ]);
  };

  return (
    <>
      <Header />
      <div className="center-this-shit">
        <div className="App">
          <div className="container-1">
            <div className="h1-title">AUTHORITY TO EXPORT FORM</div>
            <div className="wrapper-1">
              <div className="wrap-data-1">
                <span>CONSIGNEE</span>
                <input
                  type="text"
                  value={isConsignee}
                  onChange={(data) => setConsignee(data.target.value)}
                />
              </div>
              <div className="wrap-data-1">
                <span>TRUCK NO.</span>
                <input
                  type="text"
                  value={isTruckNo}
                  onChange={(data) => setTruckNo(data.target.value)}
                />
              </div>
              <div className="wrap-data-1">
                <span>INVOICE NO.</span>
                <input
                  type="text"
                  value={isIncvoiceNo}
                  onChange={(data) => setInvoiceNo(data.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="container-2">
            <div className="h2-title">DETAILS</div>
            <button onClick={() => handleAddFields()}>Add Customer</button>
            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Part Number</th>
                  <th>Model/Description</th>
                  <th>Qty</th>
                  <th>Unit Price</th>
                  <th>Total Amount</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {isData.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <input
                          name="customer"
                          id="customer"
                          type="text"
                          autoComplete="off"
                          value={data.customer}
                          onChange={(event) =>
                            handleChangeInput(data.id, event)
                          }
                        />
                      </td>
                      <td>
                        <input
                          name="partno"
                          type="text"
                          autoComplete="off"
                          value={data.partno}
                          onChange={(event) =>
                            handleChangeInput(data.id, event)
                          }
                        />
                      </td>
                      <td>
                        <input
                          name="model"
                          type="text"
                          autoComplete="off"
                          value={data.model}
                          onChange={(event) =>
                            handleChangeInput(data.id, event)
                          }
                        />
                      </td>
                      <td>
                        <input
                          name="qty"
                          type="number"
                          value={data.qty}
                          onChange={(event) =>
                            handleChangeInput(data.id, event)
                          }
                        />
                      </td>
                      <td>
                        <input
                          name="unit"
                          type="number"
                          value={data.unit}
                          onChange={(event) =>
                            handleChangeInput(data.id, event)
                          }
                        />
                      </td>
                      <td>
                        <div className="amount">
                          <div className="php">PHP:</div>
                          <div className="phprice">{data.qty * data.unit}</div>
                        </div>
                      </td>
                      <td>
                        {isData.length !== 1 ? (
                          <button onClick={() => handleRemoveFields(data.id)}>
                            Remove
                          </button>
                        ) : undefined}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="output">
              <span>Total Quantity:</span>
              <div className="result">{qty}</div>
              <span>PHP</span>
              <div className="result">{amount}</div>
            </div>
          </div>
          <div className="outer-details">
            <div className="wrap-od">
              <div className="od-title">FREIGHT DETAILS REASON</div>
              <div className="chck-container">
                <div className="wrap-chckbx">
                  <input
                    type="checkbox"
                    value="Custom Urgent Request"
                    onChange={(event) => getCHK(event)}
                  />
                  <span>Custom Urgent Request</span>
                </div>
                <div className="wrap-chckbx">
                  <input
                    type="checkbox"
                    value="Original Air Order Entry"
                    onChange={(event) => getOAOE(event)}
                  />
                  <span>Original Air Order Entry</span>
                </div>
                <div className="wrap-chckbx">
                  <input
                    type="checkbox"
                    value="Additional Order"
                    onChange={(event) => getAO(event)}
                  />
                  <span>Additional Order</span>
                </div>
              </div>
            </div>
            <div className="wrap-od">
              <div className="od-title">FREIGHT DETAILS MODE</div>
              <div className="chck-container">
                <div className="wrap-chckbx">
                  <input
                    type="checkbox"
                    value="Normal Flight"
                    onChange={(event) => getNF(event)}
                  />
                  <span>Normal Flight</span>
                </div>
                <div className="wrap-chckbx">
                  <input
                    type="checkbox"
                    value="Express Service SwiftRider"
                    onChange={(event) => getESS(event)}
                  />
                  <span>Express Service SwiftRider</span>
                </div>
                <div className="wrap-chckbx">
                  <input
                    type="checkbox"
                    value="Hand Carry"
                    onChange={(event) => getHC(event)}
                  />
                  <span>Hand Carry</span>
                </div>
              </div>
            </div>
          </div>
          <div className="submit">
            <button onClick={() => submit()}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApproveData;
