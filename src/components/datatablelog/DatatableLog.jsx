import "./datatablelog.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { logsColumns } from "../../datatablesource";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";

const DatatableLog = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionsSnapshot = await getDocs(collection(db, "caisses/3/transactions"));
        const transactionsData = transactionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const sortiesSnapshot = await getDocs(collection(db, "caisses/3/sorties"));
        const sortiesData = sortiesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setData([...transactionsData, ...sortiesData]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    // Realtime updates
    const unsubTransactions = onSnapshot(
      collection(db, "caisses/3/transactions"),
      (snapShot) => {
        const transactionsData = snapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(prevData => [...prevData.filter(item => !item.type || item.type !== "sortie"), ...transactionsData]);
      },
      (error) => {
        console.error("Error fetching transactions:", error);
      }
    );

    const unsubSorties = onSnapshot(
      collection(db, "caisses/3/sorties"),
      (snapShot) => {
        const sortiesData = snapShot.docs.map(doc => ({ id: doc.id, ...doc.data(), type: "sortie" }));
        setData(prevData => [...prevData.filter(item => !item.type || item.type !== "sortie"), ...sortiesData]);
      },
      (error) => {
        console.error("Error fetching sorties:", error);
      }
    );

    return () => {
      unsubTransactions();
      unsubSorties();
    };
  }, []);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Journal
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={logsColumns}
        components={{ Toolbar: GridToolbar }}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
};

export default DatatableLog;
