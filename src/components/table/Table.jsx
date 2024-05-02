import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {
  const rows = [
    {
      id: 1,
      np: "CUST.IN/2024/2768",
      fac: "FAC2024043178",
      partenaire: "MR FELICIE",
      date: "27/04/2024",
      amount: 33.52,
      method: "Espèces (EUR)",
      status: "Approuvé",
    },
    {
      id: 2,
      np: "CUST.IN/2024/2766",
      fac: "FAC2024043196",
      partenaire: "ENGEN LA POSSESSION",
      date: "27/04/2024",
      amount: 16.91,
      method: "Espèces (EUR)",
      status: "Approuvé",
    },
    {
      id: 3,
      np: "CUST.IN/2024/2761",
      fac: "FAC2024043192",
      partenaire: "DOMINION E&C IBERIA SAU",
      date: "27/04/2024",
      amount: 22.03,
      method: "Chèques (EUR)",
      status: "Attente",
    },
    {
      id: 4,
      np: "CUST.IN/2024/2760",
      fac: "FAC2024043190",
      partenaire: "MR SERY",
      date: "27/04/2024",
      amount: 120.16,
      method: "Carte bancaire (EUR)",
      status: "Attente",
    },
    {
      id: 5,
      np: "CUST.IN/2024/2759",
      fac: "FAC2024043188",
      partenaire: "D2R   ROBERTO DUCHEMANN",
      date: "27/04/2024",
      amount: 119.95,
      method: "Carte bancaire (EUR)",
      status: "Attente",
    },

  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">N° paiement</TableCell>
            <TableCell className="tableCell">Client</TableCell>
            <TableCell className="tableCell">N° Facture</TableCell>
            <TableCell className="tableCell">Montant</TableCell>
            <TableCell className="tableCell">Mode de paiement</TableCell>
            <TableCell className="tableCell">Statut</TableCell>
            <TableCell className="tableCell">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">{row.np}</TableCell>
              <TableCell className="tableCell">{row.partenaire}</TableCell>
              <TableCell className="tableCell">{row.fac}</TableCell>
              <TableCell className="tableCell">{row.amount} €</TableCell>
              <TableCell className="tableCell">{row.method}</TableCell>
              <TableCell className="tableCell"> <span className={`status ${row.status}`}>{row.status}</span> </TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
  );
};

export default List;
