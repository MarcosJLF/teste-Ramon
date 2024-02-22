import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import apiService from "../services/api";
import API_URLS from "../services/server-urls";
import Select from "react-select";
import {
  mockedUsersListData,
  mockedColumnsData,
} from "../assets/mocks/projectmocks";

const getUsers = async (setUsers) => {
  try {
    const response = await apiService.get(API_URLS.listusers);
    setUsers(response);
    return response;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// const getColumns = async (setColOptions, setSelectedColumns, project) => {
//   try {
//     const response = await apiService.get(API_URLS.listcolumns);
//     if (project && project.columns && project.columns.length) {
//       const formattedSelectedColumns = project.columns.map((col) => {
//         const foundSelectedCol = response.find((c) => c._id === col);
//         return foundSelectedCol ? foundSelectedCol : col;
//       });
//       const set1 = new Set(response);
//       const set2 = new Set(formattedSelectedColumns);
//       const difference = [...set1].filter((element) => !set2.has(element));
//       setColOptions(difference);
//       setSelectedColumns(formattedSelectedColumns);
//     } else {
//       setColOptions(response);
//       return [];
//     }
//   } catch (error) {
//     console.error("Error fetching columns:", error);
//     throw error;
//   }
// };

const ProjectForm = ({ onSubmit, project = null }) => {
  const [name, setName] = useState(project ? project.name : "");
  const [description, setDescription] = useState(
    project ? project.description : ""
  );
  const [owner, setOwner] = useState(project ? project.owner._id : "");
  // const [selectedColumns, setSelectedColumns] = useState([]);

  // const [colOptions, setColOptions] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getUsers(setUsers);
      // await getColumns(setColOptions, setSelectedColumns, project);
    };

    fetchData();
  }, [project]);

  // const colOptionsFormatted = colOptions.map((option) => ({
  //   value: option._id,
  //   label: option.name,
  // }));

  // const selectedColFormatted = selectedColumns.map((option) => ({
  //   value: option._id,
  //   label: option.name,
  // }));

  // const onChange = (selectedOptions) => {
  //   // porque ta transformando os 2 em undefined?
  //   console.log(selectedOptions)
  //   setSelectedColumns(selectedOptions);
  //   const set1 = new Set(colOptionsFormatted);
  //   const set2 = new Set(selectedOptions);
  //   const difference = [...set1].filter((element) => !set2.has(element));
  //   console.log(difference)
  //   // setColOptions(difference);
  //   // setSelectedColumns(formattedSelectedColumns);
  // };

  // const multiSelect = (
  //   <div>
  //     <Select
  //       value={selectedColFormatted}
  //       onChange={onChange}
  //       options={colOptionsFormatted}
  //       isMulti
  //       closeMenuOnSelect={false}
  //       clearable={false}
  //       placeholder="Select columns"
  //     />
  //   </div>
  // );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description, owner });
    setName("");
    setDescription("");
    setOwner("");
    // setSelectedColumns([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
          Project Name
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="owner">
          Owner
        </label>
        <select
          className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          id="owner"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          required
        >
          <option value="">Select an owner</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      {/* <div className="mb-4"> #TODO implement variable columns
        <label className="block text-gray-700 font-bold mb-2" htmlFor="columns">
          Columns
        </label>
        {multiSelect}
      </div> */}
      <Button
        className="px-2 py-1 bg-gray-800 text-white rounded-lg"
        type="submit"
      >
        {project ? "Edit Project" : "Create Project"}
      </Button>
    </form>
  );
};

export default ProjectForm;
