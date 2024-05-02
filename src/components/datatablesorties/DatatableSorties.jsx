import "./datatablesorties.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { sortiesColumns } from "../../datatablesource";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";

const DatatableSorties = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
     const fetchData = async () => {
       let list = [];
       try {
         const querySnapshot = await getDocs(collection(db, "caisses"));
         querySnapshot.forEach((doc) => {
           list.push({ id: doc.id, ...doc.data() });
         });
         setData(list);
         console.log(list);
       } catch (err) {
         console.log(err);
       }
     };
     fetchData();

    // Récupèration (DB REALTIME) /caisses/3/sorties/INmProvc1nEJXuhRTROS
    const unsub = onSnapshot(
      collection(db, "/caisses/3/sorties/"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "caisses/3/sorties/", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Supprimer
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
      Décaissements
      
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={sortiesColumns.concat(actionColumn)}
        components={{ Toolbar: GridToolbar }}
        pageSize={9}
        rowsPerPageOptions={[9]}
        // checkboxSelection
      />
    </div>
  );
};

export default DatatableSorties;
