"use client";

import {
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { Group, Person, Update } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaRobot } from "react-icons/fa";

const Footer = () => {
  const router = useRouter();
  const [pathname, setPathname] = useState("/");

  useEffect(() => {
    // Set initial pathname when component mounts
    setPathname(window.location.pathname);
  }, []);

  const handleNavigation = (path) => {
    setPathname(path);
    router.push(path);
  };

  return (
    <BottomNavigation
      showLabels
      value={pathname}
      onChange={(event, newValue) => handleNavigation(newValue)}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '8vh',
        backgroundColor: "#333542",
        zIndex: 1200,
        borderTop: '1px solid #444', // Optional subtle border
      }}
    >
      <BottomNavigationAction
        label="AI Hub"
        value="/"
        icon={<FaRobot />}
        sx={{
          color: pathname === "/" ? "#fefbd2" : "grey",
        }}
      />
      <BottomNavigationAction
        label="Updates"
        value="/updates"
        icon={<Update />}
        sx={{
          color: pathname === "/updates" ? "#fefbd2" : "grey",
        }}
      />
      <BottomNavigationAction
        label="Series"
        value="/series"
        icon={<Group />}
        sx={{
          color: pathname === "/series" ? "#fefbd2" : "grey",
        }}
      />
      <BottomNavigationAction
        label="Profile"
        value="/profile"
        icon={<Person />}
        sx={{
          color: pathname === "/profile" ? "#fefbd2" : "grey",
        }}
      />
    </BottomNavigation>
  );
};

export default Footer;
