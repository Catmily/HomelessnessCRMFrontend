import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import * as $ from 'jquery';
import { GetPersonSensitive, GetUserProfile, SetPersonSensitiveProfile, SetUserProfile } from "../glue/DBConnector";

type Props = {
    user: string,
}

// interface FormState {
//     [key: string]: string;
//   }

export default function BasicInformationDetails({user}: Props) {
    const [sensitiveVisible, setSensitiveVisible] = useState(false)

    const [userData, setUserData] = useState(Object)
    const [userDataCopy, setUserDataCopy] = useState(Object)

    const [userDataSensitive, setUserDataSensitive] = useState(Object)
    const [userDataCopySensitive, setUserDataCopySensitive] = useState(Object)



    const [formEnabled, setFormEnabled] = useState<boolean>(false)
    const [changed, setChanged] = useState<boolean>(false)

    useEffect(() => {
        console.log("test")

        const func = async () => {
            const d1 = await GetUserProfile(user)
            setUserData(d1.data.message["0"])

            const d2 = await GetPersonSensitive(user)
            console.log("hello:")
            console.log(d2);
            setUserDataSensitive(d2.data.message["0"])
    }       
        func()
    }, []);

    const handleChangeBasic = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setUserData((prevState: any) => ({
        ...prevState,
        [name]: value,
      }));
    };

    const handleChangeSensitive = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserDataSensitive((prevState: any) => ({
          ...prevState,
          [name]: value,
        }));
      };

    useEffect(() => {
        if (changed)
        {
        const func = async () => {
            await SetUserProfile(userData);
            await SetPersonSensitiveProfile(userDataSensitive);
            setChanged(false)
    }       
        func()
}
    }, [changed]);

    


    return (<Container className={`p-4 main-content shadow mt-4 mb-4`}>
    <Container>
        <Row>
            <Col>
                <h1>Profile - {userData["preferred_name"]}</h1>
            </Col>
            <Col>

                {formEnabled ? <><Button variant="danger" className={`float-end mx-1`} onClick={
                            () => {
                                setFormEnabled(!formEnabled)
                                setUserData(userDataCopy)
                                setUserDataCopySensitive(userDataCopySensitive)
                                //@ts-ignore
                                $('#form')[0].reset();
                                //@ts-ignore

                                $('#form2')[0].reset();

                            }}>🗙 Cancel</Button><Button variant="danger" className={`float-end`} onClick={
                        () => {
                            setFormEnabled(!formEnabled)
                            setChanged(true)
                            

                        }}>📥 Submit</Button></> : <Button className={`float-end`} onClick={
                    () => {
                        setFormEnabled(!formEnabled)
                        setUserDataCopy(userData)
                        setUserDataCopySensitive(userDataSensitive)
                        
                    }}>✏️ Edit</Button>}
            <Button className={`w-50 float-end ms-2 mx-1`} onClick={() => {setSensitiveVisible(!sensitiveVisible)}}>⚠️ View Sensitive Information</Button>

            </Col>
        </Row>
        <fieldset disabled={!formEnabled}>
        <Form id="form">
            <Row>
                <Col>
                    <Form.Label column={true}>Preferred Name*</Form.Label>
                    <Form.Control type="text" name="preferred_name" placeholder="Preferred Name" onChange={handleChangeBasic} defaultValue={userData["preferred_name"] || ''} />
                </Col>
                <Col>
                    <Form.Label column={true}>Full Name*</Form.Label>
                    <Form.Control type="text" name="full_name" placeholder="Full Name" onChange={handleChangeBasic} defaultValue={userData["full_name"] || ''} />
                </Col>
            </Row>
        <Row>
            <Col>
                <Form.Label column={true}>Address</Form.Label>
                <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">1</InputGroup.Text>
                <Form.Control type="text" name="address_line_1" placeholder="Address Line 1" onChange={handleChangeBasic} defaultValue={userData["address_1"] || ''} /></InputGroup>
                <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">2</InputGroup.Text>
                <Form.Control type="text" name="address_line_2" placeholder="Address Line 2" onChange={handleChangeBasic} defaultValue={userData["address_2"] || ''} /></InputGroup>
                <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">3</InputGroup.Text>
                <Form.Control type="text" name="address_line_3" placeholder="Address Line 3" onChange={handleChangeBasic} defaultValue={userData["address_3"] || ''} /></InputGroup>
                <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">City</InputGroup.Text>
                <Form.Control type="text" name="city" placeholder="City" onChange={handleChangeBasic} defaultValue={userData["city"] || ''} /></InputGroup>
                <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">Postcode</InputGroup.Text>

                <Form.Control type="text" name="postcode" placeholder="Postcode" onChange={handleChangeBasic} defaultValue={userData["postcode"] || ''}/>
                <Form.Control.Feedback type="invalid">
                Please put in a valid postcode.
                </Form.Control.Feedback>
                </InputGroup>



            </Col>
            <Col>
                <Form.Label column={true}>Pronouns</Form.Label>
                <Form.Control type="text" name="pronouns" placeholder="Pronouns" onChange={handleChangeBasic} defaultValue={userData["pronouns"] || ''} />
                <Col>
                <Form.Label column={true}>Email Address</Form.Label>
                <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control type="text" name="email" placeholder="Email address" onChange={handleChangeBasic} defaultValue={userData["email"] || ''} />
                <Form.Control.Feedback type="invalid">
                Please put in a valid email address.
                </Form.Control.Feedback></InputGroup>
                <Col>
                <Form.Label column={true}>Phone Number</Form.Label>
                <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">📞</InputGroup.Text>
                <Form.Control type="text" name="phone" placeholder="Phone Number" onChange={handleChangeBasic}defaultValue={userData["phone"] || ''} />
                <Form.Control.Feedback type="invalid">
                Please put in a valid phone number.
                </Form.Control.Feedback></InputGroup>
                <br></br>
            </Col>
            </Col>
            </Col>
            
            <Col>
                <Form.Label column={true}>First Language</Form.Label>
                <Form.Control type="text" name="first_language" placeholder="First Language" onChange={handleChangeBasic} defaultValue={userData["first_language"] || ''} />

                <Form.Label column={true}>Date of Birth</Form.Label>
                <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">📅</InputGroup.Text>
                <Form.Control type="date" name='date_of_birth' onChange={handleChangeBasic} placeholder="Date of Birth" defaultValue={userData["dob"] || ''} /></InputGroup>

            </Col>

        </Row>

        
        </Form>
        </fieldset>
        <br />
        <Row>
            <Col>

        {sensitiveVisible ? 
        <><fieldset disabled={!formEnabled} className="mt-5">
            <Form id="form2">
            <Row>
                <Col>
                    <Form.Label column={true}>Nationality</Form.Label>
                    <Form.Control type="text" name="nationality" placeholder="Nationality" onChange={handleChangeSensitive} defaultValue={userDataSensitive["nationality"] || ''} />
                </Col>
                <Col>
                    <Form.Label column={true}>Religion</Form.Label>
                    <Form.Control type="text" name="religion" placeholder="Religion" onChange={handleChangeSensitive} defaultValue={userDataSensitive["religion"] || ''} />
                </Col>
                <Col>
                    <Form.Label column={true}>Sexual Orientation</Form.Label>
                    <Form.Control type="text" name="sexual_orientation" placeholder="Sexual Orientation" onChange={handleChangeSensitive} defaultValue={userDataSensitive["sexual_orientation"] || ''} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label column={true}>Sex</Form.Label>
                    <Form.Control type="text" name="sex" placeholder="Sex" onChange={handleChangeSensitive} defaultValue={userDataSensitive["sex"] || ''} />
                </Col>
                <Col>
                    <Form.Label column={true}>Ethnicity</Form.Label>
                    <Form.Control type="text" name="ethnicity" placeholder="Ethnicity" onChange={handleChangeSensitive} defaultValue={userDataSensitive["ethnicity"] || ''} />
                </Col>
                <Col>
                    <Form.Label column={true}>Immigration Status</Form.Label>
                    <Form.Control type="text" name="immigration_status" placeholder="Immigration Status" onChange={handleChangeSensitive} defaultValue={userDataSensitive["immigration_status"] || ''} />
                </Col>
            </Row>
            <Row>
                <Col>
                <Form.Label column={true}>Sexual Orientation</Form.Label>
                    <Form.Control type="text" name="sexual_orientation" placeholder="Sexual Orientation" onChange={handleChangeSensitive} defaultValue={userDataSensitive["sexual_orientation"] || ''} />
                </Col>
                <Col>
                </Col>
                <Col>
                </Col>
            </Row>
                </Form>
                </fieldset></> : <></>}
        </Col>
        </Row>
    </Container>
    </Container>)
}
