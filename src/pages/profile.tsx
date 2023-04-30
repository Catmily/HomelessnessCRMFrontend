import { useParams } from 'react-router-dom';
import BasicInformationDetails from '../components/basicInformationDetails';
import { getPersonId } from '../glue/Auth';
import StandardLayout from '../layouts/standardLayout';
import { type ReactElement } from 'react';

interface Props {
  self: boolean
  hasCase: boolean
}

export function Profile ({ self, hasCase }: Props): ReactElement<any, any> {
  let { id } = useParams();

  if (self) {
    id = getPersonId();
  }

  return (
    <StandardLayout
      content={
        <>
          <BasicInformationDetails user={id} editMode={hasCase} />
        </>
      }
    />
  );
}
