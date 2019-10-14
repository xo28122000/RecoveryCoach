import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  render() {
    const toggle = () => !this.state.isOpen;
    return (
      <div>
        <Navbar
          color="dark"
          expand="md"
          style={{ backgroundColor: "#606060", color: "black" }}
        >
          <NavbarBrand href="/" className="light_link">
            Recovery Track
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/Train" className="light_link">
                  Train
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/Learn" className="light_link">
                  Learn
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className="light_link">
                  Account
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Personal Information</DropdownItem>
                  <DropdownItem>See your progress</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Log Out</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
