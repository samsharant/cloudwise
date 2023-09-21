import React, { useState, useRef, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { renderTableSkeleton } from "./tableSkeleton";
import { Button } from "@mui/material";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import { fontSize } from "@mui/system";
import LaunchIcon from "@mui/icons-material/Launch";
import StyleIcon from "@mui/icons-material/Style";
import Tooltip from "@mui/material/Tooltip";
import Popper from "@mui/material/Popper";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

function InventoryTable(props) {
  const { data } = props;
  const { filt } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const popperRef = useRef(null);
  // const [rowID, setrowID] = useState(null);
  const [tags, setTags] = useState(null);

  const handleClickOutside = (event) => {
    if (popperRef.current && !popperRef.current.contains(event.target)) {
      setAnchorEl(null);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const MatEdit = ({ index, cost }) => {
    const amount = formatNumberToK(cost);
    return (
      <Button
        size="small"
        color="warning"
        variant="text"
        startIcon={<AttachMoneyOutlinedIcon />}
        disableTouchRipple
        sx={{
          marginLeft: "-10px",
          "&:hover": {
            backgroundColor: "transparent", // to remove hover effect
          },
          "&:disabled": {
            color: "rgb(239,124,29)",
            pointerEvents: "none", // to disabel  click events
          },
        }}
        disabled>
        {amount}
      </Button>
    );
  };
  function formatNumberToK(amount) {
    if (!amount) return (0).toFixed(2);

    if (amount >= 1000) {
      return (amount / 1000).toFixed(2) + "k";
    } else {
      return amount.toFixed(2);
    }
  }
  const OpenPopper = ({ anchorEl, popperRef, rowID }) => {
    console.log(tags);
    console.log(rowID);
    return (
      tags && (
        <Popper
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          placement="top-start"
          ref={popperRef}>
          <Paper>
            <div style={{ padding: "8px" }}>
              <Typography
                variant="subtitle1"
                style={{ fontWeight: "bold", marginBottom: "8px" }}>
                Tags
              </Typography>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {tags.map((item, index) => (
                  <li key={index}>
                    <Typography variant="body2" style={{ margin: "4px 0" }}>
                      <span style={{ fontWeight: "bold" }}>{item.Key}:</span>{" "}
                      {item.Value}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>
          </Paper>
        </Popper>
      )
    );
  };

  function getColumns() {
    return [
      { field: "id", headerName: "ID", flex: 1, disableColumnMenu: true },
      {
        field: "service",
        headerName: "Service",
        flex: 2,
        disableColumnMenu: true,
      },
      { field: "name", headerName: "Name", flex: 4, disableColumnMenu: true },
      {
        field: "region",
        headerName: "Region",
        flex: 2,
        disableColumnMenu: true,
        renderCell: (params) => {
          return (
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ cursor: "pointer" }}>
              <div>
                {params.row.region.region_id}
                <div style={{ fontWeight: "800", fontSize: "10px" }}>
                  {" "}
                  {params.row.region.region_name}
                </div>
              </div>
            </div>
          );
        },
      },
      {
        field: "cost",
        headerName: "Cost",
        type: "number",
        flex: 1,
        disableColumnMenu: true,
        renderCell: (params) => {
          return (
            <div style={{ cursor: "pointer" }}>
              <MatEdit
                index={params.row.id}
                cost={params.row.cost < 0 ? 0.0 : parseFloat(params.row.cost)}
              />
            </div>
          );
        },
      },
      {
        field: "tags",
        headerName: "Tags",
        width: 120,
        disableColumnMenu: true,
        renderCell: (params) => {
          console.log(params);
          const rowID = params.row.id;
          const tagging = params.row.tags;
          const handleIconClick = (event) => {
            setAnchorEl(anchorEl ? null : event.currentTarget);
            // setrowID(rowID);
            // if (rowID == params.row.id) {
            setTags(params.row.tags);
            // }
          };

          return (
            <>
              {tagging && tagging.length > 0 && (
                <>
                  <div
                    className="d-flex justify-content-between align-items-center"
                    style={{ cursor: "pointer" }}
                    onClick={handleIconClick}>
                    <StyleIcon color="action" />
                  </div>
                  <OpenPopper
                    anchorEl={anchorEl}
                    popperRef={popperRef}
                    rowID={rowID}
                  />
                </>
              )}
            </>
          );
        },
      },
      {
        field: "link",
        headerName: "",
        width: 80,
        disableColumnMenu: true,
        renderCell: (params) => {
          return (
            <div
              className="d-flex justify-content-center align-items-center" // Center horizontally and vertically
              style={{ cursor: "pointer" }}>
              <Tooltip title="Go to console">
                <LaunchIcon
                  style={{ cursor: "pointer" }}
                  color="action"
                  onClick={() => {
                    window.open(
                      params.row.information?.cloud_resource_link,
                      "_blank",
                    );
                  }}
                />
              </Tooltip>
            </div>
          );
        },
      },
    ];
  }

  function getRows() {
    const rows = [];
    data.forEach((rowData, idx) => {
      const updatedRowData = {};
      updatedRowData.id = idx + 1;
      updatedRowData.name = rowData.name;
      updatedRowData.cost = rowData.cost;
      updatedRowData.region = rowData.region;
      updatedRowData.service = rowData.service;
      updatedRowData.tags = rowData.tags;
      updatedRowData.information = rowData.information;
      rows.push(updatedRowData);
    });
    return rows;
  }

  function renderInventoryData() {
    return data?.length ? (
      <>
        <DataGrid
          rows={getRows()}
          columns={getColumns()}
          initialState={{
            ...data.initialState,
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          disableColumnFilter // to disable filter icon
          sx={{
            fontSize: "15px",
            backgroundColor: "white",
            marginTop: "20px",
            borderRadius: "10px",
            ".MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold !important",
            },
            "& .MuiDataGrid-sortIcon": {
              display: "none", // To hide the sort arrows
            },
          }}
          filterModel={filt}
        />
      </>
    ) : (
      renderTableSkeleton()
    );
  }

  return renderInventoryData();
}

export default InventoryTable;
