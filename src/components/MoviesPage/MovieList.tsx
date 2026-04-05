import { Paper } from "@mui/material";
import { fetchTopMovies } from "../../api/movies";
import { useQuery } from "@tanstack/react-query";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

const MovieList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["top-movies"],
    queryFn: fetchTopMovies,
  });
  console.log(data);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  // Showing data with MUI Tables

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", width: 250 },
    { field: "overview", headerName: "Overview", width: 420 },
    { field: "release_date", headerName: "Released", width: 150 },
  ];
  const paginationModel = { page: 0, pageSize: 5 };
  const rows = [];
  data.results.map((movie, key) => {
    rows.push({
      id: movie.id,
      title: movie.original_title,
      overview: movie.overview,
      release_date: movie.release_date,
    });
  });

//   const randomRows = [];
//   let i = 0;
//   while (i < 5) {
//     const ran = Math.floor(Math.random() * 19) + 1;
//     randomRows.push(rows[ran])
//     i++;
//   }
  return (
    <>
      {/* Showing data with MUI Tables */}
      <Paper sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          // checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
      {/* ------------ /Showing data with MUI Tables ------------ */}
    </>
  );
};

export default MovieList;
