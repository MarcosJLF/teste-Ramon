import React, { useState, useEffect } from "react";
import KanbanBoard from "../component/kanbanBoard";
import apiService from "../services/api";
import API_URLS from "../services/server-urls";
import DashboardHeader from "../component/DashboardHeader";

const fetchUsers = async (setUsers) => {
  try {
    const response = await apiService.get(API_URLS.listusers);
    setUsers(response);
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
const fetchProjects = async (setProjects) => {
  try {
    const response = await apiService.get(API_URLS.listprojects);
    setProjects(response);
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const Dashboard = () => {
  const [selectedProject, setSelectedProject] = useState("");
  const [projects, setProjects] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchProjects(setProjects);
    fetchUsers(setUsers);
  }, []);

  const handleProjectChange = (value) => {
    setSelectedProject(value);
  };

  const handleUserChange = (value) => {
    console.log(value);
    setSelectedUser(value);
  };
  return (
    <div className="container mx-auto mt-8 px-16">
      <h1 className="text-3xl font-bold mb-4">DashBoard</h1>
      <DashboardHeader
        projects={projects}
        onProjectChange={handleProjectChange}
        users={users}
        onUserChange={handleUserChange}
      />
      <KanbanBoard project={selectedProject} user={selectedUser} />
    </div>
  );
};

export default Dashboard;
