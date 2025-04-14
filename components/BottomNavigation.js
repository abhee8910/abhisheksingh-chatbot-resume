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
    // Sync state with actual path on initial render
    setPathname(window.location.pathname);
  }, []);

  const handleNavigation = (path) => {
    setPathname(path);
    router.push(path);
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <BottomNavigation
        showLabels
        value={pathname}
        onChange={(event, newValue) => handleNavigation(newValue)}
        sx={{
          height: '100%',
          backgroundColor: "#333542",
          color: "#fff",
          display: 'flex',
          justifyContent: 'space-around',
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
    </div>
  );
};

export default Footer;
