import "./datastats.scss";
import { useEffect, useState } from "react";

const DataStats = () => {
  // État local pour stocker les objectifs
  const [objectifs, setObjectifs] = useState({
    ventes: {
      journalier: 0,
      hebdomadaire: 0,
      mensuel: 0,
      annuel: 0,
    },
    mensuel: {
      janvier: 0,
      fevrier: 0,
      mars: 0,
      avril: 0,
      mai: 0,
      juin: 0,
      juillet: 0,
      aout: 0,
      septembre: 0,
      octobre: 0,
      novembre: 0,
      decembre: 0,
    },
    realisations: {
      janvier: 0,
      fevrier: 0,
      mars: 0,
      avril: 0,
      mai: 0,
      juin: 0,
      juillet: 0,
      aout: 0,
      septembre: 0,
      octobre: 0,
      novembre: 0,
      decembre: 0,
    },
  });

  // Fonction pour gérer les changements des inputs
  const handleChange = (event) => {
    const { name, value } = event.target;
    const [field, period, month] = name.split("."); // Séparer le nom pour obtenir le champ et le mois
    setObjectifs({ 
      ...objectifs, 
      [field]: { 
        ...objectifs[field], 
        [period]: parseInt(value) || 0 // Assurez-vous de stocker un nombre ou 0 si la valeur est invalide
      } 
    });
  };

  return (
    <div className="stats">
      {/* <h2>Les Objectifs</h2> */}
      <div className="left">
        <table>
          <thead>
            <tr>
              <th>Catégorie</th>
              <th>Journalier</th>
              <th>Hebdomadaire</th>
              <th>Mensuel</th>
              <th>Annuel</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Résultats</td>
              {/* Inputs pour les objectifs de vente */}
              {Object.keys(objectifs.ventes).map((period, index) => (
                <td key={index}>
                  <input
                    type="number"
                    name={`ventes.${period}`}
                    value={objectifs.ventes[period]}
                    onChange={handleChange}
                  />
                </td>
              ))}
            </tr>
            <tr>
              <td>Objectifs</td>
              {/* Inputs pour les objectifs de vente */}
              {Object.keys(objectifs.ventes).map((period, index) => (
                <td key={index}>
                  <input
                    type="number"
                    name={`ventes.${period}`}
                    value={objectifs.ventes[period]}
                    onChange={handleChange}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Objectif</th>
              <th>Réalisation</th>
            </tr>
          </thead>
          <tbody>
            {/* Utiliser Object.entries pour obtenir le mois et la valeur associée */}
            {Object.entries(objectifs.mensuel).map(([month, value], index) => (
              <tr key={index}>
                <td>{month}</td>
                {/* Inputs pour les objectifs mensuels */}
                <td>
                  <input
                    type="number"
                    name={`mensuel.${month}`}
                    value={objectifs.mensuel[month]}
                    onChange={handleChange}
                  />
                </td>
                {/* Inputs pour les réalisations mensuelles */}
                <td>
                  <input
                    type="number"
                    name={`realisations.${month}`}
                    value={objectifs.realisations[month]}
                    onChange={handleChange}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataStats;
