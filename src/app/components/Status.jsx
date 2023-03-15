export default function Status({ status }) {
  return (
    <div className="status">{status ? <p>Finalisé</p> : <p>En cours</p>}</div>
  );
}
