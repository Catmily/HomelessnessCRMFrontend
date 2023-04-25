import {
  Container,
  Dropdown,
  Form,
  Row,
  Col,
  Button,
  Card,
} from "react-bootstrap";
import StandardLayout from "../layouts/standardLayout";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import {
  GetCasesGeneric,
  GetDocumentsGeneric,
  GetKeysDB,
  GetNotesGeneric,
  GetPeopleGeneric,
  GetStats,
} from "../glue/DBConnector";
import {
  caseFieldType,
  documentType,
  noteType,
  personFieldType,
} from "../glue/typeTranslation";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
export default function Metrics() {
  const [cases, setCases] = useState();
  const [casesEachDay, setCasesEachDay] = useState();

  const [people, setPeople] = useState();
  const [peopleEachDay, setPeopleEachDay] = useState();

  const [dataLoaded, setDataLoaded] = useState(false);
  const [stats, setStats] = useState(false);

  useEffect(() => {
    if (!dataLoaded) {
      const func = async () => {
        let d1 = await GetCasesGeneric({});
        setCases(d1["data"]["message"]);

        let d2 = await GetPeopleGeneric({});
        setPeople(d2["data"]["message"]);

        let d3 = await GetStats();
        setStats(d3["data"]["message"]);
        setDataLoaded(true);
      };
      func();
    }
  }, []);

  function perDay(dataset: object, field: string, scale: Number) {
    const timestamps_raw = [];

    //@ts-ignore
    dataset.forEach((obj) => {
      timestamps_raw.push(obj[field]);
    });

    let cases_timestamped = [];
    timestamps_raw.forEach((timestamp) => {
      let date;
      try {
        switch (scale) {
          case 1:
          case 2:
            date = new Date(timestamp).toISOString().slice(0, 7);
            break;
          case 3:
            date = new Date(timestamp).toISOString().slice(0, 4);
            break;
          default:
            date = new Date(timestamp).toISOString().slice(0, 10);
            break;
        }

        if (!cases_timestamped[date]) {
          cases_timestamped[date] = 0;
        }
        cases_timestamped[date] += 1;
      } catch (e) {}
    });
    let data = [];

    Object.entries(cases_timestamped).forEach(([date, amount]) => {
      const outputObj = {
        date: date,
        amount: amount,
      };
      data.push(outputObj);
    });
    data.sort(function (a, b) {
      return a.date - b.date;
    });

    return data;
  }

  useEffect(() => {
    if (cases) {
      //@ts-ignore
      setCasesEachDay(perDay(cases, "start_date", "1"));
    }
  }, [cases]);

  useEffect(() => {
    if (people) {
      //@ts-ignore
      setPeopleEachDay(perDay(people, "dob", 3));
    }
  }, [people]);

  return (
    <StandardLayout
      content={
        <Container className={`p-4 main-content shadow mt-4 mb-4`}>
          <h1>Metrics</h1>
          <Row>
            <Col>
              <h2>New Cases Per Day</h2>
              <ResponsiveContainer width="95%" height={300}>
                <BarChart
                  width={500}
                  height={300}
                  data={casesEachDay}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Col>
            <Col>
              <h2>Demographics, Year of Birth</h2>
              <ResponsiveContainer width="95%" height={300}>
                <BarChart
                  width={500}
                  height={300}
                  data={peopleEachDay}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Col>
          </Row>
          <h2>System Stats</h2>
          <h3>
            Disk Free (GB): <span>{stats["disk_free_gb"]} GB left</span>
          </h3>
          <h3>
            CPU Use: <span>{stats["cpu_use"]}%</span>
          </h3>
          <h3>
            RAM Use: <span>{stats["ram_use"]}%</span>
          </h3>
        </Container>
      }
    />
  );
}
