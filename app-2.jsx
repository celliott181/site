const { useEffect, useState } = React;
const { Subscription, interval } = rxjs;
const { map } = rxjs.operators;

const App2 = () => {
  const [data, setData] = useState('0');
  const action = (form) => toast(form.get('msg'));
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e)
    toast(data);
  }
  
  return (
    <div className="card-body">
      <h5 className="card-title">Counter</h5>
      <p className="card-text">Count: {data}</p>
      <a href="#" className="btn btn-primary" onClick={() => setData(Number(data) + 1)} >Do something</a>

      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Write something" name="msg" onChange={(e) => setData(e.target.value)} />
        <button type="submit">Toast!</button>
      </form>
    </div>
  );
}

ReactDOM.render(<App2 />, document.getElementById('app-2'));
