import {
  Container,
  Row,
  Col
} from 'react-bootstrap';
import StandardLayout from '../layouts/standardLayout';
import { type ReactElement, useEffect, useState } from 'react';
import {
  GetCasesGeneric,
  GetPeopleGeneric,
  GetStats
} from '../glue/DBConnector';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
export default function Metrics (): ReactElement<any, any> {
  const [cases, setCases] = useState();
  const [casesEachDay, setCasesEachDay] = useState();

  const [people, setPeople] = useState<any>();
  const [peopleEachDay, setPeopleEachDay] = useState();

  const [dataLoaded, setDataLoaded] = useState(false);
  const [stats, setStats] = useState(false);

  useEffect(() => {
    try {
      if (!dataLoaded) {
        const func = async (): Promise<void> => {
          const caseTemp = await GetCasesGeneric({});
          setCases(caseTemp['data']['message']);

          const peopleTemp = await GetPeopleGeneric({});
          setPeople(peopleTemp['data']['message']);

          const statTemp = await GetStats();
          setStats(statTemp['data']['message']);
          setDataLoaded(true);
        };
        void func();
      }
    } catch {
      alert('Unable to load metrics. Speak to your system administrator.')
    }
  }, []);

  function perDay (dataset: object, field: string, scale: number): Record<string, any> {
    const timestampsRaw = [];

    // @ts-expect-error But you can iterate like this
    dataset.forEach((obj: Record<string, any>) => {
      timestampsRaw.push(obj[field]);
    });

    // This allows for granular date selections - this is a pretty rough
    // way of doing it, but here we can split per day, per month, and per year.
    const casesTimestamped = [];
    timestampsRaw.forEach((timestamp) => {
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

        if (!casesTimestamped[date]) {
          casesTimestamped[date] = 0;
        }

        // Typescript just being typescript, we're adding to a number!
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        casesTimestamped[date] += 1;
      } catch (e) {}
    });

    // Workaround as Recharts requires a very specific [{ object }, { object }] format
    const data = []

    Object.entries(casesTimestamped).forEach(([date, amount]) => {
      const outputObj = {
        date,
        amount
      };
      data.push(outputObj);
    });

    // Chronological order
    data.sort(function (a, b) {
      return a.date - b.date;
    });

    return data;
  }

  useEffect(() => {
    if (cases) {
      // @ts-expect-error Mixing fetched types
      setCasesEachDay(perDay(cases, 'start_date', '1'));
    }
  }, [cases]);

  useEffect(() => {
    const pplChanged = [];
    if (people) {
      people.forEach(element => {
        pplChanged.push(element[1]);
      })

      // @ts-expect-error Mixing fetched types
      setPeopleEachDay(perDay(pplChanged, 'dob', 3));
    }
  }, [people]);

  return (
    <StandardLayout
      content={
        <Container className={'p-4 main-content shadow mt-4 mb-4'}>
          <h1>Metrics</h1>
          <Row>
            <Col>
              <h2>New Cases Per Day</h2>
              <ResponsiveContainer width='95%' height={300}>
                <BarChart
                  width={500}
                  height={300}
                  data={casesEachDay}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}
                >
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='date' />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey='amount' fill='#4444d8' />
                </BarChart>
              </ResponsiveContainer>
            </Col>
            <Col>
              <h2>Demographics, Year of Birth</h2>
              <ResponsiveContainer width='95%' height={300}>
                <BarChart
                  width={500}
                  height={300}
                  data={peopleEachDay}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}
                >
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='date' />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey='amount' fill='#4444d8' />
                </BarChart>
              </ResponsiveContainer>
            </Col>
          </Row>
          <h2>System Stats</h2>
          <h3>
            Disk Free (GB): <span>{stats['disk_free_gb']} GB left</span>
          </h3>
          <h3>
            CPU Use: <span>{stats['cpu_use']}%</span>
          </h3>
          <h3>
            RAM Use: <span>{stats['ram_use']}%</span>
          </h3>
        </Container>
      }
    />
  );
}
