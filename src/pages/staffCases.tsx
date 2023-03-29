import { useEffect, useState } from "react";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import CaseCardComponent from "../components/caseCardComponent";
import { NoteComponent } from "../components/noteComponent";
import { getPersonId } from "../glue/Auth";
import { GetCases } from "../glue/DBConnector";
import StandardLayout from "../layouts/standardLayout";

export default function Cases() {
    const [cases, setCases] = useState([]);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const func = async () => {
            const temp = await GetCases(getPersonId())
            const cases = temp["data"]["message"]
            setCases(cases)
            //@ts-ignore
            let cardTemp = []
            for (let i=0; i<cases.length; i++)
            {
                //@ts-ignore
                cardTemp.push(<CaseCardComponent name={'👤 ' + cases[i][1].preferred_name} 
                date_active={cases[i][0].start_date} 
                case_id={cases[i][0].case_id} 
                summary={cases[i][0].summary} />)
            }
            //@ts-ignore
            setCards(cardTemp);
    }      
        func()
    }, []);

    

    function getCards()
    {

    }
    


    return (<StandardLayout content={
        
        <Container className="p-3 main-content shadow mt-4 mb-4"><h1>Your Cases:</h1> 
                        <Button size="sm" className="mt-0 my-2">Create New Case</Button>
                        <>
        {
          cards  
        }</>
        </Container>}/>)}