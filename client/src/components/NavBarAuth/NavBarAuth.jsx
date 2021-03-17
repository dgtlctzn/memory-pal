import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavbarText,
  //   NavLink,
//   NavItem,
  // NavbarText,
  UncontrolledDropdown,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

const NavBarAuth = ({ handleLogOut }) => {
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleSettings = () => {
    history.push("/settings");
  };

  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">Memory Pal</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavbarText>
            <NavLink to="/home">Home</NavLink>
          </NavbarText>
          {/* <NavItem>
              <NavLink to="https://github.com/reactstrap/reactstrap">
                GitHub
              </NavLink>
            </NavItem> */}
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Account
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={handleSettings}>Settings</DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={handleLogOut}>Log out</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

NavBarAuth.propTypes = {
  handleLogOut: PropTypes.func,
};

export default NavBarAuth;
