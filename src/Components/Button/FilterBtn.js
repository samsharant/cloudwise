import React, { useState } from "react";
import FilterIcon from "@mui/icons-material/FilterList";
import {
  Button,
  Popover,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import AbcIcon from "@mui/icons-material/Abc";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CloudIcon from "@mui/icons-material/Cloud";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function FilterDropdown({ setFilt, setShowFilterBtn }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [filterValue, setFilterValue] = useState("");
  const [maxFilterValue, setMaxFilterValue] = useState("");
  const [minFilterValue, setMinFilterValue] = useState("");
  const [selectedMainOption, setselectedMainOption] = useState(null);
  const [error, setError] = useState(false);

  const subOptionsWithFilter = [
    "is",
    "isnot",
    "contains",
    "doesnot",
    "isempty",
    "isnotempty",
    "equal",
    "between",
    "greater",
    "less",
  ];

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
    setSelectedOption(null);
    setFilterValue("");
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (["name", "cost", "cloud"].includes(option)) {
      setselectedMainOption(option);
    }
    setFilterValue("");
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedOption(null);
    setFilterValue("");
  };

  const handleApplyFilter = () => {
    if (filterValue.trim() !== "") {
      setShowFilterBtn(true);
      if (selectedMainOption == "name") {
        if (selectedOption === "is") {
          setFilt({
            items: [
              {
                field: selectedMainOption,
                operator: "equals",
                value: filterValue,
              },
            ],
          });
        } else if (selectedOption == "isnot") {
          setFilt({
            items: [
              {
                field: selectedMainOption,
                operator: "notContains",
                value: filterValue,
              },
            ],
          });
        } else if (selectedOption == "contains") {
          setFilt({
            items: [
              {
                field: selectedMainOption,
                operator: "contains",
                value: filterValue,
              },
            ],
          });
        } else if (selectedOption == "doesnot") {
          setFilt({
            items: [
              {
                field: selectedMainOption,
                operator: "notContains",
                value: filterValue,
              },
            ],
          });
        } else if (selectedOption == "isempty") {
          setFilt({
            items: [
              {
                field: selectedMainOption,
                operator: "isEmpty",
              },
            ],
          });
        } else if (selectedOption == "isnotempty") {
          setFilt({
            items: [
              {
                field: selectedMainOption,
                operator: "isNotEmpty",
                value: filterValue,
              },
            ],
          });
        }
      } else if (selectedMainOption == "cost") {
        if (selectedOption == "equal") {
          setFilt({
            items: [
              {
                field: "cost",
                operator: "=",
                value: filterValue,
              },
            ],
          });
        } else if (selectedOption == "greater") {
          setFilt({
            items: [
              {
                field: "cost",
                operator: ">",
                value: parseInt(filterValue),
              },
            ],
          });
        } else if (selectedOption == "less") {
          setFilt({
            items: [
              {
                field: "cost",
                operator: "<",
                value: parseInt(filterValue),
              },
            ],
          });
        }
      } else if (selectedMainOption == "cloud") {
        if (selectedOption == "is") {
          setFilt({
            items: [
              {
                field: "service",
                operator: "equals",
                value: filterValue,
              },
            ],
          });
        } else if (selectedOption == "isnot") {
          setFilt({
            items: [
              {
                field: "service",
                operator: "contains",
                value: filterValue,
              },
            ],
          });
        } else if (selectedOption == "contains") {
          setFilt({
            items: [
              {
                field: "service",
                operator: "contains",
                value: filterValue,
              },
            ],
          });
        } else if (selectedOption == "doesnot") {
          setFilt({
            items: [
              {
                field: "service",
                operator: "notContains",
                value: filterValue,
              },
            ],
          });
        }
      }
      setError(false); // Reset the error state
    } else {
      if (selectedMainOption == "name") {
        if (selectedOption == "isempty") {
          setShowFilterBtn(true);
          setFilt({
            items: [
              {
                field: "name",
                operator: "isEmpty",
              },
            ],
          });
        } else if (selectedOption == "isnotempty") {
          setShowFilterBtn(true);
          setFilt({
            items: [
              {
                field: "name",
                operator: "isNotEmpty",
              },
            ],
          });
        }
      }
      if (selectedMainOption == "cloud") {
        if (selectedOption == "isempty") {
          setShowFilterBtn(true);

          setFilt({
            items: [
              {
                field: "service",
                operator: "isEmpty",
              },
            ],
          });
        } else if (selectedOption == "isnotempty") {
          setShowFilterBtn(true);
          setFilt({
            items: [
              {
                field: "service",
                operator: "isNotEmpty",
              },
            ],
          });
        }
      }
      setError(true); // Set the error state to true
    }
  };

  const handleApplyInBetweenFilter = () => {
    // Handle applying the "In Between" filter with the selected min and max values
    setFilt({
      items: [
        {
          field: "cost",
          operator: ">=",
          value: parseInt(minFilterValue),
        },
        {
          field: "cost",
          operator: "<=",
          value: parseInt(maxFilterValue),
        },
      ],
    });
  };

  const options = [
    { id: "name", label: "Name", icon: <AbcIcon /> },
    { id: "cost", label: "Cost", icon: <MonetizationOnIcon /> },
    { id: "cloud", label: "Cloud Service", icon: <CloudIcon /> },
  ];

  const subOptions = {
    name: [
      { id: "is", label: "Is" },
      // { id: "isnot", label: "Is not" },
      { id: "contains", label: "Contains" },
      // { id: "doesnot", label: "Does not contains" },
      { id: "isempty", label: "Is empty" },
      { id: "isnotempty", label: "Is not empty" },
    ],
    cost: [
      { id: "equal", label: "Equal to" },
      // { id: "between", label: "In Between" },
      { id: "greater", label: "Greater than" },
      { id: "less", label: "Less than" },
    ],
    cloud: [
      { id: "is", label: "Is" },
      // { id: "isnot", label: "Is not" },
      { id: "contains", label: "Contains" },
      // { id: "doesnot", label: "Does not contains" },
      { id: "isempty", label: "Is empty" },
      { id: "isnotempty", label: "Is not empty" },
    ],
  };
  // console.log(selectedOption)
  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleFilterClick}
        aria-label="Filter"
        color="primary"
        endIcon={<FilterIcon />}
      >
        Filter by
        {/* <FilterIcon /> */}
      </Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {selectedOption ? (
          <>
            <List>
              <ListItem button onClick={() => setSelectedOption(null)}>
                <ListItemIcon>
                  <ArrowBackIcon />
                </ListItemIcon>
                <ListItemText primary="Back" />
              </ListItem>
              {subOptions[selectedOption]
                ? subOptions[selectedOption].map((option) => (
                    <ListItem
                      key={option.id}
                      button
                      onClick={() => handleOptionClick(option.id)}
                    >
                      <ListItemIcon>
                        {options.find((opt) => opt.id === selectedOption)?.icon}
                      </ListItemIcon>
                      <ListItemText primary={option.label} />
                    </ListItem>
                  ))
                : null}
            </List>
            {selectedOption === "between" && (
              <>
                <TextField
                  label="Min Value"
                  variant="outlined"
                  fullWidth
                  value={minFilterValue}
                  onChange={(e) => setMinFilterValue(e.target.value)}
                />
                <TextField
                  label="Max Value"
                  variant="outlined"
                  fullWidth
                  value={maxFilterValue}
                  onChange={(e) => setMaxFilterValue(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleApplyInBetweenFilter}
                >
                  Apply Filter
                </Button>
              </>
            )}
            {subOptionsWithFilter.includes(selectedOption) &&
              selectedOption !== "between" && (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {selectedOption !== "isempty" &&
                      selectedOption !== "isnotempty" && (
                        <TextField
                          label="Filter Value"
                          variant="outlined"
                          style={{
                            width: "200px",
                            height: "auto",
                            marginBottom: "10px",
                            display: "block",
                            marginRight: "10px",
                            marginLeft: "10px",
                          }}
                          value={filterValue}
                          onChange={(e) => setFilterValue(e.target.value)}
                          error={error} 
                          helperText={
                            error ? "Filter Value cannot be empty" : ""
                          } // Display error message when error is true
                        />
                      )}
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      style={{
                        width: "130px",
                        height: "auto",
                        display: "block",
                        marginRight: "10px",
                        marginLeft: "10px",
                        marginBottom: "10px",
                      }}
                      onClick={handleApplyFilter}
                    >
                      Apply Filter
                    </Button>
                  </div>
                </>
              )}
          </>
        ) : (
          <List>
            {options.map((option) => (
              <ListItem
                key={option.id}
                button
                onClick={() => handleOptionClick(option.id)}
              >
                <ListItemIcon>{option.icon}</ListItemIcon>
                <ListItemText primary={option.label} />
              </ListItem>
            ))}
          </List>
        )}
      </Popover>
    </div>
  );
}

export default FilterDropdown;
