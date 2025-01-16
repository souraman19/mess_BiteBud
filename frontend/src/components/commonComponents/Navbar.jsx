import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import AdbIcon from "@mui/icons-material/Adb";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Link } from "react-router-dom";

const pages = ["Messmenu", "Comment", "Gallery", "Complaint", "Expense"];
const goto = [
  "/full-menu-page",
  "/comment-page",
  "/gallery-page",
  "/complaint-page",
  "/expense-page",
];
const dropdownOptions = [
  [
    { label: "Menu Items", path: "/menu-item" },
    { label: "Full Menu", path: "/full-menu-page" },
    { label: "Option L", path: "/l" },
  ],
  [
    { label: "Option A", path: "/a" },
    { label: "Option B", path: "/b" },
    { label: "Option C", path: "/c" },
  ],
  [
    { label: "Option D", path: "/d" },
    { label: "Option E", path: "/e" },
    { label: "Option F", path: "/f" },
  ],
  [
    { label: "Option G", path: "/g" },
    { label: "Option H", path: "/h" },
    { label: "Option I", path: "/i" },
  ],
  [
    { label: "See Expenses", path: "/expense-page" },
    { label: "Grocery", path: "/grocery" },
    { label: "Add Expense", path: "/add-new-expense" },
  ],
];

function ResponsiveAppBar() {
  const [anchorElDropdown, setAnchorElDropdown] = React.useState(null);
  const [dropdownIndex, setDropdownIndex] = React.useState(null);

  const handleOpenDropdown = (event, index) => {
    setAnchorElDropdown(event.currentTarget);
    setDropdownIndex(index);
  };

  const handleCloseDropdown = () => {
    setAnchorElDropdown(null);
    setDropdownIndex(null);
  };

  const isDropdownOpen = (index) => dropdownIndex === index;

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 500,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              fontSize: "2.8rem",
            }}
          >
            <Link
              to="/student-home-page"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              BiteBud
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <div
                key={page}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Button
                   onClick={(event) => handleOpenDropdown(event, index)}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    marginLeft:"8px",
                    marginRight: "0px",
                    padding: "5px",
                    // border: "2px solid black"
                  }}
                >
                  <Typography style={{ color: "inherit", textDecoration: "none",fontSize: "1.5rem", }} >
                      {page}
                  </Typography>
                </Button>
                <IconButton
                  onClick={(event) => handleOpenDropdown(event, index)}
                  sx={{ color: "white", ml: 1, margin:0, padding:0, fontSize: "2.2rem",}}
                >
                  {isDropdownOpen(index) ? (
                    <ArrowDropUpIcon fontSize="inherit"/>
                  ) : (
                    <ArrowDropDownIcon fontSize="inherit"/>
                  )}
                </IconButton>
                <Menu
                  id={`dropdown-menu-${index}`}
                  anchorEl={anchorElDropdown}
                  open={Boolean(anchorElDropdown) && isDropdownOpen(index)}
                  onClose={handleCloseDropdown}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  sx={{
                    "& .MuiPaper-root": {
                      backgroundColor: "#333",
                      color: "white",
                      borderRadius: "8px",
                      minWidth: "150px",
                    },
                  }}
                >
                  {dropdownOptions[index]?.map((option) => (
                    <MenuItem
                      key={option.label}
                      onClick={handleCloseDropdown}
                      sx={{
                        fontSize: "1rem",
                        "&:hover": { background: "#555" },
                      }}
                    >
                      <Link
                        to={option.path}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        {option.label}
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Go to Profile">
              <IconButton sx={{ p: 0 }}>
                <Link
                  to="/myprofilepage"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </Link>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
