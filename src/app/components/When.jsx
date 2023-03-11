import moment from 'moment';
import 'moment/locale/fr';

function getDate(dateProp) {
  const date = moment(dateProp);
  return date.locale('fr').format('LL');
}

export default function When(props) {
  const date = props.date;
  return (
    <>
      <p>{getDate(date)}</p>
    </>
  );
}
