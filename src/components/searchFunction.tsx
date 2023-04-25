import { useEffect, useState } from "react";
import * as $ from "jquery";

import { Form } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { GetCaseWorkersGeneric, GetPeopleGeneric } from "../glue/DBConnector";

type Props = {
  staffOnly: boolean;
};

function SearchPerson({ staffOnly }: Props) {
  const [menuItems, setMenuItems] = useState<JSX.Element[]>([]);
  const [people, setPeople] = useState([]);
  const [changed, setChanged] = useState(true);
  const [changedSelection, setChangedSelection] = useState(false);

  const [searchBox, setSearchBox] = useState("");
  const [selectedPersonDesc, setSelectedPersonDesc] = useState(
    "Type the name of the person"
  );
  const [selectedPersonId, setSelectedPersonId] = useState([]);

  useEffect(() => {
    if (changed) {
      setChanged(false);
      const func = async () => {
        let ppl;
        if (searchBox != "") {
          if (staffOnly) {
            ppl = await GetCaseWorkersGeneric({ preferred_name: searchBox });
          } else {
            ppl = await GetPeopleGeneric({ preferred_name: searchBox });
          }
        } else {
          if (staffOnly) {
            ppl = await GetCaseWorkersGeneric({});
          } else {
            ppl = await GetPeopleGeneric({});
          }
        }

        //@ts-ignore
        setPeople(ppl["data"]["message"]);
      };
      func();
    }
  }, [changed]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    //@ts-ignore - jquery
    setSearchBox(value);
    setChanged(true);
  };

  useEffect(() => {
    const func = async () => {
      let e = [];

      for (const p in people)
        e.push(
          <Dropdown.Item
            id={p + "_dropdown"}
            onClick={() => {
              if (selectedPersonId.includes(people[p].person_id)) {
                let a = selectedPersonId;
                a = a.filter((e) => e !== people[p].person_id);
                setSelectedPersonId(a);

                //@ts-ignore
                $(`#${p + "_dropdown"}`).removeClass("selected_dropdown");
              } else {
                setSelectedPersonId([...selectedPersonId, people[p].person_id]);
                //@ts-ignore
                $(`#${p + "_dropdown"}`).addClass("selected_dropdown");
              }
              setChanged(true);
            }}
          >
            ID: {people[p].person_id} | {people[p].preferred_name} |{" "}
            {people[p].full_name}
          </Dropdown.Item>
        );
      //@ts-ignore

      setMenuItems(e);
    };
    func();
  }, [people]);

  useEffect(() => {
    const func = async () => {
      let l = selectedPersonId.length;
      setSelectedPersonDesc(`${l} people selected`);
      setChangedSelection(false);
    };
    func();
  }, [selectedPersonId]);

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic" className="w-100">
        {selectedPersonDesc}
      </Dropdown.Toggle>

      <Dropdown.Menu className="w-100">
        <Form>
          <Form.Control
            onChange={handleChange}
            placeholder="Type the name of the person..."
            type="text"
            name="searchPerson"
          ></Form.Control>
          {menuItems}
        </Form>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SearchPerson;
