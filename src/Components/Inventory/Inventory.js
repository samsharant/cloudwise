import React, { useEffect, useState } from "react";
import "./Inventory.css";
import InventoryTable from "./InventoryTable";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  Button,
} from "@mui/material";
import { baseUrl, currency, inventoryTypes, tabTypes } from "../../constants";
import NavigationTab from "../NavigationTab/NavigationTab";
import FilterButton from "../Button/FilterBtn";
import axios from "axios";
import { toast } from "react-toastify";
import CardsContainer from "../CardsContainer/CardsContainer";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import HorizontalSplitOutlinedIcon from "@mui/icons-material/HorizontalSplitOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import PublicIcon from "@mui/icons-material/Public";

function Inventory() {
  const [activeInventoryTab, setActiveInventoryTab] = useState(
    inventoryTypes.S3,
  );
  const [filt, setFilt] = useState({
    items: [{}],
  });
  const [tableData, setTableData] = useState([]);
  const [showFilterBtn, setShowFilterBtn] = useState(false);

  const handleChange = (event) => {
    setActiveInventoryTab(event.target.value);
  };

  function isLocalStorageDataValid() {
    const validExistingData = !!localStorage.getItem("inventoryTableData");
    const currentTime = new Date().getTime();
    const prevTimestamp = localStorage.getItem("inventoryTimestamp");
    //is invalid, if the prev timestamp exceeds one hour || empty array
    if (
      !prevTimestamp ||
      currentTime - prevTimestamp > 3600000 ||
      !validExistingData
    ) {
      return false;
    } else return true;
  }

  //   const axiosClientToFetchTableData = (endpoint) => {
  //     return axios
  //       .get(baseUrl + endpoint)
  //       .then((response) => {
  //         const tableDataResponse = response.data.data;

  //         //update table state
  //         setTableData((data) => [...data, ...tableDataResponse]);

  //         //update localStorage data
  //         const existingData = JSON.parse(
  //           localStorage.getItem("inventoryTableData"),
  //         );
  //         const stringifiedData = JSON.stringify([
  //           ...existingData,
  //           ...tableDataResponse,
  //         ]);
  //         localStorage.setItem("inventoryTableData", stringifiedData);
  //       })
  //       .catch((error) => {
  //         if (error.message.includes("Network Error")) {
  //           toast.error(`Please try again after some time`);
  //         } else {
  //           toast.error(`API Error: ${error.message}`);
  //         }
  //       });
  //   };

  const fetchTableData = async () => {
    // localStorage.setItem("inventoryTableData", "[]");

    // axiosClientToFetchTableData("/s3/all");
    // axiosClientToFetchTableData("/lb/all");
    // axiosClientToFetchTableData("/ec2/all");
    const tableDataJson = [
      {
        cloud: "AWS",
        service: "S3",
        name: "american-heritage",
        region: {
          region_id: "us-east-1",
          region_name: "US East (N. Virginia)",
        },
        cost: "0.02",
        account: "Valuebound",
        tags: [
          {
            Key: "Environment",
            Value: "Production",
          },
          {
            Key: "Name",
            Value: "Krypton",
          },
          {
            Key: "Project",
            Value: "Krypton",
          },
          {
            Key: "Product",
            Value: "Krypton",
          },
        ],
        information: {
          cloud_resource_link:
            "https://s3.console.aws.amazon.com/s3/buckets/american-heritage?region=us-east-1&tab=objects",
        },
      },
      {
        cloud: "AWS",
        service: "S3",
        name: "amqp-microservice-prod-serverlessdeploymentbucket-1tm048jhywrrb",
        region: {
          region_id: "us-east-1",
          region_name: "US East (N. Virginia)",
        },
        cost: "0.00",
        account: "Valuebound",
        tags: [
          {
            Key: "Environment",
            Value: "Production",
          },
          {
            Key: "Name",
            Value: "Krypton",
          },
          {
            Key: "Project",
            Value: "Krypton",
          },
          {
            Key: "Product",
            Value: "Krypton",
          },
        ],
        information: {
          cloud_resource_link:
            "https://s3.console.aws.amazon.com/s3/buckets/amqp-microservice-prod-serverlessdeploymentbucket-1tm048jhywrrb?region=us-east-1&tab=objects",
        },
      },
      {
        cloud: "AWS",
        service: "S3",
        name: "aws-cloudtrail-logs-713496944077-14c7961e",
        region: {
          region_id: "us-east-1",
          region_name: "US East (N. Virginia)",
        },
        cost: "0.00",
        account: "Valuebound",
        tags: [
          {
            Key: "Environment",
            Value: "Production",
          },
          {
            Key: "Name",
            Value: "Krypton",
          },
          {
            Key: "Project",
            Value: "Krypton",
          },
          {
            Key: "Product",
            Value: "Krypton",
          },
        ],
        information: {
          cloud_resource_link:
            "https://s3.console.aws.amazon.com/s3/buckets/aws-cloudtrail-logs-713496944077-14c7961e?region=us-east-1&tab=objects",
        },
      },
      {
        cloud: "AWS",
        service: "LB",
        name: "one-place-alb",
        region: {
          region_id: "ap-south-1",
          region_name: "Asia Pacific (Mumbai)",
        },
        cost: 10.9,
        account: "Valuebound",
        tags: [
          {
            Key: "Environment",
            Value: "Production",
          },
          {
            Key: "Name",
            Value: "Krypton",
          },
          {
            Key: "Project",
            Value: "Krypton",
          },
          {
            Key: "Product",
            Value: "Krypton",
          },
        ],
        information: {
          cloud_resource_link:
            "https://ap-south-1.console.aws.amazon.com/ec2/home?region=ap-south-1#LoadBalancer:loadBalancerArn=arn:aws:elasticloadbalancing:ap-south-1:713496944077:loadbalancer/app/one-place-alb/61f363d779829996;tab=listeners",
        },
      },
      {
        cloud: "AWS",
        service: "LB",
        name: "chatgpt-search-load-balancer",
        region: {
          region_id: "ap-south-1",
          region_name: "Asia Pacific (Mumbai)",
        },
        cost: 10.9,
        account: "Valuebound",
        tags: [
          {
            Key: "Environment",
            Value: "Production",
          },
          {
            Key: "Name",
            Value: "Krypton",
          },
          {
            Key: "Project",
            Value: "Krypton",
          },
          {
            Key: "Product",
            Value: "Krypton",
          },
        ],
        information: {
          cloud_resource_link:
            "https://ap-south-1.console.aws.amazon.com/ec2/home?region=ap-south-1#LoadBalancer:loadBalancerArn=arn:aws:elasticloadbalancing:ap-south-1:713496944077:loadbalancer/app/chatgpt-search-load-balancer/f0ba3ba82dd806cd;tab=listeners",
        },
      },
      {
        cloud: "AWS",
        service: "LB",
        name: "Cloud",
        region: {
          region_id: "ap-south-1",
          region_name: "Asia Pacific (Mumbai)",
        },
        cost: 10.9,
        account: "Valuebound",
        tags: [
          {
            Key: "Environment",
            Value: "Production",
          },
          {
            Key: "Name",
            Value: "Krypton",
          },
          {
            Key: "Project",
            Value: "Krypton",
          },
          {
            Key: "Product",
            Value: "Krypton",
          },
        ],
        information: {
          cloud_resource_link:
            "https://ap-south-1.console.aws.amazon.com/ec2/home?region=ap-south-1#LoadBalancer:loadBalancerArn=arn:aws:elasticloadbalancing:ap-south-1:713496944077:loadbalancer/app/Cloud/d60a41e085f9b403;tab=listeners",
        },
      },
      {
        cloud: "AWS",
        service: "LB",
        name: "VB-Application-LB",
        region: {
          region_id: "ap-south-1",
          region_name: "Asia Pacific (Mumbai)",
        },
        cost: 10.9,
        account: "Valuebound",
        tags: [
          {
            Key: "Environment",
            Value: "Production",
          },
          {
            Key: "Name",
            Value: "Krypton",
          },
          {
            Key: "Project",
            Value: "Krypton",
          },
          {
            Key: "Product",
            Value: "Krypton",
          },
        ],
        information: {
          cloud_resource_link:
            "https://ap-south-1.console.aws.amazon.com/ec2/home?region=ap-south-1#LoadBalancer:loadBalancerArn=arn:aws:elasticloadbalancing:ap-south-1:713496944077:loadbalancer/app/VB-Application-LB/04d435b10461a538;tab=listeners",
        },
      },
      {
        cloud: "AWS",
        service: "LB",
        name: "oneplace-qa-alb",
        region: {
          region_id: "us-east-1",
          region_name: "US East (N. Virginia)",
        },
        cost: 10.26,
        account: "Valuebound",
        tags: [
          {
            Key: "Environment",
            Value: "Production",
          },
          {
            Key: "Name",
            Value: "Krypton",
          },
          {
            Key: "Project",
            Value: "Krypton",
          },
          {
            Key: "Product",
            Value: "Krypton",
          },
        ],
        information: {
          cloud_resource_link:
            "https://us-east-1.console.aws.amazon.com/ec2/home?region=us-east-1#LoadBalancer:loadBalancerArn=arn:aws:elasticloadbalancing:us-east-1:713496944077:loadbalancer/app/oneplace-qa-alb/01f8695d117c8500;tab=listeners",
        },
      },
      {
        cloud: "AWS",
        service: "EC2",
        name: "Oneplace-DB-PROD",
        region: {
          region_id: "ap-south-1",
          region_name: "Asia Pacific (Mumbai)",
        },
        cost: 2.83,
        account: "Valuebound",
        tags: [
          {
            Key: "Project",
            Value: "Oneplace",
          },
          {
            Key: "Product",
            Value: "Oneplace",
          },
          {
            Key: "Environment",
            Value: "Production",
          },
          {
            Key: "Name",
            Value: "Oneplace-DB-PROD",
          },
        ],
        information: {
          cloud_resource_link:
            "https://ap-south-1.console.aws.amazon.com/ec2/v2/home?region=ap-south-1#InstanceDetails:instanceId=i-0fc5b9f76c209bfe0",
        },
      },
      {
        cloud: "AWS",
        service: "EC2",
        name: "AuditDrupal1",
        region: {
          region_id: "ap-south-1",
          region_name: "Asia Pacific (Mumbai)",
        },
        cost: 2.83,
        account: "Valuebound",
        tags: [
          {
            Key: "Product",
            Value: "AuditDrupal",
          },
          {
            Key: "Name",
            Value: "AuditDrupal1",
          },
          {
            Key: "Environment",
            Value: "Production",
          },
          {
            Key: "Project",
            Value: "AuditDrupal",
          },
        ],
        information: {
          cloud_resource_link:
            "https://ap-south-1.console.aws.amazon.com/ec2/v2/home?region=ap-south-1#InstanceDetails:instanceId=i-0de8c6480996e6556",
        },
      },
      {
        cloud: "AWS",
        service: "EC2",
        name: "Learning tool",
        region: {
          region_id: "ap-south-1",
          region_name: "Asia Pacific (Mumbai)",
        },
        cost: 11.31,
        account: "Valuebound",
        tags: [
          {
            Key: "Product",
            Value: "Learning Tool",
          },
          {
            Key: "Project",
            Value: "Learning Tool",
          },
          {
            Key: "Environment",
            Value: "VB-IT-Operations",
          },
          {
            Key: "Name",
            Value: "Learning tool",
          },
        ],
        information: {
          cloud_resource_link:
            "https://ap-south-1.console.aws.amazon.com/ec2/v2/home?region=ap-south-1#InstanceDetails:instanceId=i-08875a8611aa26775",
        },
      },
      {
        cloud: "AWS",
        service: "EC2",
        name: "Krypton",
        region: {
          region_id: "ap-south-1",
          region_name: "Asia Pacific (Mumbai)",
        },
        cost: 11.31,
        account: "Valuebound",
        tags: [
          {
            Key: "Environment",
            Value: "Production",
          },
          {
            Key: "Name",
            Value: "Krypton",
          },
          {
            Key: "Project",
            Value: "Krypton",
          },
          {
            Key: "Product",
            Value: "Krypton",
          },
        ],
        information: {
          cloud_resource_link:
            "https://ap-south-1.console.aws.amazon.com/ec2/v2/home?region=ap-south-1#InstanceDetails:instanceId=i-013b164bbfeee5ba0",
        },
      },
    ];
    setTableData(tableDataJson);
    const stringifiedData = JSON.stringify(tableDataJson);
    localStorage.setItem("inventoryTableData", stringifiedData);

    // set new timestamp
    const currentTime = new Date().getTime();
    localStorage.setItem("inventoryTimestamp", currentTime);
  };

  useEffect(() => {
    //if local storage has valid data, setTableData(existing localstorage data)
    if (isLocalStorageDataValid()) {
      setTableData(JSON.parse(localStorage.getItem("inventoryTableData")));
    } else {
      fetchTableData();
    }
  }, []);

  const getRegionsCount = () => {
    let uniqueRegions = new Set();
    for (const rowData of tableData) {
      const regionId = rowData.region.region_id;
      if (uniqueRegions.has(regionId)) continue;
      else uniqueRegions.add(regionId);
    }
    return uniqueRegions.size;
  };

  const getTotalCost = () => {
    let totalCost = tableData?.reduce(
      (acc, cur) => acc + parseFloat(cur.cost),
      0,
    );
    return totalCost.toFixed(2);
  };

  const getCardsData = () => {
    const cardsData = [
      {
        title: "No of resources",
        icon: <HorizontalSplitOutlinedIcon fontSize="large" />,
        dataDivElement: (
          <>
            <p>{tableData.length}</p>
            <p>Resources</p>
          </>
        ),
      },
      {
        title: "No of regions",
        icon: <PublicIcon fontSize="large" />,
        dataDivElement: (
          <>
            <p>{getRegionsCount()}</p>
            <p>Regions</p>
          </>
        ),
      },
      {
        title: "Total cost",
        icon: <AccountBalanceWalletOutlinedIcon fontSize="large" />,
        dataDivElement: (
          <>
            <p>{currency + getTotalCost()}</p>
            <p>Bill</p>
          </>
        ),
      },
    ];

    return cardsData;
  };

  return (
    <div className="page-wrapper">
      <NavigationTab activeTab={tabTypes.INVENTORY} />
      <div className="inventory-wrapper">
        <div className="inventory-main-container">
          <div className="content-wrapper">
            <CardsContainer cards={getCardsData()} />
            <div className="data-grid-header">
              <div style={{ display: "flex", alignItems: "center" }}>
                <FilterButton
                  setShowFilterBtn={setShowFilterBtn}
                  setFilt={setFilt}
                />
                {showFilterBtn && (
                  <Button
                    size="small"
                    variant="contained"
                    endIcon={<ClearIcon />}
                    style={{ marginLeft: "20px" }}
                    onClick={() => {
                      setFilt({
                        items: [],
                      });
                      setShowFilterBtn(false);
                    }}>
                    Clear Filter
                  </Button>
                )}
              </div>

              {false && (
                <div className="nav-items-dropdown">
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small-label">
                      Inventory Type
                    </InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={activeInventoryTab}
                      label="Inventory Type"
                      onChange={handleChange}>
                      <MenuItem value={inventoryTypes.S3}>S3</MenuItem>
                      <MenuItem value={inventoryTypes.LB}>
                        Load Balancer
                      </MenuItem>
                      <MenuItem value={inventoryTypes.EC2}>EC2</MenuItem>
                      <Tooltip title="Upcoming feature">
                        <span>
                          <MenuItem disabled value={inventoryTypes.RDS}>
                            RDS
                          </MenuItem>
                        </span>
                      </Tooltip>
                    </Select>
                  </FormControl>
                </div>
              )}
              {false && <div>Download CSV</div>}
            </div>
            <div className="table-container">
              {<InventoryTable filt={filt} data={tableData} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
