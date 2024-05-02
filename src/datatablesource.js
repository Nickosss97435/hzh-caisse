export const userColumns = [
  // { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Utilisateur",
    width: 250,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.avatar} alt="avatar" />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "agence",
    headerName: "Agence",
    width: 230,
  },
  {
    field: "role",
    headerName: "Status",
    width: 360,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.role}`}>
          {params.row.role}
        </div>
      );
    },
  },
];
export const orderColumns = [
  // { field: "id", headerName: "ID", width: 70 },
  {
    field: "Nom",
    headerName: "N° paiement",
    width: 230,
  },
  {
    field: "Partenaire",
    headerName: "Client",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.Partenaire}
        </div>
      );
    },
  },
  
  {
    field: "Mémo",
    headerName: "N° Facture",
    width: 230,
  },
  {
    field: "Montant",
    headerName: "Montant",
    width: 100,
  },
  
  {
    field: "Journal",
    headerName: "Mode de paiement",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.Journal}`}>
          {params.row.Journal}
        </div>
      );
    },
  },
  {
    field: "Date",
    headerName: "Date",
    width: 100,
  },
  {
    field: "État",
    headerName: "État",
    width: 100,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.État}`}>
          {params.row.État}
        </div>
      );
    },
  },
];
export const sortiesColumns = [
  // { field: "id", headerName: "ID", width: 70 },
  {
    field: "Partenaire",
    headerName: "Sortie par",
    width: 230,
  },
  {
    field: "Mémo",
    headerName: "Motif",
    width: 330,
  },
  {
    field: "montant",
    headerName: "Montant",
    width: 160,
  },
  {
    field: "Journal",
    headerName: "Mode de paiement",
    width: 200,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.Journal}`}>
          {params.row.Journal}
        </div>
      );
    },
  },
  {
    field: "Date",
    headerName: "Date",
    width: 230,
  },
];
export const logsColumns = [
  // { field: "id", headerName: "ID", width: 70 },
  {
    field: "Partenaire",
    headerName: "Sortie par",
    width: 230,
  },
  {
    field: "Mémo",
    headerName: "Motif",
    width: 450,
  },
  {
    field: "Montant",
    headerName: "Encaissements",
    width: 230,
  },
  {
    field: "montant",
    headerName: "Décaissements",
    width: 230,
  },
  {
    field: "Date",
    headerName: "Date",
    width: 230,
  },
];
