// components/BottomNavigation.js
"use client"; // Ensure this component is client-side only

import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Group, Home, Person, Update } from "@mui/icons-material";
import { useRouter } from "next/navigation"; // Use next/navigation instead of next/router
import { useState } from "react";

const BottomNavigationModule = () => {
  debugger;
  const router = useRouter(); // Correct usage of router
  const [pathname, setPathname] = useState("/");

  const handleNavigation = (path) => {
    setPathname(path);
    router.push(path);
  };

  return (
    <BottomNavigation
      showLabels
      value={pathname}
      onChange={(event, newValue) => handleNavigation(newValue)}
      style={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        backgroundColor: "#333542", // Dark bottom nav background
        color: "#fff", // Light bottom nav text
        zIndex: 110,
      }}
    >
      <BottomNavigationAction
        label="Profile"
        value="/"
        icon={<Person />}
        style={{ color: pathname === "/" ? "#fefbd2" : "grey" }}
      />
      <BottomNavigationAction
        label="AI Hub"
        value="/ai-hub"
        icon={<Home />}
        style={{ color: pathname === "/ai-hub" ? "#fefbd2" : "grey" }}
        disabled
      />
      <BottomNavigationAction
        label="Updates"
        value="/updates"
        icon={<Update />}
        style={{ color: pathname === "/updates" ? "#fefbd2" : "grey" }}
        disabled
      />
      <BottomNavigationAction
        label="Series"
        value="/series"
        icon={<Group />}
        style={{ color: pathname === "/series" ? "#fefbd2" : "grey" }}
        disabled
      />
    </BottomNavigation>
  );
};

export default BottomNavigationModule;
