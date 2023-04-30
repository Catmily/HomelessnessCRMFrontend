import { useEffect, useState } from 'react';
import $ from 'jquery';

import { Form } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { GetCaseWorkersGeneric, GetPeopleGeneric } from '../glue/DBConnector';

interface Props {
  staffOnly: boolean
  dropdownSelect: any
}

function SearchPerson ({ staffOnly, dropdownSelect }: Props) {
  const [menuItems, setMenuItems] = useState<JSX.Element[]>([]);
  const [people, setPeople] = useState([]);
  const [changed, setChanged] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [changedSelection, setChangedSelection] = useState(false);

  const [searchBox, setSearchBox] = useState('');
  const [selectedPersonDesc, setSelectedPersonDesc] = useState(
    'Type the name of the person'
  );
  const [selectedPersonId, setSelectedPersonId] = useState([]);

  useEffect(() => {
    if (changed) {
      setChanged(false);
      const func = async () => {
        let ppl;
        if (searchBox !== '') {
          if (staffOnly) {
            ppl = await GetCaseWorkersGeneric({ preferred_name: searchBox });
          } else {
            const ppl = [];
            const res = await GetPeopleGeneric({ preferred_name: searchBox });

            res['data']['message'].forEach(element => {
              ppl.push(element[1]);
            })

            setPeople(ppl);
            return;
          }
        } else {
          if (staffOnly) {
            ppl = await GetCaseWorkersGeneric({});
          } else {
            const ppl = [];
            const res = await GetPeopleGeneric({});

            res['data']['message'].forEach(element => {
              ppl.push(element[1]);
            })

            setPeople(ppl);
            return;
          }
        }

        setPeople(ppl['data']['message']);
      };
      void func();
    }
  }, [changed]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSearchBox(value);
    setChanged(true);
  };

  useEffect(() => {
    const func = async () => {
      const e = [];

      // eslint-disable-next-line @typescript-eslint/no-for-in-array
      for (const p in people) {
        e.push(
          <Dropdown.Item
            eventKey={people[p].person_id}
            id={p + '_dropdown'}
            onClick={() => {
              if (selectedPersonId.includes(people[p].person_id)) {
                let a = selectedPersonId;
                a = a.filter((e) => e !== people[p].person_id);
                setSelectedPersonId(a);

                $(`#${p + '_dropdown'}`).removeClass('selected_dropdown');
              } else {
                setSelectedPersonId([...selectedPersonId, people[p].person_id]);
                $(`#${p + '_dropdown'}`).addClass('selected_dropdown');
              }
              setChanged(true);
            }}
          >
            ID: {people[p].person_id} | {people[p].preferred_name} |{' '}
            {people[p].full_name}
          </Dropdown.Item>
        );
      }

      setMenuItems(e);
    };
    void func();
  }, [people]);

  useEffect(() => {
    const func = async () => {
      const l = selectedPersonId.length;
      setSelectedPersonDesc(`${l} people selected`);
      setChangedSelection(false);
    };
    void func();
  }, [selectedPersonId]);

  return (
    <Dropdown onSelect={dropdownSelect}>
      <Dropdown.Toggle variant='success' id='dropdown-basic' className='w-100'>
        {selectedPersonDesc}
      </Dropdown.Toggle>

      <Dropdown.Menu className='w-100'>
        <Form>
          <Form.Control
            onChange={handleChange}
            placeholder='Type the name of the person...'
            type='text'
            name='searchPerson'
           />
          {menuItems}
        </Form>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SearchPerson;
