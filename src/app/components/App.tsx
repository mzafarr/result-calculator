"use client"
import React, { useState } from "react";
import styles from "../styles/table.module.css";
import FileInputButton from "./FileInputButton";

const App = () => {
  const [data, setData] = useState([]);
  const emptyData = ["-", "-", "-", "-"];
  // weightages
  const [assignmentWeightage, setAssignmentWeightage] = useState(20);
  const [quizWeightage, setQuizWeightage] = useState(20);
  const [midTermWeightage, setMidTermWeightage] = useState(20);
  const [finalTermWeightage, setFinalTermWeightage] = useState(40);
  const [labWeightage, setLabWeightage] = useState(0);
  const [CPWeightage, setCPWeightage] = useState(0);
  const [isWeightageCorrect, setIsWeightageCorrect] = useState(true);

  const checkWeightage = () => {
    const totalWeightage =
      assignmentWeightage +
      quizWeightage +
      midTermWeightage +
      finalTermWeightage +
      labWeightage +
      CPWeightage;

    if (totalWeightage !== 100) {
      setIsWeightageCorrect(false);
    } else {
      setIsWeightageCorrect(true);
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>Result Calculator</h1>
      {!isWeightageCorrect && (
        <div>
          <h3 className={styles.message}>
            Total weightage is not 100%. Kindly fix it otherwise you will get
            incorrect results.
          </h3>
        </div>
      )}
      <table className={styles.table} id="myTable">
        {/* headings */}
        <thead>
          <tr>
            <th>
              <button className={styles.button} onClick={checkWeightage}>
                Confirm Weightage
              </button>
            </th>

            <th>
              Assignment
              <select
                name="AssignmentWeightage"
                id=""
                onChange={(event) =>
                  setAssignmentWeightage(parseInt(event.target.value))
                }
              >
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20" selected>
                  20
                </option>
              </select>
            </th>
            <th>
              Quiz
              <select
                name="QuizWeightage"
                id=""
                onChange={(event) =>
                  setQuizWeightage(parseInt(event.target.value))
                }
              >
                <option value="15">15</option>
                <option value="20" selected>
                  20
                </option>
              </select>
            </th>
            <th>
              Mid
              <select
                name="MidTermWeightage"
                id=""
                onChange={(event) =>
                  setMidTermWeightage(parseInt(event.target.value))
                }
              >
                <option value="15">15</option>
                <option value="20" selected>
                  20
                </option>
                <option value="25">25</option>
              </select>
            </th>
            <th>
              Final
              <select
                name="FinalTermWeightage"
                id=""
                onChange={(event) =>
                  setFinalTermWeightage(parseInt(event.target.value))
                }
              >
                <option value="40" selected>
                  40
                </option>
                <option value="45">45</option>
              </select>
            </th>
            <th>
              Lab
              <select
                name="LabWeightage"
                id=""
                onChange={(event) =>
                  setLabWeightage(parseInt(event.target.value))
                }
              >
                <option value="0" selected>
                  0
                </option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </th>
            <th>
              CP
              <select
                name="CP"
                id=""
                onChange={(event) =>
                  setCPWeightage(parseInt(event.target.value))
                }
              >
                <option value="0" selected>
                  0
                </option>
                <option value="5">5</option>
                <option value="10">10</option>
              </select>
            </th>
            <th>CGPA</th>
            <th colSpan={2}>Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Reg #</th>
            <th>Marks </th>
            <th>Marks </th>
            <th>Marks </th>
            <th>Marks </th>
            <th>Marks </th>
            <th>Marks </th>
            <th>CGPA </th>
            <th>%</th>
            <th>Grade</th>
          </tr>
          {data.length !== 0 ? (
            data.map((item, index) => {
              let assignment = item.Assignment
                ? item.Assignment.split("o")
                : [];
              let quiz = item.Quiz ? item.Quiz.split("o") : [];
              let midTerm = item.MidTerm ? item.MidTerm.split("o") : [];
              let finalTerm = item.FinalTerm ? item.FinalTerm.split("o") : [];
              let lab = item.Lab ? item.Lab.split("o") : [];
              let CP = item.CP ? item.CP.split("o") : [];
              let CGPA = item.CGPA;

              quiz = parseFloat(
                ((parseInt(quiz[0]) / parseInt(quiz[1])) * quizWeightage).toFixed(
                  2
                )
              );
              assignment = parseFloat(
                (
                  (parseInt(assignment[0]) / parseInt(assignment[1])) *
                  assignmentWeightage
                ).toFixed(2)
              );
              midTerm = parseFloat(
                (
                  (parseInt(midTerm[0]) / parseInt(midTerm[1])) *
                  midTermWeightage
                ).toFixed(2)
              );
              finalTerm = parseFloat(
                (
                  (parseInt(finalTerm[0]) / parseInt(finalTerm[1])) *
                  finalTermWeightage
                ).toFixed(2)
              );
              lab = parseFloat(
                ((parseInt(lab[0]) / parseInt(lab[1])) * labWeightage).toFixed(
                  2
                )
              );
              CP = parseFloat(
                ((parseInt(CP[0]) / parseInt(CP[1])) * CPWeightage).toFixed(2)
              );

          console.log("midTerm ", midTerm, "midTermWeightage ", midTermWeightage);
          
              const totalPercentage =
                quiz + assignment + midTerm + finalTerm + lab + CP;

              const grade =
                totalPercentage >= 86
                  ? "A"
                  : totalPercentage >= 82
                  ? "A-"
                  : totalPercentage >= 78
                  ? "B+"
                  : totalPercentage >= 74
                  ? "B"
                  : totalPercentage >= 70
                  ? "B-"
                  : totalPercentage >= 66
                  ? "C+"
                  : totalPercentage >= 62
                  ? "C"
                  : totalPercentage >= 58
                  ? "C-"
                  : totalPercentage >= 54
                  ? "D+"
                  : totalPercentage >= 50
                  ? "D"
                  : "F";
              return (
                <tr key={index}>
                  <td>{item.RegNumber}</td>
                  <td>{assignment && assignment}</td>
                  <td>{quiz && quiz}</td>
                  <td>{midTerm && midTerm}</td>
                  <td>{finalTerm && finalTerm}</td>
                  <td>{lab && lab}</td>
                  <td>{CP && CP}</td>
                  <td>{CGPA && CGPA}</td>
                  <td>{totalPercentage.toFixed(2)}</td>
                  <td>{grade}</td>
                </tr>
              );
            })
          ) : (
            <>
              {emptyData.map((item, index) => (
                <tr key={index}>
                  <td className={styles.empty} />
                  <td className={styles.empty} />
                  <td className={styles.empty} />
                  <td className={styles.empty} />
                  <td className={styles.empty} />
                  <td className={styles.empty} />
                  <td className={styles.empty} />
                  <td className={styles.empty} />
                  <td className={styles.empty} />
                  <td className={styles.empty} />
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>

      <FileInputButton data={data} setData={setData} />
    </main>
  );
};

export default App;
