import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";
import { getTeam, getUser } from "../api";

const createData = (
  name,
  email,
  gender,
  phone,
  team,
  userRole,
  location,
  picture
) => {
  return { name, email, gender, phone, team, userRole, location, picture };
};

export const UserData = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [Data, setData] = useState([]);
  const [Team, setTeam] = useState([]);
  const filteredRows = Data.filter((row) => {
    const includesSearchQuery = (value) => {
      const stringValue = String(value).toLowerCase();
      return stringValue.includes(searchQuery.toLowerCase());
    };
  
    return (
      Object.values(row).some(includesSearchQuery) ||
      Team.some(
        (team) =>
          team?._id === row.team &&
          includesSearchQuery(team.name) 
      )
    );
  });

  useEffect(() => {
    getUser().then((res) => {
      const rows = res?.data.map((data) =>
        createData(
          data?.name,
          data?.email,
          data?.gender,
          data?.phone,
          data?.team,
          data?.role,
          data?.location,
          data?.picture
        )
      );
      setData(rows);
    });
    getTeam().then((res) => {
      setTeam(res?.data);
    });
  }, []);
  return (
    <>
      <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ margin: 16 }}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ background: "LightGray" }}>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Gender</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">TeamName</TableCell>
              <TableCell align="right">UserRole</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">Picture</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.gender}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
                {Team?.map(
                  (i) =>
                    i?._id === row.team && (
                      <TableCell align="right">{i.name}</TableCell>
                    )
                )}
                <TableCell align="right">{row.userRole}</TableCell>
                <TableCell align="right">{row.location}</TableCell>
                <TableCell align="right">
                  <a href={row.picture}>{row.picture}</a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
